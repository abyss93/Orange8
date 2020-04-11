import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { SUBN_VxVy } from "../../src/instructionSet/SUBN_VxVy";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('SUBN VX,VY 0x8xy7 test: ', () => {

    let chip8State: Chip8state
    let vx = 6
    let vy = 7
    let flagReg = 15
    let sut: Instruction

    it('F=0) VX = VY - VX, VY > VX, Vx updated, carry flag SET', () => {
        //given
        const vxStartValue = 38;
        const vyStartValue = 70;
        const flagRegStartValue = 0x00;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new SUBN_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(vyStartValue - vxStartValue)
        expect(chip8State.v[flagReg]).to.be.deep.equals(0x01)
    })


    it('F=1) VX = VY - VX, VY > VX, Vx updated, carry flag SET', () => {
        //given
        const vxStartValue = 38;
        const vyStartValue = 70;
        const flagRegStartValue = 0x01;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new SUBN_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(vyStartValue - vxStartValue)
        expect(chip8State.v[flagReg]).to.be.deep.equals(0x01)
    })

    it('F=0) VX = VY - VX, VY < VX, Vx updated, carry flag RESET', () => {
        //given
        const vxStartValue = 250;
        const vyStartValue = 150;
        const flagRegStartValue = 0x00;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new SUBN_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(vyStartValue - vxStartValue)
        expect(chip8State.v[flagReg]).to.be.deep.equals(0x00)
    })

    it('F=1) VX = VY - VX, VY < VX, Vx updated, carry flag RESET', () => {
        //given
        const vxStartValue = 250;
        const vyStartValue = 150;
        const flagRegStartValue = 0x02;
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, vxStartValue)
            .vx(vy, vyStartValue)
            .vx(flagReg, flagRegStartValue)
            .build()
        sut = new SUBN_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(vyStartValue - vxStartValue)
        expect(chip8State.v[flagReg]).to.be.deep.equals(0x00)
    })
})