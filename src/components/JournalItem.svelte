<div class="card mt-4 mb-4 mr-4 ml-4">
  <header class="card-header">
    <p class="card-header-title">{name}</p>
  </header>
  <div class="card-content">
    <div class="content is-flex is-justify-content-center is-align-content-center is-align-items-center">
      <a class="button" href="journals/{id}">새 글 작성</a>
      <a class="button" href="journals/{id}/entries">리스트 보기</a>
    </div>
  </div>
  <div class="card-footer pt-2 pb-2 pr-2 pl-2">
    <div class="content-date">{moment(createdAt).format('YYYY.MM.DD HH:mm')}</div>
  </div>
</div>

<style>
  .content-date {
    color: #777777;
    opacity: 50%;
    text-align: right;
    width: 100%;
    right: 0;
  }

  .content {
    min-width: 250px;
    min-height: 200px;
  }

  .card-footer {
    border-top: none;
  }
</style>

<script lang="ts">
  import moment from 'moment'
  export let id: number
  export let name: string 
  export let createdAt: Date
</script>