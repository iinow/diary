<div>
  {#if responseDiaries !== undefined}
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="Entry">Entry</abbr></th>
          <th><abbr title="Date Created">Date Created</abbr></th>
          <th><abbr title="Shared">Shared</abbr></th>
        </tr>
      </thead>
      <tbody>
        {#each responseDiaries.diaries.items as diary}
          <tr>
            <td>
              <a href="/journals/{journalId}/entries/{diary.id}" title="{diary.title}">
                {diary.title}
              </a>
            </td>
            <td>{moment(diary.createdAt).format('ddd. DD/MM/YYYY [at] hh:mm a')}</td>
            <td>X</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="pagination-previous" on:click="{clickPreviousPage}">Previous</a>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class="pagination-next" on:click="{clickNextPage}">Next page</a>
      <ul class="pagination-list">
        {#if responseDiaries.diaries.page !== 1}
          {#if responseDiaries.diaries.page - 2 > 0 }
            <li>
              <!-- svelte-ignore a11y-missing-attribute -->
              <a class="pagination-link" aria-label="Goto page 1" on:click="{() => clickPage(1)}">1</a>
            </li>
            {#if responseDiaries.diaries.page - 2 >= 2}
              <li>
                <span class="pagination-ellipsis">&hellip;</span>
              </li>
            {/if}
          {/if}
          <li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="pagination-link" aria-label="Goto page {responseDiaries.diaries.page - 1}" on:click={() => clickPage(responseDiaries.diaries.page - 1)}>{responseDiaries.diaries.page - 1}</a>
          </li>
        {/if}
        <li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="pagination-link is-current" aria-label="Page {responseDiaries.diaries.page}" aria-current="page">
            {responseDiaries.diaries.page}
          </a>
        </li>
        {#if totalPage > page}
          <li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <a class="pagination-link" aria-label="Goto page {page + 1}" on:click="{() => clickPage(page + 1)}">{page + 1}</a>
          </li>
          {#if totalPage > page + 1}
            {#if totalPage !== page + 2}
              <li>
                <span class="pagination-ellipsis">&hellip;</span>
              </li>
            {/if}
            <li>
              <!-- svelte-ignore a11y-missing-attribute -->
              <a class="pagination-link" aria-label="Goto page {totalPage}" on:click="{() => clickPage(totalPage)}">{totalPage}</a>
            </li>
          {/if}
        {/if}
      </ul>
    </nav>
  {/if}
</div>

<script context="module" lang="ts">
  export function preload({ params: { journalId } }: PreloadObj) {
    return { journalId }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import moment from 'moment'
  import { GetDiaries } from '@/generated/graphql'
  import type { GetDiariesQuery } from '@/generated/graphql'
  import type { PreloadObj } from '@/model/type'

  let responseDiaries: GetDiariesQuery
  let page: number = 1
  let cntPageItem: number = 10
  let totalPage: number = 0

  export let journalId: number

  onMount(() => {
    callDiaryPage()
  })

  function callDiaryPage() {
    GetDiaries({ variables: { page, cntPageItem, journalId: Number(journalId) } }).subscribe((diaries) => {
      if (diaries?.data) {
        responseDiaries = diaries.data
        const { cntPageItem, total } = responseDiaries.diaries
        totalPage = Math.ceil(total / cntPageItem)
      }
    })
  }

  function clickNextPage() {
    let nextPage = page + 1
    if(totalPage >= nextPage) {
      page = nextPage
      callDiaryPage()
    }
  }

  function clickPreviousPage() {
    let previousPage = page - 1
    if(previousPage > 0) {
      page = previousPage
      callDiaryPage()
    }
  }

  function clickPage(reqPage: number) {
    page = reqPage
    callDiaryPage()
  }
</script>
