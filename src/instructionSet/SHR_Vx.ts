import { Chip8state } from "../core/Chip8State";
import { FlagRegisterUtils } from "../utils/FlagRegisterUtils";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class SHR_Vx extends AbstractInstruction {

    private static LEAST_SIGNIFICANT_BIT_MASK = 0x01

    constructor(protected chip8State: Chip8state, private vx: number, private vy: number) {
        super(chip8State)
    }

    execute(): void {
        let flags = new FlagRegisterUtils(this.chip8State)
        if ((this.chip8State.v[this.vx] & 0x01) === 1) {
            flags.setCarryFlag()
        } else {
            flags.resetCarryFlag()
        }
        this.chip8State.v[this.vx] = this.chip8State.v[this.vx] >> 1
    }

}