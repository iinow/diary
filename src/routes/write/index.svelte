<MEditor bind:this="{mEditor}" html="{html}" />
<div>
  {lastUpdateDate ? moment(lastUpdateDate).format('YYYY.MM.DD HH:mm:ss 저장 완료') : ''}
</div>

<script lang="ts">
  import { onMount } from 'svelte'
  import moment from 'moment'
  import { yyyyMMdd } from '@/common/util'
  import { GetDiaryByDate, InsertAndUpdateDiary } from '@/generated/graphql'
  import type { GetDiaryByDateQuery } from '@/generated/graphql'
  import { NetworkStatus } from '@apollo/client'
  import MEditor from '@/components/Editor.svelte'
  import { flatMap } from 'rxjs/internal/operators'

  let mEditor: MEditor
  let html: string = ''
  let diaryId: number
  let lastUpdateDate: Date

  onMount(() => {
    GetDiaryByDate({ variables: { yyyyMMdd: yyyyMMdd() } }).subscribe((res) => {
      if (res.networkStatus === NetworkStatus.error) {
        console.log('에러 발생')
      }
      if (res.data?.diary === undefined) {
        return
      }
      if (res.data?.diary !== null) {
        initVariables(res.data)
      }
      executeEditorTextWatcher()
    })
  })

  function executeEditorTextWatcher() {
    mEditor
      .getEditorTextEvent()
      .pipe(
        flatMap((htmlContent) =>
          InsertAndUpdateDiary({
            variables: { id: diaryId, content: htmlContent },
          })
        )
      )
      .subscribe((data) => {
        diaryId = data.data.insertAndUpdateDiary.id
        lastUpdateDate = moment(
          data.data.insertAndUpdateDiary.updatedAt
        ).toDate()
      })
  }

  function initVariables(res: GetDiaryByDateQuery) {
    diaryId = res.diary.id
    html = res.diary.content
    lastUpdateDate = moment(res.diary.updatedAt).toDate()
    mEditor.setHtml(html)
  }
</script>
