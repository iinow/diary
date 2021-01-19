<div>
  {#if responseDiaries !== undefined}
    {#each responseDiaries.diaries.items as diary}
      <div>{diary.title}</div>
    {/each}
  {/if}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import { GetDiaries } from '@/generated/graphql'
  import type { GetDiariesQuery } from '@/generated/graphql'

  let responseDiaries: GetDiariesQuery
  let page: number = 1
  let cntPageItem: number = 10

  onMount(() => {
    GetDiaries({ variables: { page, cntPageItem } }).subscribe((diaries) => {
      if (diaries?.data) {
        responseDiaries = diaries.data
      }
    })
  })
</script>
