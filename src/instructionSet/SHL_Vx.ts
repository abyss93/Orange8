import { Chip8state } from "../core/Chip8State";
import { FlagRegisterUtils } from "../utils/FlagRegisterUtils";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class SHL_Vx extends AbstractInstruction {

    private static MOST_SIGNIFICANT_BIT_MASK = 0x80

    constructor(protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    execute(): void {
        let most_significant_bit = this.chip8State.v[this.vx] & SHL_Vx.MOST_SIGNIFICANT_BIT_MASK
        const flagRegisterUtils = new FlagRegisterUtils(this.chip8State);
        if (most_significant_bit === 0) {
            flagRegisterUtils.resetCarryFlag()
        } else if (most_significant_bit === 128) {
            flagRegisterUtils.setCarryFlag()
        } else {
            throw new Error("Invalid least significant bit value: " + most_significant_bit)
        }
        this.chip8State.v[this.vx] = this.chip8State.v[this.vx] << 1
    }

}