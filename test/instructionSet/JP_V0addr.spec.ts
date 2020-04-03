import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { JP_V0addr } from "../../src/instructionSet/JP_V0addr";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('JP V0,addr 0xBnnn test: ', () => {


    let chip8State: Chip8state

    let sut: Instruction

    it('Set IP register to V0 + addr', () => {
        //given
        const addr = 35
        let v0Value = 25
        chip8State = new Chip8StateBuilderImpl()
            .vx(0, v0Value)
            .ip(10)
            .build()
        sut = new JP_V0addr(chip8State, addr)

        //when
        sut.execute()

        //then
        expect(chip8State.ip).to.be.deep.equals(addr + v0Value)
    })
})