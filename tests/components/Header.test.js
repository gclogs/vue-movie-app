import { shallowMount } from '@vue/test-utils'
import router from '~/routes'
import store from '~/store'
import Header from '~/components/Header'

describe('components/Header.vue', () => {
    /* 고유한 환경에서 테스트를 해야 변수안에 있는 값(데이터)이 오염되지 않는다. */
    let wrapper = undefined;
    beforeEach(async () => {
        window.scrollTo = jest.fn() // scrollTo 메소드를 지원하지 않음.
        router.push('/movie/tt1234567')
        await router.isReady()
        wrapper = shallowMount(Header, {
            global: {
                plugins: [
                    router,
                    store
                ]
            }
        })
    })

    test('경로 정규표현식이 없는 경우 일치하지 않습니다.', () => {
        const regExp = undefined
        expect(wrapper.vm.isMatch(regExp)).toBe(false)
    })

    test('경로 정규표현식과 일치해야 합니다.', () => {
        const regExp = /^\/movie/
        expect(wrapper.vm.isMatch(regExp)).toBe(true)
    })

    test('경로 정규표현식과 일치하지 않아야 합니다.', () => {
        const regExp = /^\/movie/
        expect(wrapper.vm.istMatch(regExp)).toBe(false);
    })
})