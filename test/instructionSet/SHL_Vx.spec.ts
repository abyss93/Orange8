import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { SHL_Vx } from "../../src/instructionSet/SHL_Vx";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { Constants } from "../../src/utils/Constants";

describe('SHL VX 0x8xyE test: ', () => {

    let vx = 6
    let chip8State: Chip8state

    let sut: Instruction

    it('VF=0) If the most-significant bit of Vx is 1, then VF is set to 1, then VX multiplied by 2 (shift left)', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 136) //most sign bit is 1
            .vx(Constants.FLAG_REGISTER_INDEX, 0x00) //flag 0
            .build()
        sut = new SHL_Vx(chip8State, vx)

        //when
        sut.execute()

        //then
        expect(chip8State.v[Constants.FLAG_REGISTER_INDEX]).to.be.deep.equals(0x01)
        expect(chip8State.v[vx]).to.be.deep.equals(136 << 1)
    })

    it('VF=1) If the most-significant bit of Vx is 1, then VF is set to 1, then VX multiplied by 2 (shift left)', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 136) //odd => most sign bit is 1
            .vx(Constants.FLAG_REGISTER_INDEX, 0x01) //flag 1
            .build()
        sut = new SHL_Vx(chip8State, vx)

        //when
        sut.execute()

        //then
        expect(chip8State.v[Constants.FLAG_REGISTER_INDEX]).to.be.deep.equals(0x01)
        expect(chip8State.v[vx]).to.be.deep.equals(136 << 1)
    })

    it('VF=0) If the most-significant bit of Vx is 0, then VF is set to 0, then VX multiplied by 2 (shift left)', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 32)
            .vx(Constants.FLAG_REGISTER_INDEX, 0x00) //flag 0
            .build()
        sut = new SHL_Vx(chip8State, vx)

        //when
        sut.execute()

        //then
        expect(chip8State.v[Constants.FLAG_REGISTER_INDEX]).to.be.deep.equals(0x00)
        expect(chip8State.v[vx]).to.be.deep.equals(32 << 1)
    })

    it('VF=1) If the most-significant bit of Vx is 0, then VF is set to 0, then VX multiplied by 2 (shift left)', () => {
        //given
        chip8State = new Chip8StateBuilderImpl()
            .vx(vx, 32)
            .vx(Constants.FLAG_REGISTER_INDEX, 0x01) //flag 1
            .build()
        sut = new SHL_Vx(chip8State, vx)

        //when
        sut.execute()

        //then
        expect(chip8State.v[Constants.FLAG_REGISTER_INDEX]).to.be.deep.equals(0x00)
        expect(chip8State.v[vx]).to.be.deep.equals(32 << 1)
    })

})