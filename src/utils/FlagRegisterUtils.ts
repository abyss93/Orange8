import { Chip8state } from "../core/Chip8State";
import { Constants } from "./Constants";

export class FlagRegisterUtils {

    private flags: Array<number>

    constructor(private chip8State: Chip8state) {
        this.flags = chip8State.v
    }

    public setCarryFlag() {
        this.flags[Constants.FLAG_REGISTER_INDEX] = this.flags[Constants.FLAG_REGISTER_INDEX] | 0b00000001
    }

    public resetCarryFlag() {
        this.flags[Constants.FLAG_REGISTER_INDEX] = this.flags[Constants.FLAG_REGISTER_INDEX] & 0b00001110
    }

    public setBorrowFlag() {
        this.flags[Constants.FLAG_REGISTER_INDEX] = this.flags[Constants.FLAG_REGISTER_INDEX] | 0b00000010
    }

    public resetBorrowFlag() {
        this.flags[Constants.FLAG_REGISTER_INDEX] = this.flags[Constants.FLAG_REGISTER_INDEX] & 0b00001101
    }

    public setCollisionFlag() {
        this.flags[Constants.FLAG_REGISTER_INDEX] = this.flags[Constants.FLAG_REGISTER_INDEX] | 0b00000100
    }

    public resetCollisionFlag() {
        this.flags[Constants.FLAG_REGISTER_INDEX] = this.flags[Constants.FLAG_REGISTER_INDEX] & 0b00001011
    }
}