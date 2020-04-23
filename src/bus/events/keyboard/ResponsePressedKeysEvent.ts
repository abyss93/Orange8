

export class ResponsePressedKeysEvent {
    public static readonly ID = "SendPressedKeysEvent"

    constructor(private pressedKeys: number[]) {
    }

    public getPressedKeys() {
        return this.pressedKeys
    }
}