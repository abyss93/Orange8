import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { CLS } from "../../src/instructionSet/CLS";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { Constants } from "../../src/utils/Constants";

describe('CLS 0x00E0 test: ', () => {

    let sut: Instruction

    it('screen is correctly cleared', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = Math.round(Math.random())
        }
        let chip8State = new Chip8StateBuilderImpl()
            .scr(scr)
            .build()


        sut = new CLS(chip8State)

        draw("BEF. CLS", chip8State)

        //when
        sut.execute()

        //then
        draw("AFT. CLS", chip8State)
        const clearedScreen = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            clearedScreen[i] = 0
        }
        expect(chip8State.scr).to.be.deep.equals(clearedScreen)
    })

    function draw(reason: string, chip8State: Chip8state) {
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
                const pixel = chip8State.scr[(i * 64) + j];
                const pixelPrint = pixel.toString() === "1" ? "\x1b[42m" + pixel.toString() : "\x1b[47m" + pixel.toString();
                row += "" + pixelPrint + " "
            }
            console.log(row)
        }
        console.log("\x1b[44m" + "************************************************************************************************************************************")
    }
})