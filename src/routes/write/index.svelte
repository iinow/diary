<Editor
  html="{html}"
  bind:this="{editor}"
  on:change="{(e) => (html = e.detail)}"
  actions="{[]}"
/>
<div>
  {lastUpdateDate ? moment(lastUpdateDate).format('YYYY.MM.DD HH:mm:ss 저장 완료') : ''}
</div>

<script lang="ts">
  import Editor from 'cl-editor/src/Editor.svelte'
  import { from, interval } from 'rxjs'
  import { filter, map, tap } from 'rxjs/operators'
  import { onMount } from 'svelte'
  import moment from 'moment'
  import { yyyyMMdd } from '@/common/util'
  import { GetDiaryByDate, InsertAndUpdateDiary } from '@/generated/graphql'

  let editor: Editor
  let html: string = ''
  let preHtml: string = ''
  let diaryId
  let lastUpdateDate: Date

  onMount(() => {
    GetDiaryByDate({ variables: { yyyyMMdd: yyyyMMdd() } }).subscribe((res) => {
      if (res.data?.diary === undefined) {
        return
      }
      if (res.data?.diary !== null) {
        diaryId = res.data?.diary.id
        preHtml = res.data?.diary.content
        html = res.data?.diary.content
        lastUpdateDate = moment(res.data?.diary.updatedAt).toDate()
        editor.setHtml(html)
      }
      interval(1000)
        .pipe(
          map(() => res.data?.diary),
          filter(() => html !== preHtml),
          tap(() => (preHtml = html))
        )
        .subscribe(() => writeDiary(html))
    })
  })

  function writeDiary(content: string) {
    from(
      InsertAndUpdateDiary({ variables: { id: diaryId, content } })
    ).subscribe((data) => {
      diaryId = data.data.insertAndUpdateDiary.id
      lastUpdateDate = moment(data.data.insertAndUpdateDiary.updatedAt).toDate()
    })
  }
</script>
