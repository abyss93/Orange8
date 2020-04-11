import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class ADD_VxByte extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number, private kk: number) {
        super(chip8State)
    }

    execute(): void {
        let sum = this.chip8State.v[this.vx] + this.kk
        let leastSignificantByte = sum & 0xFF
        this.chip8State.v[this.vx] = leastSignificantByte
    }

}