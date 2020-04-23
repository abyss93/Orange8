import { Bus } from "../bus/Bus";
import { RequestPressedKeysEvent } from "../bus/events/keyboard/RequestPressedKeysEvent";
import { ResponsePressedKeysEvent } from "../bus/events/keyboard/ResponsePressedKeysEvent";
import { Chip8state } from "../core/Chip8State";
import { AbstractInstruction } from "./internal/AbstractInstruction";

export class SKP_Vx extends AbstractInstruction {

    constructor(private bus: Bus, protected chip8State: Chip8state, private vx: number) {
        super(chip8State)
    }

    execute(): void {
        let subscription = this.bus.subscribe(ResponsePressedKeysEvent.ID, (event: ResponsePressedKeysEvent) => {
            this.bus.unsubscribe(ResponsePressedKeysEvent.ID, subscription)
            if (event.getPressedKeys()[0] === this.chip8State.v[this.vx]) {
                this.chip8State.ip += 2
            }
        })
        this.bus.raise(RequestPressedKeysEvent.ID, () => { })
    }

}