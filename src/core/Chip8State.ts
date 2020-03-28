import { Constants } from "../utils/Constants";

export class Chip8state {
    // Main memory 4096 locations of 8-bit
    private _ram: Array<number> = []

    // General Purpose Registers 16-bit (15 + 1 Flag), not to be use by programs, used as flag by some instructions
    private _v: Array<number> = []

    // Stack Pointer Register 8-bit
    private _sp: number = 0

    // Stack 16 locations of 16-bit
    private _stack: Array<number> = []

    // Instruction Pointer Register 16-bit
    private _ip: number = 0

    // Memory Location Index Register 16-bit effectively used 12-bit to address RAM
    private _i: number = 0

    // Instruction Code Register 16-bit
    private _opcode: number = 0

    // Screen Pixels State (64 * 32 = 2048px) 2048 locations 8-bit
    private _scr: Array<number> = []

    // Delay Timer Register 8-bit
    private _delay: number = 0

    // Sound Timer Register 8-bit
    private _sound: number = 0

    constructor() {
    }

    public get ram(): Array<number> {
        return this._ram
    }

    public set ram(ram: Array<number>) {
        if (ram.length > Constants.RAM_SIZE) {
            throw new Error("Invalid RAM size")
        }
        this._ram = ram
    }

    public get v(): Array<number> {
        return this._v
    }

    public set v(v: Array<number>) {
        if (v.length > Constants.NUMBER_OF_GENERAL_REGISTERS) {
            throw new Error("Invalid NUMBER OF GENERAL REGISTERS size")
        }
        this._v = v
    }

    public get sp(): number {
        return this._sp
    }

    public set sp(sp: number) {
        if (sp > 255) {
            throw new Error("Invalid STACK POINTER size")
        }
        this._sp = sp
    }

    public get stack(): Array<number> {
        return this._stack
    }

    public set stack(stack: Array<number>) {
        if (stack.length > Constants.STACK_SIZE) {
            throw new Error("Invalid STACK size")
        }
        this._stack = stack
    }

    public get ip(): number {
        return this._ip
    }

    public set ip(ip: number) {
        if (ip > (2 ** 16 - 1)) {
            throw new Error("Invalid INSTRUCTION POINTER size")
        }
        this._ip = ip
    }

    public get i(): number {
        return this._i
    }

    public set i(i: number) {
        if (i > (2 ** 16 - 1)) {
            throw new Error("Invalid INDEX REGISTER size")
        }
        this._i = i
    }

    public get opcode(): number {
        return this._opcode
    }

    public set opcode(opcode: number) {
        if (opcode > (2 ** 16 - 1)) {
            throw new Error("Invalid OPCODE size")
        }
        this._opcode = opcode
    }

    public get scr(): Array<number> {
        return this._scr
    }

    public set scr(scr: Array<number>) {
        if (scr.length > Constants.SCREEN_PIXELS) {
            throw new Error("Invalid SCREEN size")
        }
        this._scr = scr
    }

    public get delay(): number {
        return this._delay
    }

    public set delay(delay: number) {
        if (delay > (2 ** 8 - 1)) {
            throw new Error("Invalid DELAY REGISTER size")
        }
        this._delay = delay
    }

    public get sound(): number {
        return this._sound
    }

    public set sound(sound: number) {
        if (sound > (2 ** 8 - 1)) {
            throw new Error("Invalid SOUND REGISTER size")
        }
        this._sound = sound
    }
}