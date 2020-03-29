import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class LD_VxVy extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number, private vy: number) {
        super(chip8State)
    }

    execute(): void {
        this.chip8State.v[this.vx] = this.chip8State.v[this.vy]
    }

}