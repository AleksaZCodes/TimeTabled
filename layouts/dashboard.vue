<template>
  <Navbar>
    <template #links></template>
    <template #buttons>
      <AccountModal />
    </template>
  </Navbar>

  <main class="mx-auto max-w-7xl px-8 py-8">
    <slot />
  </main>
</template>
