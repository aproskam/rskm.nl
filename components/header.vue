<template>
  <header class="sticky z-10 py-4 px-8 bg-transparent">
    <nav>
      <ul class="flex justify-center">
        <li>
          <nuxt-link class="px-4 hover:underline" to="/"> 🏠 Home </nuxt-link>
        </li>
        <li>
          <nuxt-link class="px-4 hover:underline" to="/work">
            👨‍💻 Work
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.nuxt-link-exact-active {
  text-decoration: underline;
}
</style>
