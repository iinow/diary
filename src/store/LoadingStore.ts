import { writable } from 'svelte/store'

const createLoading = () => {
  const { set, subscribe } = writable<boolean>(true)

  return {
    process: () => set(true),
    complete: () => set(false),
    subscribe,
  }
}

export const loadingStore = createLoading()
