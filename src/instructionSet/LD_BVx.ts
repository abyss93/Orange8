import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class LD_BVx extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    execute(): void {
        let startValue = this.chip8State.v[this.vx]
        let units = startValue % 10
        let tens = Math.trunc((startValue / 10)) % 10
        let hundreds = Math.trunc((startValue / 100)) % 100
        this.chip8State.ram[this.chip8State.i] = hundreds
        this.chip8State.ram[this.chip8State.i + 1] = tens
        this.chip8State.ram[this.chip8State.i + 2] = units
    }

}