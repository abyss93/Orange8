import { AbstractInstruction } from "./internal/AbstractInstruction";
import { Chip8state } from "../core/Chip8State";

export class JP extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private jpAddr: number) {
        super(chip8State)
    }

    execute(): void {
        this.chip8State.ip = this.jpAddr
    }
}