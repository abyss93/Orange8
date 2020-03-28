import { Chip8state } from "../core/Chip8State";

export interface Chip8StateBuilder {
    ram(ram: Array<number>): Chip8StateBuilder

    v(v: Array<number>): Chip8StateBuilder

    sp(sp: number): Chip8StateBuilder

    stack(stack: Array<number>): Chip8StateBuilder

    ip(ip: number): Chip8StateBuilder

    i(i: number): Chip8StateBuilder

    opcode(opcode: number): Chip8StateBuilder

    scr(scr: Array<number>): Chip8StateBuilder

    delay(delay: number): Chip8StateBuilder

    sound(sound: number): Chip8StateBuilder

    build(): Chip8state
}