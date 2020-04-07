import { Constants } from "../utils/Constants"

export class Chip8UI {

    private canvas: HTMLCanvasElement
    private graphicContext: CanvasRenderingContext2D | null

    constructor() {
        this.canvas = document.createElement("canvas")
        this.canvas.width = Constants.SCREEN_WIDTH * Constants.CANVAS_PIXEL_SIZE
        this.canvas.height = Constants.SCREEN_HEIGHT * Constants.CANVAS_PIXEL_SIZE
        this.graphicContext = this.canvas.getContext("2d")
        document.body.append(this.canvas)
    }


    public draw(scr: Array<number>): void {
        for (let row = 0; row < Constants.SCREEN_HEIGHT; row++) {
            for (let col = 0; col < Constants.SCREEN_WIDTH; col++) {
                if (scr[row * Constants.SCREEN_WIDTH + col]) {
                    this.graphicContext?.fillRect(col * Constants.CANVAS_PIXEL_SIZE, row * Constants.CANVAS_PIXEL_SIZE, Constants.CANVAS_PIXEL_SIZE, Constants.CANVAS_PIXEL_SIZE)
                }
            }
        }
    }
}