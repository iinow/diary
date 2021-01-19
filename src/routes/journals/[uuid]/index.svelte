<div>{uuid}</div>

<script context="module" lang="ts">
  export function preload({ params: { uuid } }: PreloadObj) {
    return { uuid }
  }
</script>

<script lang="ts">
  import type { PreloadObj } from '@/model/type'

  export let uuid: string
</script>
