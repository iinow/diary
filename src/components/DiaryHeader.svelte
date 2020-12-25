<style>
  .diary-header-wrap {
    width: 100%;
  }

  .diary-header-wrap input {
    border: none;
    color: black;
    width: 100%;
  }

  .diary-header-wrap input:focus {
    outline: none;
  }
</style>

<div class="diary-header-wrap">
  <input
    class="is-size-4"
    type="text"
    bind:value="{title}"
    bind:this="{inputTitle}"
    placeholder="{placeholder}"
  />
</div>

<script lang="ts">
  import { fromEvent } from 'rxjs'
  import { debounceTime, map } from 'rxjs/operators'

  export let placeholder = 'Entry Title'
  export let title = ''

  let inputTitle: HTMLInputElement

  export function getTitleEvent() {
    return fromEvent(inputTitle, 'input').pipe(
      debounceTime(2000),
      map((e) => e.target.value)
    )
  }
</script>
