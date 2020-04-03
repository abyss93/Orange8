import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class LD_Iaddr extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private addr: number) {
        super(chip8State);
    }

    execute(): void {
        if (this.addr > 4095) {
            throw new Error("Address exceeds the amount of installed memory: " + this.addr)
        }
        this.chip8State.i = this.addr
    }


}