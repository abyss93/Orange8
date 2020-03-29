import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";
import { Constants } from "../utils/Constants";

export class ADD_VxVy extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number, private vy: number) {
        super(chip8State)
    }

    execute(): void {
        this.chip8State.v[this.vx] += this.chip8State.v[this.vy]
        if (this.chip8State.v[this.vx] > 255) {
            this.chip8State.v[this.vx] = 255
            this.chip8State.v[Constants.FLAG_REGISTER_INDEX] =
                this.chip8State.v[Constants.FLAG_REGISTER_INDEX] | 0x01
        }
    }

}