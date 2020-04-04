import { expect } from "chai";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { JP_V0addr } from "../../src/instructionSet/JP_V0addr";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { DRW_VxVyNibble } from "../../src/instructionSet/DRW_VxVyNibble";
import { Constants } from "../../src/utils/Constants";
import { CONNREFUSED } from "dns";

describe('', () => {


    let chip8State: Chip8state

    let sut: Instruction

    /*it('', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }

        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(5,40)
            .vx(6,5)
            .i(0x0000)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(chip8State, 5, 6, 5)

        sut.execute()
    })

    it('', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }

        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(5,62)
            .vx(6,1)
            .i(0x0000)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(chip8State, 5, 6, 5)

        sut.execute()
    })

    it('', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }

        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(5,62)
            .vx(6,29)
            .i(0x0000)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(chip8State, 5, 6, 5)

        sut.execute()
    })

    it('', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }

        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(5,80)
            .vx(6,29)
            .i(0x0000)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(chip8State, 5, 6, 5)

        sut.execute()
    })*/

    /*it('', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }

        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(5,40)
            .vx(6,60)
            .i(0x0000)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(chip8State, 5, 6, 5)

        sut.execute()
    })

    it('', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }

        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(5,40)
            .vx(6,65)
            .i(0x0000)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(chip8State, 5, 6, 5)

        sut.execute()
    })

    it('', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }

        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(5,65)
            .vx(6,10)
            .i(0x0000)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(chip8State, 5, 6, 5)

        sut.execute()
    })

    it('', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }

        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(5,65)
            .vx(6,60)
            .i(0x0000)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(chip8State, 5, 6, 5)

        sut.execute()
    })*/

    it('', () => {
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }
        scr[394]=1
        scr[395]=1
        scr[396]=1
        scr[397]=1
        scr[458]=1
        scr[461]=1
        scr[522]=1
        scr[525]=1
        scr[586]=1
        scr[589]=1
        scr[650]=1
        scr[651]=1
        scr[652]=1
        scr[653]=1

        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(5,12)
            .vx(6,7)
            .i(0x0000)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(chip8State, 5, 6, 5)

        sut.execute()
    })
})