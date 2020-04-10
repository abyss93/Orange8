import { Instruction } from "../instructionSet/API/Instruction";

export interface Chip8 {
    bootstrap(): void

    loadProgram(): void

    fetch(): void

    decode(): Instruction

    execute(instruction: Instruction): void
}