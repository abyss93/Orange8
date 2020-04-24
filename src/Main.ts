import { Bus } from "./bus/Bus";
import { BusImpl } from "./bus/BusImpl";
import { Chip8 } from "./core/Chip8";
import { Chip8Impl } from "./core/Chip8Impl";
import { Chip8UI } from "./graphics/Chip8UI";
import { Chip8keyboard } from "./input/Chip8Keyboard";

export class Main {

    private static readonly FPS = 40
    private INSTRUCTIONS_PER_CLOCK = 20
    private bus: Bus
    private cpu: Chip8
    private gpu: Chip8UI
    private keyBoardController: Chip8keyboard


    constructor() {
        this.bus = new BusImpl()
        this.cpu = new Chip8Impl(this.bus)
        this.gpu = new Chip8UI(this.bus)
        this.keyBoardController = new Chip8keyboard(this.bus)
    }

    public startRom() {
        let self = this
        function animate() {
            setTimeout(function () {
                requestAnimationFrame(animate)
                for (let i = 0; i < self.INSTRUCTIONS_PER_CLOCK; i++) {
                    self.cpu.fetch();
                    let instruction = self.cpu.decode();
                    self.cpu.execute(instruction);
                }
                self.cpu.handleTimers();
            }, 1000 / Main.FPS)
        }
        animate()
    }

    public loadRom(rom: ArrayBuffer) {
        this.cpu.bootstrap()
        this.cpu.loadRom(new Uint8Array(rom))
    }

    public setInstructionPerClock(instructionPerClock: number){
        this.INSTRUCTIONS_PER_CLOCK = instructionPerClock
    }
}

let main: Main
module.exports = {
    initHardware: function () {
        main = new Main();
    },

    loadRom: function (rom: ArrayBuffer) {
        main.loadRom(rom)
    },

    startRom: function () {
        main.startRom()
    },

    setInstructionPerClock: function(instructionPerClock: number) {
        if(main != null){
            main.setInstructionPerClock(instructionPerClock)
        }
    }
}

