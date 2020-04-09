import { expect } from "chai";
import { BusImpl } from "../../src/bus/BusImpl";
import { Chip8state } from "../../src/core/Chip8State";
import { Instruction } from "../../src/instructionSet/API/Instruction";
import { DRW_VxVyNibble } from "../../src/instructionSet/DRW_VxVyNibble";
import { Chip8StateBuilderImpl } from "../../src/utils/Chip8StateBuilderImpl";
import { Constants } from "../../src/utils/Constants";
import { FlagRegisterUtils } from "../../src/utils/FlagRegisterUtils";

describe('DRW Vx,Vy,nibble 0xDxyn test: ', () => {

    const colRegister = 5
    const rowRegister = 6
    const firstByteOfSpriteMemoryAddress = 0x000

    let bus = new BusImpl()
    let chip8State: Chip8state
    let sut: Instruction

    function convertCoordinatesToRAMIndex(coordinates: Array<{ row: number, col: number }>) {
        let result: Array<number> = []
        for (let i = 0; i < coordinates.length; i++) {
            result[i] = coordinates[i].row * Constants.SCREEN_WIDTH + coordinates[i].col
        }
        return result
    }

    it('Draw a zero starting from row=5,col=40; this drawing does not cause any collision, so collision flag is reset', () => {
        //given
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }
        const ram = new Array<number>(Constants.RAM_SIZE);
        for (let i = 0; i < Constants.RAM_SIZE; i++) {
            ram[i] = 0
        }

        //zero character
        ram[0] = 0xF0
        ram[1] = 0x90
        ram[2] = 0x90
        ram[3] = 0x90
        ram[4] = 0xF0

        chip8State = new Chip8StateBuilderImpl()
            .vx(colRegister, 40)
            .vx(rowRegister, 5)
            .i(firstByteOfSpriteMemoryAddress)
            .vx(Constants.FLAG_REGISTER_INDEX, 4)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(bus, chip8State, colRegister, rowRegister, 5)

        //when
        sut.execute()

        //then
        const expectedPixels =
            [
                { row: 5, col: 40 }, { row: 5, col: 41 }, { row: 5, col: 42 }, { row: 5, col: 43 }, { row: 6, col: 40 },
                { row: 6, col: 43 }, { row: 7, col: 40 }, { row: 7, col: 43 }, { row: 8, col: 40 }, { row: 8, col: 43 },
                { row: 9, col: 40 }, { row: 9, col: 41 }, { row: 9, col: 42 }, { row: 9, col: 43 }
            ]
        const ramIndexes = convertCoordinatesToRAMIndex(expectedPixels);
        ramIndexes.forEach(index => {
            expect(chip8State.scr[index]).to.be.deep.equals(1)
        })
        expect(new FlagRegisterUtils(chip8State).isCollision()).to.be.false
    })

    it('Sprite exceeding screen width on the right is truncated', () => {
        //given
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
            .vx(colRegister, 62)
            .vx(rowRegister, 1)
            .i(firstByteOfSpriteMemoryAddress)
            .ram(ram)
            .scr(scr)
            .build()
        sut = new DRW_VxVyNibble(bus, chip8State, colRegister, rowRegister, 5)
        sut = new DRW_VxVyNibble(bus, chip8State, 5, 6, 5)

        //when
        sut.execute()

        //then
        const expectedPixels =
            [
                { row: 1, col: 62 }, { row: 1, col: 63 }, { row: 2, col: 62 }, { row: 3, col: 62 }, { row: 4, col: 62 },
                { row: 5, col: 62 }, { row: 5, col: 63 }
            ]
        const ramIndexes = convertCoordinatesToRAMIndex(expectedPixels);
        ramIndexes.forEach(index => {
            expect(chip8State.scr[index]).to.be.deep.equals(1)
        })
    })

    it('Sprite exceeding screen width on the right and screen height on the bottom is truncated on both sides', () => {
        //given
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
            .vx(colRegister, 62)
            .vx(rowRegister, 29)
            .i(firstByteOfSpriteMemoryAddress)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(bus, chip8State, colRegister, rowRegister, 5)

        //when
        sut.execute()

        //then
        const expectedPixels =
            [
                { row: 29, col: 62 }, { row: 29, col: 63 }, { row: 30, col: 62 }, { row: 31, col: 62 }
            ]
        const ramIndexes = convertCoordinatesToRAMIndex(expectedPixels);
        ramIndexes.forEach(index => {
            expect(chip8State.scr[index]).to.be.deep.equals(1)
        })
    })

    it('Sprite wraps around on columns, and is truncated on the bottom of the screen if exceeds screen height on the bottom', () => {
        //given
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
            .vx(colRegister, 80)
            .vx(rowRegister, 29)
            .i(firstByteOfSpriteMemoryAddress)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(bus, chip8State, colRegister, rowRegister, 5)

        //when
        sut.execute()

        //then
        const expectedPixels =
            [
                { row: 29, col: 16 }, { row: 29, col: 17 }, { row: 29, col: 18 }, { row: 29, col: 19 }, { row: 30, col: 16 },
                { row: 30, col: 19 }, { row: 31, col: 16 }, { row: 31, col: 19 }
            ]
        const ramIndexes = convertCoordinatesToRAMIndex(expectedPixels);
        ramIndexes.forEach(index => {
            expect(chip8State.scr[index]).to.be.deep.equals(1)
        })
    })

    it('Sprite wraps around on rows, and is truncated on the bottom of the screen if exceeds screen height on the bottom', () => {
        //given
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
            .vx(colRegister, 40)
            .vx(rowRegister, 60)
            .i(firstByteOfSpriteMemoryAddress)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(bus, chip8State, colRegister, rowRegister, 5)

        //when
        sut.execute()

        //then
        const expectedPixels =
            [
                { row: 28, col: 40 }, { row: 28, col: 41 }, { row: 28, col: 42 }, { row: 28, col: 43 }, { row: 29, col: 40 },
                { row: 29, col: 43 }, { row: 30, col: 40 }, { row: 30, col: 43 }
            ]
        const ramIndexes = convertCoordinatesToRAMIndex(expectedPixels);
        ramIndexes.forEach(index => {
            expect(chip8State.scr[index]).to.be.deep.equals(1)
        })
    })

    it('wraps two times around rows and then is entirely rendered', () => {
        //given
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
            .vx(colRegister, 40)
            .vx(rowRegister, 65)
            .i(firstByteOfSpriteMemoryAddress)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(bus, chip8State, colRegister, rowRegister, 5)

        //when
        sut.execute()

        //then
        const expectedPixels =
            [
                { row: 1, col: 40 }, { row: 1, col: 41 }, { row: 1, col: 42 }, { row: 1, col: 43 }, { row: 2, col: 40 },
                { row: 2, col: 43 }, { row: 3, col: 40 }, { row: 3, col: 43 }, { row: 4, col: 40 }, { row: 4, col: 43 },
                { row: 5, col: 40 }, { row: 5, col: 41 }, { row: 5, col: 42 }, { row: 5, col: 43 }
            ]
        const ramIndexes = convertCoordinatesToRAMIndex(expectedPixels);
        ramIndexes.forEach(index => {
            expect(chip8State.scr[index]).to.be.deep.equals(1)
        })
    })

    it('wraps one time around columns and then is entirely rendered', () => {
        //given
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
            .vx(colRegister, 65)
            .vx(rowRegister, 10)
            .i(firstByteOfSpriteMemoryAddress)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(bus, chip8State, colRegister, rowRegister, 5)

        //when
        sut.execute()

        //then
        const expectedPixels =
            [
                { row: 10, col: 1 }, { row: 10, col: 2 }, { row: 10, col: 3 }, { row: 10, col: 4 }, { row: 11, col: 1 },
                { row: 11, col: 4 }, { row: 12, col: 1 }, { row: 12, col: 4 }, { row: 13, col: 1 }, { row: 13, col: 4 },
                { row: 14, col: 1 }, { row: 14, col: 2 }, { row: 14, col: 3 }, { row: 14, col: 4 }
            ]
        const ramIndexes = convertCoordinatesToRAMIndex(expectedPixels);
        ramIndexes.forEach(index => {
            expect(chip8State.scr[index]).to.be.deep.equals(1)
        })
    })

    it('wraps one time both on columns and on rows and then sprite is rendered truncated because exceeds screen height', () => {
        //given
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
            .vx(colRegister, 65)
            .vx(rowRegister, 60)
            .i(firstByteOfSpriteMemoryAddress)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(bus, chip8State, colRegister, rowRegister, 5)

        //when
        sut.execute()

        //then
        const expectedPixels =
            [
                { row: 28, col: 1 }, { row: 28, col: 2 }, { row: 28, col: 3 }, { row: 28, col: 4 }, { row: 29, col: 1 },
                { row: 29, col: 4 }, { row: 30, col: 1 }, { row: 30, col: 4 }, { row: 31, col: 1 }, { row: 31, col: 4 }
            ]
        const ramIndexes = convertCoordinatesToRAMIndex(expectedPixels);
        ramIndexes.forEach(index => {
            expect(chip8State.scr[index]).to.be.deep.equals(1)
        })
    })

    it('collisinon detecting, pixel in intersection of sprites are turned OFF anf collising flag is set', () => {
        //given
        const scr = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            scr[i] = 0
        }
        scr[394] = 1
        scr[395] = 1
        scr[396] = 1
        scr[397] = 1
        scr[458] = 1
        scr[461] = 1
        scr[522] = 1
        scr[525] = 1
        scr[586] = 1
        scr[589] = 1
        scr[650] = 1
        scr[651] = 1
        scr[652] = 1
        scr[653] = 1

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
            .vx(colRegister, 12)
            .vx(rowRegister, 7)
            .vx(Constants.FLAG_REGISTER_INDEX, 0)
            .i(firstByteOfSpriteMemoryAddress)
            .ram(ram)
            .scr(scr)
            .build()

        sut = new DRW_VxVyNibble(bus, chip8State, colRegister, rowRegister, 5)

        //when
        sut.execute()

        const expectedPixels =
            [
                { row: 7, col: 13 }, { row: 10, col: 12 }
            ]
        const ramIndexes = convertCoordinatesToRAMIndex(expectedPixels);
        ramIndexes.forEach(index => {
            expect(chip8State.scr[index]).to.be.deep.equals(0)
        })
        expect(new FlagRegisterUtils(chip8State).isCollision()).to.be.true
    })
})