<style>
  .loading-wrap {
    display: flex;
    background-color: var(--backgroundColor);
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }
</style>

<main class="loading-wrap" style="--backgroundColor: {backgroundColor}">
  <Wave color="{color}" />
</main>

<script lang="ts">
  import Wave from 'svelte-loading-spinners/src/Wave.svelte'

  export let backgroundColor = '#F24767'
  export let color = '#FFFFFF'
</script>
