import { Chip8state } from "../core/Chip8State";
import { Chip8StateBuilder } from "./Chip8StateBuilder";

export class Chip8StateBuilderImpl implements Chip8StateBuilder {

    private chip8State: Chip8state

    constructor() {
        this.chip8State = new Chip8state()
    }

    public ram(ram: Array<number>) {
        this.chip8State.ram = ram
        return this
    }

    public v(v: Array<number>) {
        this.chip8State.v = v
        return this
    }

    public vx(x: number, n: number) {
        this.chip8State.vx(x, n)
        return this
    }

    public sp(sp: number) {
        this.chip8State.sp = sp
        return this
    }

    public stack(stack: Array<number>) {
        this.chip8State.stack = stack
        return this
    }

    public ip(ip: number) {
        this.chip8State.ip = ip
        return this
    }

    public i(i: number) {
        this.chip8State.i = i
        return this
    }

    public opcode(opcode: number) {
        this.chip8State.opcode = opcode
        return this
    }

    public scr(scr: Array<number>) {
        this.chip8State.scr = scr
        return this
    }

    public delay(delay: number) {
        this.chip8State.delay = delay
        return this
    }

    public sound(sound: number) {
        this.chip8State.sound = sound
        return this
    }

    public build(): Chip8state {
        return this.chip8State
    }
}