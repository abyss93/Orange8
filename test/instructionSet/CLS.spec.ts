import { Chip8state } from "../../src/core/Chip8State";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { CLS } from "../../src/instructionSet/CLS";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { expect } from "chai";
import { Constants } from "../../src/utils/Constants";

describe('CLS 0x00E0 test: ', () => {

    let chip8State: Chip8state

    let sut: Instruction

    before('', () => {
        chip8State = new Chip8StateBuilderImpl()
            .scr([1, 2, 3, 4, 5, 6, 7, 8, 9, 0xA, 0xB, 0xC, 0xD, 0xE, 0xF])
            .build()


        sut = new CLS(chip8State)
    })

    it('screen is correctly cleared', () => {
        //when
        sut.execute()

        //then
        expect(chip8State.scr).to.be.deep.equals(new Array<number>(Constants.SCREEN_PIXELS))
    })

})