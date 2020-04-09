export class Keyconverter {

    private static readonly converter: Map<number, number> = new Map([
        [65, 0xA],
        [83, 0xB],
        [68, 0xC],
        [90, 0xD],
        [88, 0xE],
        [67, 0xF],
        [96, 0x0],
        [103, 0x1],
        [104, 0x2],
        [105, 0x3],
        [100, 0x4],
        [101, 0x5],
        [102, 0x6],
        [97, 0x7],
        [98, 0x8],
        [99, 0x9]
    ])

    public static toChip8Key(key: number) {
        // fallback to zero to make things easier
        return this.converter.has(key) ? this.converter.get(key) : 0x0
    }

}