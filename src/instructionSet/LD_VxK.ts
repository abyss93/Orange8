import { Bus } from "../bus/Bus";
import { IDLEEvent } from '../bus/events/IDLEEvent';
import { Chip8state } from "../core/Chip8State";
import { KeyDownEvent } from './../bus/events/keyboard/KeyDownEvent';
import { RESUMEEvent } from './../bus/events/RESUMEEvent';
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class LD_VxK extends AbstractInstruction {

    constructor(private bus: Bus, protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    execute() {
        this.bus.raise(IDLEEvent.ID, new IDLEEvent())
        let subscription = this.bus.subscribe(KeyDownEvent.ID, (event: KeyDownEvent) => {
            this.bus.unsubscribe(KeyDownEvent.ID, subscription)
            this.chip8State.v[this.vx] = event.getKeyCode()
            this.bus.raise(RESUMEEvent.ID, new RESUMEEvent())
        })
    }

}