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
  import { from, fromEvent } from 'rxjs'
  import { debounceTime, filter, tap } from 'rxjs/operators'
  import { onMount } from 'svelte'
  import moment from 'moment'
  import { yyyyMMdd } from '@/common/util'
  import { GetDiaryByDate, InsertAndUpdateDiary } from '@/generated/graphql'
  import type { GetDiaryByDateQuery } from '@/generated/graphql'
  import { NetworkStatus } from '@apollo/client'

  let editor: Editor & { refs: any }
  let html: string = ''
  let preHtml: string = ''
  let diaryId: number
  let lastUpdateDate: Date
  let obj = {
    graphQLErrors: [
      {
        message: '로그인을 해주세요.',
        locations: [{ line: 2, column: 3 }],
        path: ['diary'],
        extensions: { code: '4010' },
      },
    ],
    networkError: null,
    message: '로그인을 해주세요.',
  }
  onMount(() => {
    GetDiaryByDate({ variables: { yyyyMMdd: yyyyMMdd() } }).subscribe((res) => {
      if (res.networkStatus === NetworkStatus.error) {
        console.log('에러 발생')
        console.log(JSON.stringify(res.error))
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
    fromEvent(editor.refs.editor as any, 'input')
      .pipe(
        debounceTime(2000),
        tap(
          (e: Event & { target: { innerHTML: string } }) =>
            (html = e.target.innerHTML)
        ),
        filter(() => html !== preHtml),
        tap(() => (preHtml = html))
      )
      .subscribe(() => writeDiary(html))
  }

  function initVariables(res: GetDiaryByDateQuery) {
    diaryId = res.diary.id
    preHtml = res.diary.content
    html = res.diary.content
    lastUpdateDate = moment(res.diary.updatedAt).toDate()
    editor.setHtml(html)
  }

  function writeDiary(content: string) {
    from(
      InsertAndUpdateDiary({ variables: { id: diaryId, content } })
    ).subscribe((data) => {
      diaryId = data.data.insertAndUpdateDiary.id
      lastUpdateDate = moment(data.data.insertAndUpdateDiary.updatedAt).toDate()
    })
  }
</script>
