import { AbstractInstruction } from "./internal/AbstractInstruction";
import { Chip8state } from "../core/Chip8State";

export class SNE_VxVy extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number, private vy: number) {
        super(chip8State);
    }

    execute(): void {
        if (this.chip8State.v[this.vx] != this.chip8State.v[this.vy]) {
            this.chip8State.ip += 2
        }
    }


}