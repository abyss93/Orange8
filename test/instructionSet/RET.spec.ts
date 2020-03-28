import { Chip8state } from "../../src/core/Chip8State";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { CLS } from "../../src/instructionSet/CLS";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { expect } from "chai";
import { Constants } from "../../src/utils/Constants";
import { RET } from "../../src/instructionSet/RET";

describe('RET 0x00EE test: ', () => {

    let chip8State: Chip8state

    let sut: Instruction

    before('', () => {
        chip8State = new Chip8StateBuilderImpl()
            .stack([3, 3, 5, 3, 4, 5, 54, 7, 99, 9, 0xF, 0xD, 0xA, 0xD, 0xE, 0xF])
            .sp(10) // stack pointer points to 0xF top of the stack
            .build()


        sut = new RET(chip8State)
    })

    it('instruction pointer is set to top-stack-cell-value and stack pointer decreased by one', () => {
        //when
        sut.execute()

        //then
        expect(chip8State.ip).to.be.deep.equals(0xF)
        expect(chip8State.sp).to.be.deep.equals(9)
    })

})