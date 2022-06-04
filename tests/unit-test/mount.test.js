import { mount } from '@vue/test-utils';
import { Component } from 'Component.vue';

document.body.innerHTML = `
    <div>
        <h1>None Vue app</h1>
        <div id="app"></div>
    </div>
`

test('mounts on a specific element', () => {
    const wrapper = mount(Component, {
        attachTo: document.getElementById('app');
    })

    expect(document.body.innerHTML).toBe(`
    <div>
        <h1>None Vue app</h1>
        <div id="app"><div data-v-app=""><p>Vue Component</p></div></div>
    </div>
    `)
})