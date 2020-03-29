import { AbstractInstruction } from "./internal/AbstractInstruction";
import { Chip8state } from "../core/Chip8State";

export class CALL extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private callAddr: number) {
        super(chip8State)
    }

    execute(): void {
        this.chip8State.sp += 1
        this.chip8State.stack[this.chip8State.sp] = this.chip8State.ip
        this.chip8State.ip = this.callAddr
    }

}