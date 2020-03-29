import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { LD_VxVy } from "../../src/instructionSet/LD_VxVy";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('LD VX,VY 0x8xy0 test: ', () => {

    let chip8State: Chip8state

    let sut: Instruction

    it('VX = VY', () => {
        //given
        let vx = 6
        let vy = 7
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 0x0A)
            .vx(vy, 0x0B)
            .build()
        sut = new LD_VxVy(chip8State, 6, 7)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(0x0B)
    })

})