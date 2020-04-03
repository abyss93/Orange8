import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class JP_V0addr extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private addr: number) {
        super(chip8State)
    }

    execute(): void {
        if (this.addr > 4095) {
            throw new Error("Invalid size of operand: " + 4095)
        }
        this.chip8State.ip = this.chip8State.v[0] + this.addr
    }

}