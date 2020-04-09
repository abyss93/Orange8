import { BusEvent } from "../BusEvent";

export abstract class AbstractKeyEvent implements BusEvent {
    
    constructor(private keyCode: number) {
    }

    public getKeyCode() {
        return this.keyCode
    }
}