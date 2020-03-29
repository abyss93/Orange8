import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { SE_VxVy } from "../../src/instructionSet/SE_VxVy";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('SE VX,VY 0x5xy0 test: ', () => {

    const kk = 0xAB
    const vx = 6
    const vy = 7
    const ip = 0x0234
    let chip8State: Chip8state

    let sut: Instruction

    it('vx = vy, increase IP by 2', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .ip(ip)
            .vx(vx, kk)
            .vx(vy, kk)
            .build()
        sut = new SE_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.ip).to.be.deep.equals(ip + 2)
    })

    it('vx != vy, IP is untouched', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .ip(ip)
            .vx(vx, kk)
            .vx(vy, 0x46)
            .build()
        sut = new SE_VxVy(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.ip).to.be.deep.equals(ip)
    })

})