/**
 * 비동기 테스트
    import { asyncFn } from "./example";

    describe('asyncronous', () => {
        test('async/await', async () => {
            const res = await asyncFn()
            expect(res).toBe('Done!')
        }, 7000)
    })
 */

import { mount } from '@vue/test-utils';
import Example from './Example.vue';

test('메세지를 변경합니다.', async () => {
    const wrapper = mount(Example)
    // wrapper.vm === this
    expect(wrapper.vm.msg).toBe('Hello Vue test utils?');
    // wrapper.vm.msg = 'Hello HEROPY!'
    await wrapper.setData({
        msg: 'Hello HEROPY'
    })
    expect(wrapper.vm.msg).toBe('Hello HEROPY!');
    expect(wrapper.find('div').text()).toBe('Hello HEROPY!')
})