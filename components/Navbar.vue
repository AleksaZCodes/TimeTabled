<template>
  <header class="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
    <Logo />
    <div class="hidden gap-10 text-base md:flex">
      <slot name="links" />
    </div>
    <slot name="buttons" />
  </header>
</template>

<script setup></script>
