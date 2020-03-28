export interface Fetcher {
    fetch(pointer: number, memory: Array<number>): number
}
