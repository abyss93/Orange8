import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { LD_Iaddr } from "../../src/instructionSet/LD_Iaddr";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('LD I,Addr 0xAnnn test: ', () => {

    const addr = 5
    let chip8State: Chip8state

    let sut: Instruction

    it('Write addr in I register', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .i(10)
            .build()
        sut = new LD_Iaddr(chip8State, addr)

        //when
        sut.execute()

        //then
        expect(chip8State.i).to.be.deep.equals(addr)
    })

    it('Does not write invalid addr in I register', () => {
        //given
        const oldValue = 10;
        chip8State = new Chip8StateBuilderImpl()
            .i(oldValue)
            .build()
        sut = new LD_Iaddr(chip8State, 4096)

        //when then
        expect(sut.execute.bind(sut)).to.throw()

    })
})