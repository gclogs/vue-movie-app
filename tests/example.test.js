import { asyncFn } from "./example";

describe('asyncronous', () => {
    test('async/await', async () => {
        const res = await asyncFn()
        expect(res).toBe('Done!')
    }, 7000)
})