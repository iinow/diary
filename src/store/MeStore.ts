import { writable } from 'svelte/store'
import type { GetMeQuery } from '@/generated/graphql'
import { GetMe } from '@/generated/graphql'

const createMe = () => {
  const { set, subscribe } = writable<GetMeQuery>(undefined)
  const call = () => {
    GetMe({}).subscribe((user) => set(user.data))
  }

  return {
    set: (me: GetMeQuery) => set(me),
    call,
    subscribe,
  }
}

export const meStore = createMe()
