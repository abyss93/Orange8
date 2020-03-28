
export interface Chip8 {
    init(): void;

    fetch(): void;

    decode(): void;

    execute(): void;

}