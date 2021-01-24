<JournalListFilter />

<section class="section">
  <div class="container is-flex is-justify-content-center is-flex-wrap-wrap">
    {#each responseJournal.journals as journal}
      <JournalItem id={journal.id} name={journal.name} createdAt={journal.createdAt}/>
    {/each}
  </div>
</section>

<script context="module" lang="ts">
  export function preload(obj: PreloadObj) {}
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import JournalListFilter from '@/components/JournalListFilter.svelte'
  import JournalItem from '@/components/JournalItem.svelte'
  import type { PreloadObj } from '@/model/type'
  import { GetJournals } from '@/generated/graphql'
  import type { GetJournalsQuery, Journal } from '@/generated/graphql'
  
  let responseJournal: GetJournalsQuery = { journals: [] }

  onMount(() => {
    GetJournals({}).subscribe(journal => {
      if(!journal.data) {
        return
      }
      responseJournal = journal.data
    })
  })
</script>
