import { Bus } from "../bus/Bus";
import { KeyDownEvent } from "../bus/events/keyboard/KeyDownEvent";
import { KeyUpEvent } from "../bus/events/keyboard/KeyUpEvent";
import { RequestPressedKeysEvent } from "../bus/events/keyboard/RequestPressedKeysEvent";
import { StartKeyboardEvent } from "../bus/events/keyboard/ResumeKeyboardEvent";
import { ResponsePressedKeysEvent } from "../bus/events/keyboard/ResponsePressedKeysEvent";
import { StopKeyboardEvent } from "../bus/events/keyboard/SuspendKeyboardEvent";
import { Constants } from "../utils/Constants";
import { Keyconverter } from "../utils/KeyConverter";

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
        this.bus.subscribe(StopKeyboardEvent.ID, () => this.stopKeyboardEvent())
        this.bus.subscribe(StartKeyboardEvent.ID, () => this.startKeyboardEvent())
        this.bus.subscribe(RequestPressedKeysEvent.ID, () => this.sendPressedKeys())
    }

    startKeyboardEvent(): void {
        window.addEventListener(Constants.KEY_UP, this.keyUpCallback)
        window.addEventListener(Constants.KEY_DOWN, this.keyDownCallback)
    }

    stopKeyboardEvent(): void {
        window.removeEventListener(Constants.KEY_UP, this.keyUpCallback)
        window.removeEventListener(Constants.KEY_DOWN, this.keyDownCallback)
    }

    sendPressedKeys(): void {
        this.bus.raise(ResponsePressedKeysEvent.ID, new ResponsePressedKeysEvent(this.keys))
    }

}