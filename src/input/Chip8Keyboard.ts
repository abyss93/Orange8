export class Chip8keyboard {

    private static readonly KEY_UP = 'keyup'
    private static readonly KEY_DOWN = 'keydown'

    private keys: boolean[] = []

    constructor() {
        window.addEventListener(Chip8keyboard.KEY_UP, (event) => {
            //keyup => keys[keyCode] = false
            this.keys[event.keyCode] = (event.type === Chip8keyboard.KEY_DOWN)
        })
        window.addEventListener(Chip8keyboard.KEY_DOWN, (event) => {
            //keydown => keys[keyCode] = true
            this.keys[event.keyCode] = (event.type === Chip8keyboard.KEY_DOWN)
        })
    }

    public getKeys() {
        return this.keys
    }
}