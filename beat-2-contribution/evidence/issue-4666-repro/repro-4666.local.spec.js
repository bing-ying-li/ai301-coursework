// Reproduction for #4666 only (local, never committed): observes current behaviour, fixes nothing.
import { mount } from '@vue/test-utils'
import { TextSelection } from 'prosemirror-state'
import Editor from './Editor'

import MutationObserver from 'mutation-observer'
import Vue from 'vue'

global.MutationObserver = MutationObserver

const localVue = global.localVue
const stubs = { transition: false, UserAvatar: true }

describe('#4666 reproduction: keyboard shortcut for a link', () => {
  let wrapper

  const selectAllText = () => {
    const { state, dispatch } = wrapper.vm.editor.view
    dispatch(state.tr.setSelection(TextSelection.create(state.doc, 1, state.doc.content.size - 1)))
  }

  const pressKey = (key, modifiers) => {
    const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...modifiers })
    wrapper.vm.editor.view.dom.dispatchEvent(event)
    return event
  }

  const linkInputShown = () => wrapper.vm.$refs.linkInput.style.display !== 'none'

  beforeEach(async () => {
    wrapper = mount(Editor, {
      mocks: { $t: (key) => key },
      propsData: { value: '<p>Example text</p>' },
      localVue,
      sync: false,
      stubs,
    })
    await Vue.nextTick()
    selectAllText()
    await Vue.nextTick()
  })

  afterEach(() => wrapper.destroy())

  it('setup: the selection covers the text', () => {
    const { from, to } = wrapper.vm.editor.state.selection
    expect(wrapper.vm.editor.state.doc.textBetween(from, to)).toBe('Example text')
    expect(linkInputShown()).toBe(false)
  })

  it('control: Ctrl+B reaches the editor keymap and makes the selection bold', async () => {
    const event = pressKey('b', { ctrlKey: true })
    await Vue.nextTick()
    console.log('Ctrl+B defaultPrevented:', event.defaultPrevented, 'html:', wrapper.vm.editor.getHTML())
    expect(event.defaultPrevented).toBe(true)
    expect(wrapper.vm.editor.getHTML()).toContain('<strong>')
  })

  it('control: clicking the toolbar link button opens the link input', async () => {
    const button = wrapper.find('button[aria-label="editor.legend.link"]')
    expect(button.exists()).toBe(true)
    await button.trigger('click')
    await Vue.nextTick()
    await Vue.nextTick()
    console.log(
      'after toolbar click:',
      `isLinkInputActive=${wrapper.vm.isLinkInputActive}`,
      `linkInputShown=${linkInputShown()}`,
      `contextMenuOpen=${!!wrapper.vm.$refs.contextMenu.menu}`,
    )
    expect(wrapper.vm.isLinkInputActive).toBe(true)
    expect(linkInputShown()).toBe(true)
    expect(wrapper.vm.$refs.contextMenu.menu).toBeTruthy()
  })

  it.each([
    ['Ctrl+K', { ctrlKey: true }],
    ['Cmd+K', { metaKey: true }],
  ])('observed: %s does not open the link input', async (name, modifiers) => {
    const event = pressKey('k', modifiers)
    await Vue.nextTick()
    await Vue.nextTick()
    console.log(
      `${name}: defaultPrevented=${event.defaultPrevented}`,
      `isLinkInputActive=${wrapper.vm.isLinkInputActive}`,
      `linkInputShown=${linkInputShown()}`,
      `html=${wrapper.vm.editor.getHTML()}`,
    )
    expect(event.defaultPrevented).toBe(false)
    expect(wrapper.vm.isLinkInputActive).toBe(false)
    expect(linkInputShown()).toBe(false)
  })
})
