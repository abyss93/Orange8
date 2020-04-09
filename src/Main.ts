import { Bus } from "./bus/Bus";
import { BusImpl } from "./bus/BusImpl";
import { Chip8 } from "./core/Chip8";
import { Chip8Impl } from "./core/Chip8Impl";
import { Chip8UI } from "./graphics/Chip8UI";
import { Chip8keyboard } from "./input/Chip8Keyboard";

export class Main {

    public start() {

        let bus: Bus = new BusImpl()
        let cpu: Chip8 = new Chip8Impl(bus)
        let gpu: Chip8UI = new Chip8UI(bus)
        let keyBoardController: Chip8keyboard = new Chip8keyboard(bus)

        cpu.bootstrap()
        cpu.loadProgram()

        //while (true) {    game cycle
        // fetch -> decode -> execute
        cpu.fetch()
        cpu.execute(cpu.decode())
        //}
    }
}

const main = new Main()
main.start()