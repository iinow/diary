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

  .diary-fn-wrap p {
    white-space: nowrap;
  }
</style>

<div class="diary-header-wrap">
  <div class="is-flex is-flex-direction-row">
    <input
      class="is-size-4"
      type="text"
      bind:value="{title}"
      bind:this="{inputTitle}"
      placeholder="{placeholder}"
    />
    <div class="diary-fn-wrap">
      <p>{lastUpdateStr}</p>
    </div>
  </div>
</div>

<script lang="ts">
  import { fromEvent } from 'rxjs'
  import { debounceTime, map } from 'rxjs/operators'
  import moment from 'moment'

  export let placeholder = 'Entry Title'
  export let title = ''
  let lastUpdateStr: string = ''

  let inputTitle: HTMLInputElement

  function _lastUpdateStr(unit?: number, unitStr?: string) {
    if (unit !== undefined) {
      lastUpdateStr = `Saved ${unit} ${unitStr} ago`
      return
    }
    lastUpdateStr = 'Saved a few seconds ago'
  }

  export function getTitleEvent() {
    return fromEvent(inputTitle, 'input').pipe(
      debounceTime(2000),
      map((e) => e.target.value)
    )
  }

  export function setLastDateDate(lastUpdateDate: Date) {
    const year = moment().year() - moment(lastUpdateDate).year()
    if (year !== 0) {
      _lastUpdateStr(year, 'years')
      return
    }
    const month = moment().month() - moment(lastUpdateDate).month()
    if (month !== 0) {
      _lastUpdateStr(month, 'month')
      return
    }
    const day = moment().date() - moment(lastUpdateDate).date()
    if (day !== 0) {
      _lastUpdateStr(day, 'day')
      return
    }
    const hour = moment().hour() - moment(lastUpdateDate).hour()
    if (hour !== 0) {
      _lastUpdateStr(hour, 'hour')
      return
    }
    const minutes = moment().minutes() - moment(lastUpdateDate).minutes()
    if (minutes !== 0) {
      _lastUpdateStr(minutes, 'minutes')
      return
    }
    const seconds = moment().seconds() - moment(lastUpdateDate).seconds()
    if (seconds !== 0) {
      _lastUpdateStr(seconds, 'seconds')
      return
    }
    _lastUpdateStr()
  }
</script>
