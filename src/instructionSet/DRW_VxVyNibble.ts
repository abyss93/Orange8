import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";
import { FlagRegisterUtils } from "../utils/FlagRegisterUtils";

export class DRW_VxVyNibble extends AbstractInstruction {

    private flagRegisterUtils: FlagRegisterUtils

    constructor(protected chip8State: Chip8state, private vx: number, private vy: number, private bytesToRead: number) {
        super(chip8State)
        this.flagRegisterUtils = new FlagRegisterUtils(this.chip8State)
    }


    execute(): void {
        this.draw("BEF. DRAW");


        let x = this.chip8State.v[this.vx] //colonna
        let y = this.chip8State.v[this.vy] //riga

        if (x >= 64) {
            x = x % 64
        }
        if (y >= 32) {
            y = y % 32
        }

        let spriteWidth = 7
        if (x + 7 >= 64) {
            spriteWidth = 64 - x
        }

        let spriteHeight = this.bytesToRead
        if (y + this.bytesToRead >= 32) {
            spriteHeight = 32 - y
        }

        for (let i = 0; i < spriteHeight; i++) {
            let spritePart = this.chip8State.ram[this.chip8State.i + i]
            let spritePartBin: Array<number> = this.toBinInverse(spritePart)
            for (let j = 0; j < spriteWidth; j++) {
                const pixelAddress = ((y + i) * 64) + x + j;

                let actualPixel = this.chip8State.scr[pixelAddress] // 0 or 1
                let memoryPixel = spritePartBin[j]
                const futurePixel = (actualPixel ^ memoryPixel);
                this.chip8State.scr[pixelAddress] = futurePixel

                // basta trovare una collisione, dopo non occorre che ne verifichi altre
                if (!this.flagRegisterUtils.isCollision() && futurePixel === 0) {
                    this.flagRegisterUtils.setCollisionFlag()
                }
            }
        }

        this.draw("AFT. DRAW");
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

    private toBinInverse(n: number) {
        let result = new Array<number>(8)
        for (let i = 7; i >= 0; i--) {
            result[i] = n % 2
            n = Math.floor(n / 2)
        }
        return result
    }


}