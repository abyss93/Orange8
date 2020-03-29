import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { XOR_VxVy } from "../../src/instructionSet/XOR_VxVy";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('XOR VX,VY 0x8xy3 test: ', () => {

    let chip8State: Chip8state

    let sut: Instruction

    it('VX = VX XOR VY', () => {
        //given
        let vx = 6
        let vy = 7
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 0x0D)
            .vx(vy, 0x8B)
            .build()
        sut = new XOR_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(0x86)
    })

})