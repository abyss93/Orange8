export class Constants {

    public static readonly RAM_SIZE: number = 4096;
    public static readonly STACK_SIZE: number = 16;
    public static readonly NUMBER_OF_GENERAL_REGISTERS: number = 16;
    public static readonly SCREEN_WIDTH = 64;
    public static readonly SCREEN_HEIGHT = 32;
    public static readonly SCREEN_PIXELS: number = Constants.SCREEN_WIDTH * Constants.SCREEN_HEIGHT;
    public static readonly FLAG_REGISTER_INDEX: number = 15;

    private constructor() { }

}