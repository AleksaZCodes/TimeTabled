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
  <main>
    <slot />
  </main>
  <Footer />
</template>
