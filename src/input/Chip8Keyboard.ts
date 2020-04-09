import { Bus } from "../bus/Bus";
import { KeyDownEvent } from "../bus/events/keyboard/KeyDownEvent";
import { KeyUpEvent } from "../bus/events/keyboard/KeyUpEvent";

export class Chip8keyboard {

    private static readonly KEY_UP = 'keyup'
    private static readonly KEY_DOWN = 'keydown'
    private bus: Bus

    private keys: boolean[] = []

    constructor(bus: Bus) {
        this.bus = bus
        window.addEventListener(Chip8keyboard.KEY_UP, (event) => {
            //keyup => keys[keyCode] = false
            this.keys[event.keyCode] = (event.type === Chip8keyboard.KEY_DOWN)
            this.bus.raise(KeyUpEvent.ID, new KeyUpEvent(event.keyCode))
        })
        window.addEventListener(Chip8keyboard.KEY_DOWN, (event) => {
            //keydown => keys[keyCode] = true
            this.keys[event.keyCode] = (event.type === Chip8keyboard.KEY_DOWN)
            this.bus.raise(KeyDownEvent.ID, new KeyDownEvent(event.keyCode))
        })
    }

    public getKeys() {
        return this.keys
    }
}