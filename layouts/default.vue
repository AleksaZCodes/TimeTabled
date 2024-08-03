<template>
  <Navbar>
    <template #links>
      <a class="link-hover link">Pricing</a>
      <a class="link-hover link">FAQ</a>
    </template>
    <template #buttons>
      <NuxtLink class="btn btn-sm" to="/login">
        <FontAwesome icon="user" /> Login
      </NuxtLink>
    </template>
  </Navbar>
  <main class="mx-auto max-w-7xl p-4 md:px-6">
    <slot />
  </main>
  <Footer />
</template>
