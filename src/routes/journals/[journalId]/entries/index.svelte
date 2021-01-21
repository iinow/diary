<div>
  {#if responseDiaries !== undefined}
    {#each responseDiaries.diaries.items as diary}
      <div>{diary.title}</div>
    {/each}
  {/if}
</div>

<script context="module" lang="ts">
  export function preload({ params: { journalId } }: PreloadObj) {
    return { journalId }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { GetDiaries } from '@/generated/graphql'
  import type { GetDiariesQuery } from '@/generated/graphql'
  import type { PreloadObj } from '@/model/type';

  let responseDiaries: GetDiariesQuery
  let page: number = 1
  let cntPageItem: number = 10

  export let journalId: number

  onMount(() => {
    GetDiaries({ variables: { page, cntPageItem, journalId: Number(journalId) } }).subscribe((diaries) => {
      if (diaries?.data) {
        responseDiaries = diaries.data
      }
    })
  })
</script>
