import { BusEvent } from "../BusEvent";

export class DrawEvent implements BusEvent {
    public static readonly ID = "DrawEvent"

    constructor(private scr: Array<number>) {
    }

    public getScr() {
        return this.scr
    }
}