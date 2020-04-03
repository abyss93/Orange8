import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { RND_VxByte } from "../../src/instructionSet/RND_VxByte";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('RND VX,Byte 0xCxkk test: ', () => {

    const vx = 6
    const kk = 120
    const rndValueMock = 100
    let chip8State: Chip8state

    let sut: Instruction

    it('Set Vx = random byte AND kk', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 0)
            .build()
        sut = new RND_VxByte(chip8State, vx, kk, () => { return rndValueMock })

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(96)
    })
})