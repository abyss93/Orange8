import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { SNE_VxVy } from "../../src/instructionSet/SNE_VxVy";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('SNE VX,VY 0x9xy0 test: ', () => {

    const vx = 5
    const vy = 6
    const ip = 0x0234
    let chip8State: Chip8state

    let sut: Instruction

    it('vx = vy, IP is untouched', () => {
        //givenO
        chip8State = new Chip8StateBuilderImpl()
            .ip(ip)
            .vx(vx, 1)
            .vx(vy, 1)
            .build()
        sut = new SNE_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.ip).to.be.deep.equals(ip)
    })

    it('vx != vy, IP increased by 2', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .ip(ip)
            .vx(vx, 1)
            .vx(vy, 2)
            .build()
        sut = new SNE_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.ip).to.be.deep.equals(ip + 2)
    })

})