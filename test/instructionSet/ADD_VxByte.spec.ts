import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { ADD_VxByte } from "../../src/instructionSet/ADD_VxByte";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('ADD VX,Byte 0x7xkk test: ', () => {

    let chip8State: Chip8state
    let vx = 6
    let flagReg = 15
    let sut: Instruction

    it('add kk to VX, result < 8-bit (< 255), Vx updated', () => {
        //given
        const vxStartValue = 128;
        const toSum = 10;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .build()
        sut = new ADD_VxByte(chip8State, vx, toSum)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(vxStartValue + toSum)
    })

    it('add kk to VX, result > 8-bit (> 255), Vx stores max value 255, carry flag NOT set', () => {
        //given
        const vxStartValue = 128;
        const toSum = 300;
        const flagRegStartValue = 0x00;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new ADD_VxByte(chip8State, vx, toSum)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(255)
        expect(chip8State.v[flagReg]).to.be.deep.equals(flagRegStartValue)
    })

})