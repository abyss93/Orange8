import { AbstractInstruction } from "./internal/AbstractInstruction";
import { Chip8state } from "../core/Chip8State";

export class SE_VxByte extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number, private kk: number) {
        super(chip8State)
    }

    execute(): void {
        if (this.chip8State.v[this.vx] === this.kk) {
            this.chip8State.ip += 2
        }
    }

}