import { Chip8 } from "./core/Chip8";
import { Chip8Impl } from "./core/Chip8Impl";

export class Main {

    public main() {

        let chip8: Chip8 = new Chip8Impl();

        // setup gfx
        // setup input

        chip8.init();
        // TODO: chip8.loadSw();

        while(true){
            chip8.fetch();
            chip8.decode();
            chip8.execute();

            // TODO: update gfx
            // TODO: manage inputsF
        }
    }
}