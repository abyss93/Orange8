import { expect } from "chai";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { Chip8state } from './../../src/core/Chip8State';
import { LD_BVx } from './../../src/instructionSet/LD_BVx';

describe('LD B,VX 0x6XKK test: ', () => {

    const vx = 6
    let chip8State: Chip8state

    let sut: Instruction

    it('hundreds, tens, units of vx value placed respectively in I, I+1,I+2', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 138)
            .build()
        sut = new LD_BVx(chip8State, vx)

        //when
        sut.execute()

        //then
        expect(chip8State.ram[chip8State.i]).to.be.deep.equals(1)
        expect(chip8State.ram[chip8State.i + 1]).to.be.deep.equals(3)
        expect(chip8State.ram[chip8State.i + 2]).to.be.deep.equals(8)
    })
})