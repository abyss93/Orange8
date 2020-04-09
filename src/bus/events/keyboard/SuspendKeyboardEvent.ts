import { BusEvent } from "../BusEvent";

export class StopKeyboardEvent implements BusEvent{
    public static readonly ID = "SuspendKeyboardEvent"
}