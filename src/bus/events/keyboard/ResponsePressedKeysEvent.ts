

export class ResponsePressedKeysEvent {
    public static readonly ID = "SendPressedKeysEvent"

    constructor(private pressedKeys: boolean[]) {
    }

    public getPressedKeys() {
        return this.pressedKeys
    }
}