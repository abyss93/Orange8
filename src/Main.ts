import { Chip8 } from "./core/Chip8";
import { Chip8Impl } from "./core/Chip8Impl";
import { Chip8UI } from "./graphics/Chip8UI";
import { Instruction } from "./instructionSet/API/Instruction";
import { Chip8keyboard } from "./input/Chip8Keyboard";

export class Main {

    public start() {

        let chip8: Chip8 = new Chip8Impl()
        let chip8UI: Chip8UI = new Chip8UI()
        let chip8Keyboard: Chip8keyboard = new Chip8keyboard()

        chip8.init()
        chip8.load()

        //while (true) {    game cycle
        

        // fetch -> decode -> execute
        chip8.fetch()
        chip8.execute(chip8.decode())

        // update screen
        chip8UI.draw(chip8.getScr())

        // use of chip8Keyboard

        //}
    }
}

const main = new Main()
main.start()