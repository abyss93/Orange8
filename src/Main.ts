import { Chip8 } from "./core/Chip8";
import { Chip8Impl } from "./core/Chip8Impl";
import { Chip8UI } from "./graphics/Chip8UI";
import { Instruction } from "./instructionSet/API/Instruction";

export class Main {

    public start() {

        let chip8: Chip8 = new Chip8Impl()
        let chip8UI: Chip8UI = new Chip8UI()
        // setup input

        chip8.init()
        chip8.load()

        //while (true) {
            chip8.fetch()
            let instrution: Instruction = chip8.decode()
            chip8.execute(instrution)

            let scr = chip8.getScr()
            chip8UI.draw(scr)
            // TODO: manage input
        //}
    }
}

const main = new Main()
main.start()