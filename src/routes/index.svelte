<style>
</style>

<svelte:head>
  <title>Diary</title>
</svelte:head>

<div>{JSON.stringify(datas)}</div>

<script lang="ts">
  // import successkid from 'images/successkid.jpg'
  import { gql } from 'apollo-boost'
  import { client as ApolloClient } from '../store/ApolloClientStore'
  import { flatMap } from 'rxjs/internal/operators'
  import { of } from 'rxjs'
  import { showNotification } from '@/service/Notification'

  let notificationMessage = ''
  let datas = []
  let value

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
