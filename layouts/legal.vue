<template>
  <main class="mx-auto flex max-w-2xl flex-col gap-6 p-4 py-10">
    <NuxtLink class="btn btn-ghost w-fit" to="/">
      <FontAwesome class="text-lg" icon="arrow-left" /> Back to app
    </NuxtLink>

    <slot />
  </main>
</template>
