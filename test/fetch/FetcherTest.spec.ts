import { Fetcher } from "../../src/fetch/Fetcher";
import { FetcherImpl } from "../../src/fetch/FetcherImpl";
import { expect } from "chai"

describe('Fetcher test: ', () => {

    let fetcher: Fetcher

    before('', () => {
        fetcher = new FetcherImpl()
    })

    it('Correctly fetch an instruction from memory', () => {
        //given
        let pointer: number = 0x0;
        let memory: Array<number> = new Array<number>(2);
        memory[0] = 0x00;
        memory[1] = 0xE0;

        //when
        let opcode = fetcher.fetch(pointer, memory);

        //then
        expect(opcode).to.be.deep.equal(0x00E0);
    })

})