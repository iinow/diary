<style>
</style>

<svelte:head>
  <title>Diary Login</title>
</svelte:head>
<section>
  <Button>GitHub</Button>
  <Button tag="a" href="/oauth/kakao">Kakao</Button>
  <!-- {#each logoList as logo}
    <Button>
      <img class="icon is-large" src="{logo.url}" alt="{logo.alt}" />
    </Button>
  {/each} -->
</section>

<script lang="ts">
  import Button from 'svelma/src/components/Button.svelte'
  import Icon from 'svelma/src/components/Icon.svelte'
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
