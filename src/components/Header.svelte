<nav
  class="navbar is-primary has-shadow"
  role="navigation"
  aria-label="main navigation"
>
  <div class="navbar-brand">
    <a class="navbar-item" href="/"> My Diary </a>

    <a
      href="javascript:void(0)"
      role="button"
      class="navbar-burger {burgetIsActive && 'is-active'}"
      aria-label="menu"
      aria-expanded="false"
      on:click="{clickBurger}"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div class="navbar-menu {burgetIsActive && 'is-active'}">
    <div class="navbar-end">
      <a href="/" class="navbar-item">My Account</a>
      <a href="/" class="navbar-item">Setting</a>
    </div>
  </div>
</nav>

<script>
  let burgetIsActive = false

  function clickBurger() {
    burgetIsActive = !burgetIsActive
  }
</script>
<style>
  .profile_image {
    border-radius: 50%;
  }
</style>

<nav
  class="navbar is-primary has-shadow is-fixed-top"
  role="navigation"
  aria-label="main navigation"
>
  <div class="navbar-brand">
    <a class="navbar-item" href="/"> My Diary </a>

    <div
      role="button"
      class="navbar-burger {burgetIsActive && 'is-active'}"
      aria-label="menu"
      aria-expanded="false"
      on:click="{clickBurger}"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </div>
  </div>
  <div class="navbar-menu {burgetIsActive && 'is-active'}">
    <div class="navbar-end">
      <a href="/" class="navbar-item is-flex is-align-items-center">
        <span class="icon is-medium">
          <img
            class="profile_image"
            src="{profileImageUrl}"
            alt="profileImage"
          />
        </span>
        <span class="ml-2"> {userName} </span>
      </a>
    </div>
  </div>
</nav>

<script lang="ts">
  import { onMount } from 'svelte'
  import { meStore } from '@/store'

  let burgetIsActive = false
  let profileImageUrl: string = ''
  let userName: string = ''

  onMount(() => {
    meStore.call()
    meStore.subscribe((me) => {
      if (!me) {
        return
      }
      profileImageUrl = me.me.profileImageUrl
      userName = me.me.name
    })
  })

  const clickBurger = () => (burgetIsActive = !burgetIsActive)
</script>
