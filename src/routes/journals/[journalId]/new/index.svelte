<DiaryEditor journalId={journalId} diaryId={diaryId}/>

<script context="module" lang="ts">
  export function preload({ params: { journalId } }: PreloadObj) {
    return { journalId }
  }
</script>

<script lang="ts">
import type { PreloadObj } from '@/model/type'
import DiaryEditor from '@/components/DiaryEditor.svelte'

let diaryId: number = undefined

export let journalId: number
</script>
  