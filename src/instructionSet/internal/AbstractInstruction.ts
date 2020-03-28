import { Instruction } from "../API/Instruction";
import { Chip8state } from "../../core/Chip8State";

export abstract class AbstractInstruction implements Instruction {

    constructor(protected chip8State: Chip8state) { }

    abstract execute(): void
}