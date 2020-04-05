import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { ADD_VxVy } from "../../src/instructionSet/ADD_VxVy";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('ADD VX,VY 0x8xy4 test: ', () => {

    let chip8State: Chip8state
    let vx = 6
    let vy = 7
    let flagReg = 15
    let sut: Instruction

    it('VX = VX + VY, result < 8-bit (< 255), Vx updated, carry flag NOT set', () => {
        //given
        const vxStartValue = 70;
        const vyStartValue = 38;
        const flagRegStartValue = 0x00;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new ADD_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(vxStartValue + vyStartValue)
        expect(chip8State.v[flagReg]).to.be.deep.equals(flagRegStartValue)
    })

    it('VX = VX + VY, result > 8-bit (> 255), Vx stores max value 255, carry flag SET', () => {
        //given
        const vxStartValue = 250;
        const vyStartValue = 150;
        const flagRegStartValue = 0x00;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new ADD_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(255)
        expect(chip8State.v[flagReg]).to.be.deep.equals(0x01)
    })

    it('VX = VX + VY, result > 8-bit (> 255), Vx stores max value 255, carry flag already SET and REMAIN SET', () => {
        //given
        const vxStartValue = 250;
        const vyStartValue = 150;
        const flagRegStartValue = 0x01;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new ADD_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(255)
        expect(chip8State.v[flagReg]).to.be.deep.equals(flagRegStartValue)
    })

})