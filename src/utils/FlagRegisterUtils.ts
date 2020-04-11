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
        this.flags[Constants.FLAG_REGISTER_INDEX] = this.flags[Constants.FLAG_REGISTER_INDEX] & 0b00000000
    }

    public setBorrowFlag() {
        this.setCarryFlag()
    }

    public resetBorrowFlag() {
        this.resetCarryFlag()
    }

    public setCollisionFlag() {
        this.setCarryFlag()
    }

    public resetCollisionFlag() {
        this.resetCarryFlag()
    }

    public isCollision() {
        return this.flags[Constants.FLAG_REGISTER_INDEX] === 1 ? true : false
    }
}