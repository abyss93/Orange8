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


}