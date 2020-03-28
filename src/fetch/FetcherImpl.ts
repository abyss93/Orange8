import { Fetcher } from "./Fetcher";

export class FetcherImpl implements Fetcher {

    /**
     * fetch of an instruction from the memory and returns opcode + operands
     * @param pointer current instruction pointer
     * @param memory 
     */
    fetch(pointer: number, memory: Array<number>): number {
        let opcode = memory[pointer]
        opcode = opcode << 8
        opcode = opcode | memory[pointer + 1]
        return opcode
    }
}
