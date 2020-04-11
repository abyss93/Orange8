export class ROMReader {

    public async loadRomFile() {
        const response = await fetch('http://localhost/chip8/test.ch8', { mode: "cors" })
        const arrayBuffer = await response.arrayBuffer()
        return new Uint8Array(arrayBuffer)
    }
}