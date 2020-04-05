import { Constants } from "../utils/Constants";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class CLS extends AbstractInstruction {

    // 0x00E0
    execute() {
        const clearedScreen = new Array<number>(Constants.SCREEN_PIXELS);
        for (let i = 0; i < Constants.SCREEN_PIXELS; i++) {
            clearedScreen[i] = 0
        }
        this.chip8State.scr = clearedScreen
    }
}