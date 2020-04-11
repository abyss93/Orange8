import { Chip8state } from "../core/Chip8State";
import { FlagRegisterUtils } from "../utils/FlagRegisterUtils";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class ADD_VxVy extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number, private vy: number) {
        super(chip8State)
    }

    execute(): void {
        let sum = this.chip8State.v[this.vx] + this.chip8State.v[this.vy]
        if (sum > 255) {
            new FlagRegisterUtils(this.chip8State).setCarryFlag()
        } else {
            new FlagRegisterUtils(this.chip8State).resetCarryFlag()
        }
        this.chip8State.v[this.vx] = sum & 0xFF
    }

}