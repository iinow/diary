<DiaryEditor journalId={journalId} diaryId={diaryId}/>

<script context="module" lang="ts">
  export function preload({ params: { journalId, diaryId } }: PreloadObj) {
    return { journalId, diaryId }
  }
</script>

<script lang="ts">
import type { PreloadObj } from '@/model/type'
import DiaryEditor from '@/components/DiaryEditor.svelte'

export let diaryId: number
export let journalId: number
</script>
  