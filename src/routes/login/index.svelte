<style>
</style>

<svelte:head>
  <title>MD | Login</title>
</svelte:head>
<section class="section">
  <div class="container">
    <div
      class="is-flex is-justify-content-center is-align-content-center is-align-items-center is-fullheight"
    >
      <div class="card">
        <div class="card-content">
          <div class="content">
            <Button tag="a" href="/oauth/github">Github</Button>
            <Button tag="a" href="/oauth/kakao">Kakao</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script lang="ts">
  import { interval } from 'rxjs'
  import Button from 'svelma/src/components/Button.svelte'
  import Icon from 'svelma/src/components/Icon.svelte'
  import { onMount } from 'svelte'

  type LogoImg = {
    url: string
    alt: string
  }
  const logoList: LogoImg[] = [
    {
      url: 'https://www.flaticon.com/svg/static/icons/svg/2111/2111340.svg',
      alt: 'kakao-logo',
    },
    {
      url: 'https://www.flaticon.com/svg/static/icons/svg/2111/2111292.svg',
      alt: 'github-logo',
    },
  ]
</script>
