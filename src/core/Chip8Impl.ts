import { Chip8 } from "./Chip8";
import { Chip8state } from "./Chip8State";
import { Fetcher } from "../fetch/Fetcher";
import { FetcherImpl } from "../fetch/FetcherImpl";
import { IDLE } from "../instructionSet/custom/IDLE";
import { Chip8StateBuilderImpl } from "../utils/Chip8StateBuilderImpl";
import { Constants } from "../utils/Constants";
import { Instruction } from "../instructionSet/API/Instruction";
import { CLS } from "../instructionSet/CLS";
import { RET } from "../instructionSet/RET";
import { JP } from "../instructionSet/JP";
import { CALL } from "../instructionSet/CALL";
import { SE_VxByte } from "../instructionSet/SE_VxByte";
import { SNE_VxByte } from "../instructionSet/SNE_VxByte";
import { SE_VxVy } from "../instructionSet/SE_VxVy";
import { LD_VxByte } from "../instructionSet/LD_VxByte";

export class Chip8Impl implements Chip8 {

    private chip8State: Chip8state

    private fetcher: Fetcher;

    constructor() {
        this.fetcher = new FetcherImpl()
        this.chip8State = new Chip8state()
        this.init()
    }

    public init(): void {
        this.chip8State = new Chip8StateBuilderImpl()
            .ram(new Array<number>(Constants.RAM_SIZE))
            .stack(new Array<number>(Constants.STACK_SIZE))
            .v(new Array<number>(Constants.NUMBER_OF_GENERAL_REGISTERS))
            .sp(0)
            .ip(0x200)
            .i(0)
            .scr(new Array<number>(Constants.SCREEN_PIXELS))
            .delay(0)
            .sound(0)
            .opcode(0)
            .build()

        // TODO: load fontset in ram
    }

    public fetch(): void {
        const ip = this.chip8State.ip
        const ram = this.chip8State.ram
        this.chip8State.opcode = this.fetcher.fetch(ip, ram)
    }

    public decode(): Instruction {
        // Instruction pointer to the next instruction
        this.chip8State.ip += 2;

        let maskFormat: number = 0xF000;
        let format: number = (this.chip8State.opcode & maskFormat) >> 12;

        let opcode = this.chip8State.opcode

        switch (format) {
            case 0x0:
                let mask0 = 0x00FF;
                let format0 = (opcode & mask0) << 8;
                switch (format0) {
                    case 0xE0:
                        return new CLS(this.chip8State)
                    case 0xEE:
                        return new RET(this.chip8State)
                }
                break;
            case 0x1:
                let mask1 = 0x0FFF
                let jpAddr = opcode & mask1
                return new JP(this.chip8State, jpAddr)
                break;
            case 0x2:
                let mask2 = 0x0FFF
                let callAddr = opcode & mask2
                return new CALL(this.chip8State, callAddr)
                break;
            case 0x3:
                let mask3vx = 0x0F00
                let vx_0x3 = (opcode & mask3vx) >> 8
                let mask3kk = 0x00FF
                let kk_0x3 = opcode & mask3kk
                return new SE_VxByte(this.chip8State, vx_0x3, kk_0x3)
                break;
            case 0x4:
                let mask4vx = 0x0F00
                let vx_0x4 = (opcode & mask4vx) >> 8
                let mask4kk = 0x00FF
                let kk_0x4 = opcode & mask4kk
                return new SNE_VxByte(this.chip8State, vx_0x4, kk_0x4)
                break;
            case 0x5:
                let mask5x = 0x0F00
                let vx_0x5 = (opcode & mask5x) >> 8
                let mask5y = 0x00F0
                let vy_0x5 = (opcode & mask5y) >> 4
                return new SE_VxVy(this.chip8State, vx_0x5, vy_0x5)
                break;
            case 0x6:
                let mask6x = 0x0F00
                let vx_0x6 = (opcode & mask6x) >> 8
                let mask6_kk = 0x00FF
                let kk_0x6 = (opcode & mask6_kk)
                return new LD_VxByte(this.chip8State, vx_0x6, kk_0x6)
                break;
            case 0x7:
                break;
            case 0x8:
                let mask8 = 0x000F;
                let format8 = (opcode & mask8) << 12;
                switch (format8) {
                    case 0x1:
                        break;
                    case 0x2:
                        break;
                    case 0x3:
                        break;
                    case 0x4:
                        break;
                    case 0x5:
                        break;
                    case 0x6:
                        break;
                    case 0x7:
                        break;
                    case 0xE:
                        break;
                }
                break;
            case 0x9:
                break;
            case 0xA:
                break;
            case 0xB:
                break;
            case 0xC:
                break;
            case 0xD:
                break;
            case 0xE:
                let maskE = 0x00FF;
                let formatE = (opcode & maskE) << 8;
                switch (formatE) {
                    case 0x9e:
                        break;
                    case 0xa1:
                        break;
                }
                break;
            case 0xF:
                let maskF = 0x00FF;
                let formatF = (opcode & maskF) << 8;
                switch (formatF) {
                    case 0x07:
                        break;
                    case 0x0A:
                        break;
                    case 0x15:
                        break;
                    case 0x18:
                        break;
                    case 0x1E:
                        break;
                    case 0x29:
                        break;
                    case 0x33:
                        break;
                    case 0x55:
                        break;
                    case 0x65:
                        break;
                }
                break;
            default:
                throw new Error("Invalid Instruction OPCODE");
        }
        return new IDLE(this.chip8State)
    }

    public execute(): void {

    }



}
