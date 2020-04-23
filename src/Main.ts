import { Bus } from "./bus/Bus";
import { BusImpl } from "./bus/BusImpl";
import { Chip8 } from "./core/Chip8";
import { Chip8Impl } from "./core/Chip8Impl";
import { Chip8UI } from "./graphics/Chip8UI";
import { Chip8keyboard } from "./input/Chip8Keyboard";
import { ROMReader } from './input/ROMReader';

export class Main {

    private static readonly FPS = 40
    private static readonly INSTRUCTIONS_PER_CYCLE = 20

    public start() {

        let bus: Bus = new BusImpl()
        let cpu: Chip8 = new Chip8Impl(bus)
        let gpu: Chip8UI = new Chip8UI(bus)
        let keyBoardController: Chip8keyboard = new Chip8keyboard(bus)
        let fileReader = new ROMReader()

        cpu.bootstrap()
        let romPromise = fileReader.loadRomFile()
        romPromise.then(rom => {
            cpu.loadProgram(rom)
            function animate() {
                setTimeout(function () {
                    requestAnimationFrame(animate)
                    for (let i = 0; i < Main.INSTRUCTIONS_PER_CYCLE; i++) {
                        cpu.fetch();
                        let instruction = cpu.decode();
                        cpu.execute(instruction);
                    }
                    cpu.handleTimers();
                }, 1000 / Main.FPS)
            }
            animate()
        })


    }
}

const main = new Main()
main.start()