<div class="card pt-6 pb-6 pl-6 pr-6">
  <DiaryHeader title="{title}" bind:this="{mHeader}" />
  <MEditor bind:this="{mEditor}" html="{html}" />
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import moment from 'moment'
  import { flatMap, tap } from 'rxjs/internal/operators'
  import { yyyyMMdd, yyyyMMddHHmm } from '@/common/util'
  import { GetDiaryByDate, InsertAndUpdateDiary } from '@/generated/graphql'
  import type { GetDiaryByDateQuery } from '@/generated/graphql'
  import { NetworkStatus } from '@apollo/client'
  import MEditor from '@/components/Editor.svelte'
  import DiaryHeader from '@/components/DiaryHeader.svelte'

  let mHeader: DiaryHeader
  let mEditor: MEditor
  let html: string = ''
  let title: string = ''
  let diaryId: number

  onMount(() => {
    GetDiaryByDate({ variables: { yyyyMMddHHmm: yyyyMMddHHmm() } }).subscribe(
      (res) => {
        if (res.networkStatus === NetworkStatus.error) {
          console.log('에러 발생')
        }
        if (res.data?.diary === undefined) {
          return
        }
        if (res.data?.diary !== null) {
          initVariables(res.data)
        }
        executeTitleTextWatcher()
        executeEditorTextWatcher()
      }
    )
    console.log(yyyyMMddHHmm())
  })

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
      variables: { id: diaryId, title, content: html },
    })
  }

  function callDiaryComplete(data: any) {
    diaryId = data.data.insertAndUpdateDiary.id
    mHeader.setLastDateDate(
      moment(data.data.insertAndUpdateDiary.updatedAt).toDate()
    )
  }

  function initVariables(res: GetDiaryByDateQuery) {
    diaryId = res.diary.id
    title = res.diary.title
    html = res.diary.content
    mHeader.setLastDateDate(moment(res.diary.updatedAt).toDate())
    mEditor.setHtml(html)
  }

  function handleKeypress(event: KeyboardEvent) {
    console.log(event.key, event.keyCode)
  }
</script>
