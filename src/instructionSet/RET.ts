import { AbstractInstruction } from "./internal/AbstractInstruction";

export class RET extends AbstractInstruction {

    execute(): void {
        this.chip8State.ip = this.chip8State.stack[this.chip8State.sp]
        this.chip8State.sp -= 1
    }

}