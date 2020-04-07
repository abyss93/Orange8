import { Instruction } from "../instructionSet/API/Instruction";

export interface Chip8 {
    init(): void

    load(): void

    fetch(): void

    decode(): Instruction

    execute(instruction: Instruction): void

    getScr(): Array<number>
}