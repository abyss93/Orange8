import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { RET } from "../../src/instructionSet/RET";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { JP } from "../../src/instructionSet/JP";

describe('JP 0x1NNN test: ', () => {

    const jpAddr = 0x0567
    let chip8State: Chip8state

    let sut: Instruction

    before('', () => {
        chip8State = new Chip8StateBuilderImpl()
            .ip(0x0234)
            .build()

        sut = new JP(chip8State, jpAddr)
    })

    it('instruction pointer is set to NNN', () => {
        //when
        sut.execute()

        //then
        expect(chip8State.ip).to.be.deep.equals(jpAddr)
    })

})