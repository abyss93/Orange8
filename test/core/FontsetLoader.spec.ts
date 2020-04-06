import { FontsetLoader } from "../../src/core/FontsetLoader"
import { Constants } from "../../src/utils/Constants";

describe('FontsetLoader test:', () => {

    const ram = new Array<number>(Constants.RAM_SIZE);

    it('loads Fontset in RAM from 0x000', () => {
        //when
        FontsetLoader.load(ram)
    })
})