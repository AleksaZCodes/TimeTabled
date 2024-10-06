<template>
  <div class="flex min-h-screen w-full flex-col justify-between">
    <div>
      <Navbar>
        <template #buttons>
          <NuxtLink class="btn btn-sm" to="/#app">
            <FontAwesome icon="rocket" /> Go to app
          </NuxtLink>
        </template>
      </Navbar>
      <main class="mx-auto max-w-7xl p-4 md:px-6">
        <slot />
      </main>
    </div>
    <Footer />
  </div>
</template>
