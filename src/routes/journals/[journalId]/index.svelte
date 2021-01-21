<div>{journalId}</div>

<script context="module" lang="ts">
  export function preload({ params: { journalId } }: PreloadObj) {
    return { journalId }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '@sapper/app'
  import type { PreloadObj } from '@/model/type'

  export let journalId: string

  onMount(() => {
    goto(`/journals/${journalId}/new`)
  })
</script>
