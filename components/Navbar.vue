<template>
  <header
    class="mx-auto flex max-w-7xl items-center justify-between p-4 md:px-6"
  >
    <Logo />
    <div class="hidden gap-10 text-base md:flex">
      <slot name="links" />
    </div>
    <slot name="buttons" />
  </header>
</template>

<script setup></script>
