<Editor
  html="{html}"
  bind:this="{editor}"
  on:change="{(e) => (html = e.detail)}"
  actions="{[]}"
/>

<script lang="ts">
  import { onMount } from 'svelte'
  import { fromEvent } from 'rxjs'
  import { debounceTime, filter, map, tap } from 'rxjs/operators'
  import Editor from '@/components/ClEditor.svelte'

  export let html: string = ''
  let preHtml: string = ''
  let editor: Editor & { refs: any }

  onMount(() => {
    editor.setHtml(html)
  })

  export function setHtml(resHtml: string) {
    editor.setHtml(resHtml)
    preHtml = resHtml
    html = resHtml
  }

  export function getEditorTextEvent() {
    return fromEvent(editor.refs.editor as any, 'input').pipe(
      debounceTime(2000),
      tap(
        (e: Event & { target: { innerHTML: string } }) =>
          (html = e.target.innerHTML)
      ),
      filter(() => html !== preHtml),
      tap(() => (preHtml = html)),
      map(() => html)
    )
  }
</script>
