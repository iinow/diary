<Editor
  html="{html}"
  bind:this="{editor}"
  on:change="{(e) => (html = e.detail)}"
  actions="{[]}"
/>

<script lang="ts">
  import { gql } from 'apollo-boost'
  import Editor from 'cl-editor/src/Editor.svelte'
  import { interval } from 'rxjs'
  import { flatMap, switchMap } from 'rxjs/internal/operators'
  import { filter, map, tap } from 'rxjs/operators'
  import { onMount } from 'svelte'
  import { v4 as uuidV4 } from 'uuid'
  import { client } from '@/store/ApolloClientStore'
  import { yyyyMMdd } from '@/common/util'
  import { GetDiary } from '@/generated/graphql'

  let editor: Editor
  let html: string = ''
  let preHtml: string = ''
  const uuid = uuidV4()
  let diary

  onMount(() => {
    GetDiary({ variables: { id: 3 } }).subscribe((dd) => {
      diary = dd.data
      console.log(diary)
    })
    // getDiaryByToday(yyyyMMdd())
    //   .pipe(
    //     tap((data) => {
    //       diary = data.data.diary
    //       preHtml = diary.content
    //       html = diary.content
    //     }),
    //     switchMap(() =>
    //       interval(1000).pipe(
    //         filter(() => html !== preHtml),
    //         tap(() => (preHtml = html)),
    //         map(() => client.get()),
    //         flatMap((apollo) =>
    //           apollo.mutate({ mutation: publishMessageQuery(uuid, html) })
    //         )
    //       )
    //     )
    //   )
    //   .subscribe(console.log)
  })
</script>
