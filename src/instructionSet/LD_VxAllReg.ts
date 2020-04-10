import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class LD_VxAllRegs extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    execute(): void {
        for (let i = 0; i <= this.vx; i++) {
            this.chip8State.v[i] = this.chip8State.ram[this.chip8State.i + i]
        }
    }

}