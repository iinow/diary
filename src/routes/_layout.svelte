<style>
</style>

{#if $loadingStore}
  <Loading />
{:else}
  <Header />
  <main class="container pt-6">
    <slot />
  </main>
{/if}

<script lang="ts">
  import { onMount } from 'svelte'
  import 'bulma/css/bulma.css'
  import Header from '@/components/Header.svelte'
  import { loadingStore } from '@/store/LoadingStore'
  import Loading from '@/components/WaveLoading.svelte'

  onMount(() => {
    loadingStore.complete()
  })
</script>
