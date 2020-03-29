import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class ADD_VxByte extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number, private kk: number) {
        super(chip8State)
    }

    execute(): void {
        this.chip8State.v[this.vx] += this.kk
        if (this.chip8State.v[this.vx] > 255) {
            this.chip8State.v[this.vx] = 255
        }
    }

}