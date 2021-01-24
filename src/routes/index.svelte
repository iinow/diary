<style>
</style>

<svelte:head>
  <title>Diary</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h2 class="title">오늘 일기</h2>
    <Button tag="a" href="/journals">일기 바로가기</Button>
  </div>
  <div class="container">
    <h2 class="title">이번 달</h2>
  </div>
</section>

<script lang="ts">
  import Button from 'svelma/src/components/Button.svelte'
  import { meStore } from '@/store'

  if (process.browser) {
    meStore.call()
  }
</script>
