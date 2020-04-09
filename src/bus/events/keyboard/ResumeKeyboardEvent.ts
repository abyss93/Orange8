import { BusEvent } from "../BusEvent";

export class StartKeyboardEvent implements BusEvent{
    public static readonly ID = "ResumeKeyboardEvent"
}