import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { LD_VxByte } from "../../src/instructionSet/LD_VxByte";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";

describe('LD VX,Byte 0x6XKK test: ', () => {

    const kk = 0xAB
    const vx = 6
    let chip8State: Chip8state

    let sut: Instruction

    it('Load kk into Vx register', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 0x23)
            .build()
        sut = new LD_VxByte(chip8State, vx, kk)

        //when
        sut.execute()

        //then
        expect(chip8State.v[vx]).to.be.deep.equals(kk)
    })
})