import { Chip8state } from "../core/Chip8State";
import { FlagRegisterUtils } from "../utils/FlagRegisterUtils";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class SUBN_VxVy extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number, private vy: number) {
        super(chip8State)
    }

    execute(): void {
        const flagRegisterUtils = new FlagRegisterUtils(this.chip8State);
        if (this.chip8State.v[this.vy] > this.chip8State.v[this.vx]) {
            flagRegisterUtils.setBorrowFlag()
        } else {
            flagRegisterUtils.resetBorrowFlag()
        }
        this.chip8State.v[this.vx] = this.chip8State.v[this.vy] - this.chip8State.v[this.vx]
    }

}