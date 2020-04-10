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
        this.bus.raise(RequestPressedKeysEvent.ID, (event: ResponsePressedKeysEvent) => {
            if (event.getPressedKeys()[this.chip8State.v[this.vx]]) {
                this.chip8State.ip += 2
            }
        })
    }

}