<script lang="ts">
  import { onMount } from 'svelte'
  import { interval } from 'rxjs'
  import Input from 'svelma/src/components/Input.svelte'
  import { client } from '@/store/ApolloClientStore'
  import { filter, map, switchMap, tap } from 'rxjs/operators'
  import { gql } from 'apollo-boost'
  import { v4 as uuidV4 } from 'uuid'
  import { flatMap } from 'rxjs/internal/operators'
  import type { Message } from '@/model/Chat'

  let messages: string = ''
  let lastMessages: string = ''
  let messageList: string[] = []
  const uuid = uuidV4()

  const publishMessageQuery = (topic: string, message: string) => {
    return gql`
      mutation {
        publishMessage(topic: "${topic}", message: "${message}")
      }
    `
  }

  const subscriptionMessages = (topic: string) => {
    return gql`
      subscription {
        subscriptionMessage(topic: "${topic}") {
          text
          createdAt
        }
      }
    `
  }

  onMount(() => {
    insertMessageObserver()
    subscribeMessage()
  })

  function insertMessageObserver() {
    interval(1000)
      .pipe(
        filter(() => lastMessages !== messages),
        tap(() => lastMessages = messages),
        map(() => client.get()),
        flatMap((apollo) =>
          apollo.mutate({ mutation: publishMessageQuery(uuid, lastMessages)} ))
      )
    .subscribe(() => {
      console.log(uuid)
    })
  }

  function subscribeMessage() {
    client.get().subscribe({ query: subscriptionMessages(uuid) }).subscribe(res => {
      const obj = res.data.subscriptionMessage as Message
      messageList.push(obj.text)
      messageList = [...messageList]
    })
  }
</script>

<svelte:head>
	<title>Chat</title>
</svelte:head>

<h1>Chat</h1>
<div>
  {#each messageList as message}
  <div>
    {message}
  </div>
{/each}
</div>
<Input bind:value={messages} />
