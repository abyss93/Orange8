import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { SHR_Vx } from "../../src/instructionSet/SHR_Vx";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { Constants } from "../../src/utils/Constants";

describe('SHR VX 0x8xy6 test: ', () => {

    let vx = 6
    let vy = 7
    let chip8State: Chip8state

    let sut: Instruction

    it('VF=0) If the least-significant bit of Vx is 1, then VF is set to 1, then VX divided by 2 (shift right)', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 127) //odd => least sign bit is 1
            .vx(Constants.FLAG_REGISTER_INDEX, 0x00) //flag 0
            .build()
        sut = new SHR_Vx(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[Constants.FLAG_REGISTER_INDEX]).to.be.deep.equals(0x01)
        expect(chip8State.v[vx]).to.be.deep.equals(127 >> 1)
    })

    it('VF=1) If the least-significant bit of Vx is 1, then VF is set to 1, then VX divided by 2 (shift right)', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 127) //odd => least sign bit is 1
            .vx(Constants.FLAG_REGISTER_INDEX, 0x01) //flag 1
            .build()
        sut = new SHR_Vx(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[Constants.FLAG_REGISTER_INDEX]).to.be.deep.equals(0x01)
        expect(chip8State.v[vx]).to.be.deep.equals(127 >> 1)
    })

    it('VF=0) If the least-significant bit of Vx is 0, then VF is set to 0, then VX divided by 2 (shift right)', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 128) //2 ** 7 = 128, only 7th bit is 1
            .vx(Constants.FLAG_REGISTER_INDEX, 0x00) //flag 0
            .build()
        sut = new SHR_Vx(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[Constants.FLAG_REGISTER_INDEX]).to.be.deep.equals(0x00)
        expect(chip8State.v[vx]).to.be.deep.equals(128 >> 1)
    })

    it('VF=1) If the least-significant bit of Vx is 0, then VF is set to 0, then VX divided by 2 (shift right)', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 128) //2 ** 7 = 128, only 7th bit is 1
            .vx(Constants.FLAG_REGISTER_INDEX, 0x01) //flag 1
            .build()
        sut = new SHR_Vx(chip8State, vx, vy)

        //when
        sut.execute()

        //then
        expect(chip8State.v[Constants.FLAG_REGISTER_INDEX]).to.be.deep.equals(0x00)
        expect(chip8State.v[vx]).to.be.deep.equals(128 >> 1)
    })

})