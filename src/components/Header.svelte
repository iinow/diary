<nav
  class="navbar is-danger has-shadow"
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
