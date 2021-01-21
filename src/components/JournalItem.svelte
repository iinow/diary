<div class="card">
  <div class="card-content">
    <span>{id}</span>
    <span>{name}</span>
    <span>{createdAt}</span>
  </div>
  <a class="button" href="journals/{id}">클릭</a>
  <a class="button" href="journals/{id}/entries">리스트 보기</a>
</div>

<script lang="ts">
  export let id: number
  export let name: string 
  export let createdAt: Date
</script>