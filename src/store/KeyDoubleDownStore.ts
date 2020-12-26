import { writable } from 'svelte/store'

const createKeyDown = () => {
  const { set, subscribe } = writable<string>('')
  let lastKey: string = ''

  function handlePressEvent(key: string) {
    if (lastKey === key) {
      set(lastKey)
      lastKey = ''
      return
    }
    lastKey = key
    setTimeout(() => {
      lastKey = ''
      set('')
    }, 500)
  }

  return {
    press: handlePressEvent,
    subscribe,
  }
}

export const keyDownStore = createKeyDown()
