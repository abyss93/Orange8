import { Instruction } from "../API/Instruction";
import { AbstractInstruction } from "../internal/AbstractInstruction";

export class IDLE extends AbstractInstruction {
    execute(): void {
    }
}