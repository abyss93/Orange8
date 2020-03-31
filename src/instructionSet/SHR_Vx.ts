import { Chip8state } from "../core/Chip8State";
import { FlagRegisterUtils } from "../utils/FlagRegisterUtils";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class SHR_Vx extends AbstractInstruction {

    private static LEAST_SIGNIFICANT_BIT_MASK = 0x01

    constructor(protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    execute(): void {
        let least_significant_bit = this.chip8State.v[this.vx] & SHR_Vx.LEAST_SIGNIFICANT_BIT_MASK
        const flagRegisterUtils = new FlagRegisterUtils(this.chip8State);
        if (least_significant_bit === 0) {
            flagRegisterUtils.resetCarryFlag()
        } else if (least_significant_bit === 1) {
            flagRegisterUtils.setCarryFlag()
        } else {
            throw new Error("Invalid least significant bit value: " + least_significant_bit)
        }
        this.chip8State.v[this.vx] = this.chip8State.v[this.vx] >> 1
    }

}