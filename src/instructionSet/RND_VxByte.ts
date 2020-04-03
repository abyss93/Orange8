import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class RND_VxByte extends AbstractInstruction {

    constructor(protected chip8State: Chip8state, private vx: number, private kk: number, private funcRnd: () => number) {
        super(chip8State)
    }

    execute(): void {
        this.chip8State.v[this.vx] = this.kk & this.funcRnd()
    }
}