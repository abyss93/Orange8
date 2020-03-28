import { Constants } from "../utils/Constants";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class CLS extends AbstractInstruction {

    // 0x00E0
    execute() {
        this.chip8State.scr = new Array<number>(Constants.SCREEN_PIXELS)
    }
}