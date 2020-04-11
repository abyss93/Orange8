import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { SUB_VxVy } from "../../src/instructionSet/SUB_VxVy";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('SUB VX,VY 0x8xy5 test: ', () => {

    let chip8State: Chip8state
    let vx = 6
    let vy = 7
    let flagReg = 15
    let sut: Instruction

    it('F=0) VX = VX - VY, VX > VY, Vx updated, carry flag SET', () => {
        //given
        const vxStartValue = 70;
        const vyStartValue = 38;
        const flagRegStartValue = 0x00;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new SUB_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(vxStartValue - vyStartValue)
        expect(chip8State.v[flagReg]).to.be.deep.equals(0x01)
    })

    it('F=1) VX = VX - VY, VX > VY, Vx updated, carry flag SET', () => {
        //given
        const vxStartValue = 70;
        const vyStartValue = 38;
        const flagRegStartValue = 0x01;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new SUB_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(vxStartValue - vyStartValue)
        expect(chip8State.v[flagReg]).to.be.deep.equals(0x01)
    })

    it('F=0) VX = VX - VY, VX < VY, Vx updated, carry flag RESET', () => {
        //given
        const vxStartValue = 150;
        const vyStartValue = 250;
        const flagRegStartValue = 0x00;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new SUB_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(156)
        expect(chip8State.v[flagReg]).to.be.deep.equals(0x00)
    })

    it('F=1) VX = VX - VY, VX < VY, Vx updated, carry flag RESET', () => {
        //given
        const vxStartValue = 150;
        const vyStartValue = 250;
        const flagRegStartValue = 0x02;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new SUB_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(156)
        expect(chip8State.v[flagReg]).to.be.deep.equals(0x00)
    })
})