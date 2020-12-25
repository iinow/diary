import { Circle } from 'svelte-loading-spinners'

export function createCircle() {
  const circle = new Circle({
    target: document.body,
  })

  circle.$on('distroyed', circle.$destroy)
  return circle
}
