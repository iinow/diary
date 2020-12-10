<script lang="ts">
  import { onMount } from 'svelte'
	import Nav from '@/components/Nav.svelte'
  import 'bulma/css/bulma.css'

	export let segment: string;
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
<Nav {segment}/>
<main>
	<slot></slot>
</main>
