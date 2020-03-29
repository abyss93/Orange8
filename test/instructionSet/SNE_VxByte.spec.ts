import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { SNE_VxByte } from "../../src/instructionSet/SNE_VxByte";

describe('SNE Vx,byte 0x4xkk test: ', () => {

    const kk = 0xAB
    const vx = 5
    const ip = 0x0234
    let chip8State: Chip8state

    let sut: Instruction

    it('vx = kk, IP is untouched', () => {
        //givenO
        chip8State = new Chip8StateBuilderImpl()
            .ip(ip)
            .vx(vx, kk)
            .build()
        sut = new SNE_VxByte(chip8State, vx, kk)

        //when
        sut.execute()

        //then
        expect(chip8State.ip).to.be.deep.equals(ip)
    })

    it('vx != kk, IP increased by 2', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .ip(ip)
            .vx(vx, 0x23)
            .build()
        sut = new SNE_VxByte(chip8State, vx, kk)

        //when
        sut.execute()

        //then
        expect(chip8State.ip).to.be.deep.equals(ip + 2)
    })

})