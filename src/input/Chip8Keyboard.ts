import { Bus } from "../bus/Bus";
import { Keyconverter } from "../bus/events/keyboard/KeyConverter";
import { KeyDownEvent } from "../bus/events/keyboard/KeyDownEvent";
import { KeyUpEvent } from "../bus/events/keyboard/KeyUpEvent";
import { StartKeyboardEvent } from "../bus/events/keyboard/ResumeKeyboardEvent";
import { StopKeyboardEvent } from "../bus/events/keyboard/SuspendKeyboardEvent";
import { Constants } from "../utils/Constants";

export class Chip8keyboard {


    private bus: Bus

    private keys: boolean[] = []

    private keyUpCallback = (event: KeyboardEvent): void => {
        //keyup => keys[keyCode] = false
        this.keys[event.keyCode] = (event.type === Constants.KEY_DOWN);
        this.bus.raise(KeyUpEvent.ID, new KeyUpEvent(Keyconverter.toChip8Key(event.keyCode)));
    };

    private keyDownCallback = (event: KeyboardEvent) => {
        //keydown => keys[keyCode] = true
        this.keys[event.keyCode] = (event.type === Constants.KEY_DOWN)
        this.bus.raise(KeyDownEvent.ID, new KeyDownEvent(Keyconverter.toChip8Key(event.keyCode)))
    }

    constructor(bus: Bus) {
        this.bus = bus
        this.startKeyboardEvent()
        this.bus.subscribe(StopKeyboardEvent.ID, () => this.startKeyboardEvent())
        this.bus.subscribe(StartKeyboardEvent.ID, () => this.stopKeyboardEvent())
    }

    startKeyboardEvent(): void {
        window.addEventListener(Constants.KEY_UP, this.keyUpCallback)
        window.addEventListener(Constants.KEY_DOWN, this.keyDownCallback)
    }

    stopKeyboardEvent(): void {
        window.removeEventListener(Constants.KEY_UP, this.keyUpCallback)
        window.removeEventListener(Constants.KEY_DOWN, this.keyDownCallback)
    }

    public getKeys() {
        return this.keys
    }
}