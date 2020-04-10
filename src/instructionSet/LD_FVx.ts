import { Chip8state } from "../core/Chip8State";
import { FontsetLoader } from './../core/FontsetLoader';
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class LD_FVx extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    execute(): void {
        this.chip8State.i = this.chip8State.v[this.vx] * FontsetLoader.DEFAULT_FONT_HEIGHT
    }

}