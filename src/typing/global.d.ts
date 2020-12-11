// declare global {
declare namespace NodeJS {
  export interface Process {
    browser: boolean
  }
}

declare module 'svelma' {
  import { SvelteComponent } from 'svelte'

  export const Button: SvelteComponent
  // eslint-disable-next-line no-use-before-define
  export const Notification: NotificationInterface
  export const Collapse: SvelteComponent
  export const Dialog: SvelteComponent
  export const Field: SvelteComponent
  export const Icon: SvelteComponent
  // eslint-disable-next-line no-use-before-define
  export const Input: InputInterface
  export const Message: SvelteComponent
  export const Modal: SvelteComponent
  export const Progress: SvelteComponent
  export const Select: SvelteComponent
  export const Snackbar: SvelteComponent
  export const Switch: SvelteComponent
  export const Tab: SvelteComponent
  export const Tabs: SvelteComponent
  export const Tag: SvelteComponent
  export const Taglist: SvelteComponent
  export const Toast: SvelteComponent
  export const Tooltip: SvelteComponent

  export interface NotificationInterface {
    // eslint-disable-next-line no-unused-vars
    create(props: string | { message: string; any? }): void
  }

  interface InputInterface {
    type: 'text'
    placeholder?: string
  }
}
