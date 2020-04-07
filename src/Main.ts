import { Chip8 } from "./core/Chip8";
import { Chip8Impl } from "./core/Chip8Impl";
import { Chip8UI } from "./graphics/Chip8UI";

export class Main {

    public start() {

        let chip8: Chip8 = new Chip8Impl()
        let chip8UI: Chip8UI = new Chip8UI()
        // setup input

        chip8.init();
        // TODO: chip8.loadSw();

        while (true) {
            chip8.fetch();
            chip8.decode();
            chip8.execute();

            // TODO: update chip8UI
            // TODO: manage input
        }
    }
}

const main = new Main()
main.start()