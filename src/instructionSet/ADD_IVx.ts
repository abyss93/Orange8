import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class ADD_IVx extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    execute(): void {
        this.chip8State.i += this.chip8State.v[this.vx]
    }

}