<template>
  <Navbar>
    <template #links></template>
    <template #buttons>
      <AccountModal />
    </template>
  </Navbar>

  <main class="mx-auto max-w-7xl p-4 md:px-6">
    <slot />
  </main>
</template>
