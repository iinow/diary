<style>
</style>

<svelte:head>
  <title>Diary</title>
</svelte:head>

<Input bind:value="{notificationMessage}" />
<Button on:click="{(e) => showNotification(e, notificationMessage)}">
  하이.
</Button>
<a href="/oauth/kakao">카카오 로그인</a>

<script lang="ts">
  // import successkid from 'images/successkid.jpg'
  import Button from 'svelma/src/components/Button.svelte'
  import Input from 'svelma/src/components/Input.svelte'
  import { gql } from 'apollo-boost'
  import { client as ApolloClient } from '../store/ApolloClientStore'
  import { flatMap } from 'rxjs/internal/operators'
  import { of } from 'rxjs'
  import { showNotification } from '@/service/Notification'

  let notificationMessage = ''
  let datas = []

  const queryMessages = gql`
    {
      messages {
        text
        updatedAt
        createAt
      }
    }
  `
  if (process.browser) {
    of(ApolloClient.get())
      .pipe(flatMap((client) => client.query({ query: queryMessages })))
      .subscribe((value) => (datas = value.data.messages))
  }
</script>
