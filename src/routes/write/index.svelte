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
  import { flatMap } from 'rxjs/internal/operators'
  import { filter, map, tap } from 'rxjs/operators'
  import { onMount } from 'svelte'
  import { v4 as uuidV4 } from 'uuid'
  import { client } from '@/store/ApolloClientStore'

  let editor: Editor
  let html: string = ''
  let preHtml: string = ''
  const uuid = uuidV4()

  onMount(() => {
    insertMessageObserver()
  })

  const publishMessageQuery = (topic: string, message: string) => {
    return gql`
      mutation {
        publishMessage(topic: "${topic}", message: "${message}")
      }
    `
  }

  function insertMessageObserver() {
    interval(1000)
      .pipe(
        filter(() => html !== preHtml),
        tap(() => (preHtml = html)),
        map(() => client.get()),
        flatMap((apollo) =>
          apollo.mutate({ mutation: publishMessageQuery(uuid, html) })
        )
      )
      .subscribe(() => {
        console.log(uuid)
      })
  }
</script>
