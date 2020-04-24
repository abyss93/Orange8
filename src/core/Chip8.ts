import { Instruction } from "../instructionSet/API/Instruction";

export interface Chip8 {
    bootstrap(): void

    loadRom(rom: Uint8Array): void

    handleTimers(): void

    fetch(): void

    decode(): Instruction

    execute(instruction: Instruction): void
}