import { Bus } from "../bus/Bus";
import { StartKeyboardEvent } from "../bus/events/keyboard/ResumeKeyboardEvent";
import { StopKeyboardEvent } from "../bus/events/keyboard/SuspendKeyboardEvent";
import { Chip8state } from "../core/Chip8State";
import { Constants } from "../utils/Constants";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class LD_VxK extends AbstractInstruction {

    constructor(private bus: Bus, protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    private keyPressPromise() {
        return new Promise(resolve => window.addEventListener(Constants.KEY_DOWN, resolve, { once: true }));
    }

    async execute(): Promise<void> {
        this.bus.raise(StopKeyboardEvent.ID, new StopKeyboardEvent())

        const pressedKey = await this.keyPressPromise()

        //validare il tasto

        this.chip8State.vx[this.vx] = pressedKey

        this.bus.raise(StartKeyboardEvent.ID, new StartKeyboardEvent())
    }

}