import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class LD_DTVx extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    execute(): void {
        this.chip8State.delay = this.chip8State.v[this.vx]
    }

}