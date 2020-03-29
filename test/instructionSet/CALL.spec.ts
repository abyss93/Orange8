import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { RET } from "../../src/instructionSet/RET";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { JP } from "../../src/instructionSet/JP";
import { CALL } from "../../src/instructionSet/CALL";

describe('CALL 0x2NNN test: ', () => {

    const callAddr = 0x0567
    const startSP = 0xA
    const startIP = 0x0234
    let chip8State: Chip8state

    let sut: Instruction

    before('', () => {
        chip8State = new Chip8StateBuilderImpl()
            .sp(startSP)
            .ip(startIP)
            .build()

        sut = new CALL(chip8State, callAddr)
    })

    it('SP increased by 1, IP content goes on top of stack (SP), then IP content set to NNN', () => {
        //when
        sut.execute()

        //then
        expect(chip8State.sp).to.be.deep.equals(startSP + 1)
        expect(chip8State.stack[chip8State.sp]).to.be.deep.equals(startIP)
        expect(chip8State.ip).to.be.deep.equals(callAddr)
    })

})