<div class="card pt-6 pb-6 pl-6 pr-6">
    <DiaryHeader title="{title}" bind:this="{mHeader}" />
    <MEditor bind:this="{mEditor}" html="{html}" />
</div>
  
<script lang="ts">
import { onMount } from 'svelte'
import moment from 'moment'
import { flatMap, tap } from 'rxjs/internal/operators'
import { yyyyMMddHHmm } from '@/common/util'
import { GetDiaryByDate, InsertAndUpdateDiary, GetDiary } from '@/generated/graphql'
import type { GetDiaryByDateQuery } from '@/generated/graphql'
import { NetworkStatus } from '@apollo/client'
import MEditor from '@/components/Editor.svelte'
import DiaryHeader from '@/components/DiaryHeader.svelte'
import type { PreloadObj } from '@/model/type';

let mHeader: DiaryHeader
let mEditor: MEditor
let html: string = ''
let title: string = ''

export let journalId: number
export let diaryId: number|undefined

onMount(() => {
  if(diaryId) {
    callEditDiary()
    return
  }
  callNewDiary()
})

function callNewDiary() {
  GetDiaryByDate({ variables: { yyyyMMddHHmm: yyyyMMddHHmm(), journalId: Number(journalId) } })
    .subscribe((res) => {
      if (res.networkStatus === NetworkStatus.error) {
        console.log('에러 발생')
      }
      if (res.data?.diary === undefined) {
        return
      }
      if (res.data?.diary !== null) {
        initVariables(res.data.diary)
      }
      executeTitleTextWatcher()
      executeEditorTextWatcher()
    }
  )
}

function callEditDiary() {
  GetDiary({ variables: { id: Number(diaryId) } })
    .subscribe((res) => {
      if (res.networkStatus === NetworkStatus.error) {
        console.log('에러 발생')
      }
      if (res.data?.diaryById === undefined) {
        return
      }
      if (res.data?.diaryById !== null) {
        initVariables(res.data.diaryById)
      }
      executeTitleTextWatcher()
      executeEditorTextWatcher()
    }
  ) 
}

function executeTitleTextWatcher() {
  mHeader
    .getTitleEvent()
    .pipe(
      tap((resTitle) => (title = resTitle)),
      flatMap(callDiary)
    )
    .subscribe(callDiaryComplete)
}

function executeEditorTextWatcher() {
  mEditor
    .getEditorTextEvent()
    .pipe(
    tap((htmlContent) => (html = htmlContent)),
    flatMap(callDiary)
    )
    .subscribe(callDiaryComplete)
}

function callDiary() {
  return InsertAndUpdateDiary({
    variables: { id: diaryId, title, content: html, journalId: 1 },
  })
}

function callDiaryComplete(data: any) {
  diaryId = data.data.insertAndUpdateDiary.id
  mHeader.setLastDateDate(
    moment(data.data.insertAndUpdateDiary.updatedAt).toDate()
  )
}

function initVariables(diary: any) {
  diaryId = diary.id
  title = diary.title
  html = diary.content
  mHeader.setLastDateDate(moment(diary.updatedAt).toDate())
  mEditor.setHtml(html)
}

function handleKeypress(event: KeyboardEvent) {
  console.log(event.key, event.keyCode)
}
</script>
    