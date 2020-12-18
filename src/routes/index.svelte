<style>
</style>

<svelte:head>
  <title>Diary</title>
</svelte:head>

<section class="section">
  <div class="container">
    <h2 class="title">오늘 일기</h2>
    <Button tag="a" href="/write">일기 바로가기</Button>
  </div>
  <div class="container">
    <h2 class="title">이번 달</h2>
  </div>
</section>

<script lang="ts">
  // import successkid from 'images/successkid.jpg'
  import Button from 'svelma/src/components/Button.svelte'
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
