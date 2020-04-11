import { Bus } from "../bus/Bus";
import { DrawEvent } from "../bus/events/screen/DrawEvent";
import { Constants } from "../utils/Constants";

export class Chip8UI {

    private canvas: HTMLCanvasElement
    private graphicContext: CanvasRenderingContext2D | null
    private bus: Bus

    constructor(bus: Bus) {
        this.bus = bus
        this.bus.subscribe(DrawEvent.ID, (event: DrawEvent) => { this.draw(event.getScr()) })
        this.canvas = document.createElement("canvas")
        this.canvas.width = Constants.SCREEN_WIDTH * Constants.CANVAS_PIXEL_SIZE
        this.canvas.height = Constants.SCREEN_HEIGHT * Constants.CANVAS_PIXEL_SIZE
        this.graphicContext = this.canvas.getContext("2d")
        document.body.append(this.canvas)
    }


    private draw(scr: Array<number>): void {
        for (let row = 0; row < Constants.SCREEN_HEIGHT; row++) {
            for (let col = 0; col < Constants.SCREEN_WIDTH; col++) {
                if (scr[row * Constants.SCREEN_WIDTH + col] === 1) {
                    this.graphicContext?.fillRect(col * Constants.CANVAS_PIXEL_SIZE, row * Constants.CANVAS_PIXEL_SIZE, Constants.CANVAS_PIXEL_SIZE, Constants.CANVAS_PIXEL_SIZE)
                } else {
                    this.graphicContext?.clearRect(col * Constants.CANVAS_PIXEL_SIZE, row * Constants.CANVAS_PIXEL_SIZE, Constants.CANVAS_PIXEL_SIZE, Constants.CANVAS_PIXEL_SIZE)
                }
            }
        }
    }
}