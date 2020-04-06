export class FontsetLoader {

    private static readonly ZERO = [
        0b11110000,
        0b10010000,
        0b10010000,
        0b10010000,
        0b11110000
    ]

    private static readonly ONE = [
        0b00100000,
        0b01100000,
        0b00100000,
        0b00100000,
        0b01110000,
    ]

    private static readonly TWO = [
        0b11110000,
        0b00010000,
        0b11110000,
        0b10000000,
        0b11110000
    ]

    private static readonly THREE = [
        0b11110000,
        0b00010000,
        0b11110000,
        0b00010000,
        0b11110000
    ]

    private static readonly FOUR = [
        0b10010000,
        0b10010000,
        0b11110000,
        0b00010000,
        0b00010000
    ]

    private static readonly FIVE = [
        0b11110000,
        0b10000000,
        0b11110000,
        0b00010000,
        0b11110000
    ]

    private static readonly SIX = [
        0b11110000,
        0b10000000,
        0b11110000,
        0b10010000,
        0b11110000
    ]

    private static readonly SEVEN = [
        0b11110000,
        0b00010000,
        0b00100000,
        0b01000000,
        0b01000000
    ]

    private static readonly EIGHT = [
        0b11110000,
        0b10010000,
        0b11110000,
        0b10010000,
        0b11110000
    ]

    private static readonly NINE = [
        0b11110000,
        0b10010000,
        0b11110000,
        0b00010000,
        0b11110000
    ]

    private static readonly A = [
        0b11110000,
        0b10010000,
        0b11110000,
        0b10010000,
        0b10010000
    ]

    private static readonly B = [
        0b11100000,
        0b10010000,
        0b11100000,
        0b10010000,
        0b11100000
    ]

    private static readonly C = [
        0b11110000,
        0b10000000,
        0b10000000,
        0b10000000,
        0b11110000
    ]

    private static readonly D = [
        0b11100000,
        0b10010000,
        0b10010000,
        0b10010000,
        0b11100000
    ]

    private static readonly E = [
        0b11110000,
        0b10000000,
        0b11110000,
        0b10000000,
        0b11110000
    ]

    private static readonly F = [
        0b11110000,
        0b10000000,
        0b11110000,
        0b10000000,
        0b10000000
    ]

    private static readonly FONTSET = [
        FontsetLoader.ZERO,
        FontsetLoader.ONE,
        FontsetLoader.TWO,
        FontsetLoader.THREE,
        FontsetLoader.FOUR,
        FontsetLoader.FIVE,
        FontsetLoader.SIX,
        FontsetLoader.SEVEN,
        FontsetLoader.EIGHT,
        FontsetLoader.NINE,
        FontsetLoader.A,
        FontsetLoader.B,
        FontsetLoader.C,
        FontsetLoader.D,
        FontsetLoader.E,
        FontsetLoader.F
    ]

    public static load(memory: Array<number>) {
        for (let i = 0; i < this.FONTSET.length; i++) {
            for (let j = 0; j < this.FONTSET[i].length; j++) {
                memory[i * this.FONTSET[i].length + j] = this.FONTSET[i][j]
            }
        }
    }

}