<script lang="ts">
	import successkid from 'images/successkid.jpg'
	import Button from 'svelma/src/components/Button.svelte'
  import Noti from 'svelma/src/components/Notification'
  import { gql } from 'apollo-boost'
  import { client as ApolloClient } from '../store/ApolloClientStore'
  import { flatMap } from 'rxjs/internal/operators'
  import { of } from 'rxjs'

  let response
  let datas = []

  const queryMessages = gql`
  {
    messages {
      text,
      updatedAt,
      createAt
    }
  }
  `
  if(process.browser) {
    of(ApolloClient.get())
      .pipe(
        flatMap(client => client.query({query: queryMessages}))
      )
      .subscribe(value => {
        console.log(value.data)
        datas = value.data.messages
      })
  }

  function showNoti() {
    Noti.create({
      message: "dkfdjkfjdfk"
    })
  }
</script>

<style>
	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

{JSON.stringify(datas)}
<h1>Great success!</h1>
<Button on:click={showNoti}>하이.</Button>
{JSON.stringify(response)}
<figure>
	<img alt="Success Kid" src="{successkid}">
	<figcaption>Have fun with Sapper!</figcaption>
</figure>

<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>
