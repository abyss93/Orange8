import { Bus } from "../bus/Bus";
import { DrawEvent } from "../bus/events/screen/DrawEvent";
import { Chip8state } from "../core/Chip8State";
import { Constants } from "../utils/Constants";
import { FlagRegisterUtils } from "../utils/FlagRegisterUtils";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class DRW_VxVyNibble extends AbstractInstruction {

    private flagRegisterUtils: FlagRegisterUtils

    constructor(private bus: Bus, protected chip8State: Chip8state, private vx: number, private vy: number, private bytesToRead: number) {
        super(chip8State)
        this.flagRegisterUtils = new FlagRegisterUtils(this.chip8State)
    }


    execute(): void {
        // start drawing from this column
        let x = this.chip8State.v[this.vx]
        // start drawing from this row
        let y = this.chip8State.v[this.vy]

        // wrap around management
        if (x >= Constants.SCREEN_WIDTH) {
            x = x % Constants.SCREEN_WIDTH
        }
        if (y >= Constants.SCREEN_HEIGHT) {
            y = y % Constants.SCREEN_HEIGHT
        }

        // truncated sprites management
        let spriteWidth = Constants.RAM_CELL_SIZE_IN_BIT
        if (x + spriteWidth > Constants.SCREEN_WIDTH) {
            spriteWidth = Constants.SCREEN_WIDTH - x
        }
        // if sprite is truncated on rows it is not even necessary to read all of that from the RAM
        let spriteHeight = this.bytesToRead
        if (y + this.bytesToRead >= Constants.SCREEN_HEIGHT) {
            spriteHeight = Constants.SCREEN_HEIGHT - y
        }

        let collisionFound: boolean = false

        // row,col => sprite-relative ; x,y will be top-left sprite coordinates in the screen
        for (let row = 0; row < spriteHeight; row++) {
            let spriteRow = this.chip8State.ram[this.chip8State.i + row]
            //I want inverse order because I'm going to start from 0 in the next for cycle
            let spriteRowBinary: Array<number> = this.toBase2Inverse(spriteRow)
            for (let col = 0; col < spriteWidth; col++) {
                const currentPixelPosition = (y + row) * Constants.SCREEN_WIDTH + x + col;

                let currentPixelValue = this.chip8State.scr[currentPixelPosition]
                let spritePixelValue = spriteRowBinary[col]
                const futurePixelValue = currentPixelValue ^ spritePixelValue;

                this.chip8State.scr[currentPixelPosition] = futurePixelValue

                // search for collision, when the first is found, do not search anymore
                if (!this.flagRegisterUtils.isCollision() && futurePixelValue === 0) {
                    collisionFound = true
                    this.flagRegisterUtils.setCollisionFlag()
                }
            }
        }

        //if sprite drawing has not caused collision, reset collision flag
        if (!collisionFound) {
            this.flagRegisterUtils.resetCollisionFlag()
        }

        this.bus.raise(DrawEvent.ID, new DrawEvent(this.chip8State.scr))
    }

    /**
     * converts a number n from base-10 into base-2
     * returns an array of 0/1 bit in inverse order 
     * example:
     * n = 120
     * returns 0001 1110 instead of 0111 1000
     * @param n 
     */
    private toBase2Inverse(n: number) {
        let result = new Array<number>(Constants.RAM_CELL_SIZE_IN_BIT)
        for (let i = 7; i >= 0; i--) {
            result[i] = n % 2
            n = Math.floor(n / 2)
        }
        return result
    }

    draw(reason: string) {
        console.log("\x1b[44m" + reason + "***************************************************************************************************************************")
        let col = "\x1b[45m"
        for (let c = 0; c < 64; c++) {
            col += c <= 9 ? c + " " : c
        }
        console.log("    " + col)
        for (let i = 0; i < 32; i++) {
            let row = "\x1b[45m"
            row += i <= 9 ? (i + "   ") : (i + "  ")
            for (let j = 0; j < 64; j++) {
                const pixel = this.chip8State.scr[(i * 64) + j];
                const pixelPrint = pixel.toString() === "1" ? "\x1b[42m" + pixel.toString() : "\x1b[47m" + pixel.toString();
                row += "" + pixelPrint + " "
            }
            console.log(row)
        }
        console.log("\x1b[44m" + "************************************************************************************************************************************")
    }

}