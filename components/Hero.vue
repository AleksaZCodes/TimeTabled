<template>
  <section
    class="mx-auto flex max-w-7xl flex-col items-center justify-center gap-10 px-6 py-4 lg:flex-row lg:gap-16 lg:py-20"
  >
    <div
      class="flex w-full flex-col items-center gap-6 text-center lg:items-start lg:gap-10 lg:text-left"
    >
      <p class="text-lg leading-relaxed opacity-80">Some glorious label</p>

      <h1 class="text-4xl font-extrabold leading-10 tracking-tight lg:text-6xl">
        Stop
        <s class="opacity-50">overengineering</s>,
        <br />
        start
        <span class="bg-primary px-2 leading-normal text-neutral"
          >launching</span
        >
      </h1>

      <p class="max-w-2xl text-lg leading-relaxed opacity-80">
        The planning tool to transform your ideas into validated ready-to-launch
        MVPs and products using AI and lean principles.
      </p>

      <NuxtLink class="group btn btn-primary btn-wide mt-4" to="/login">
        <div class="relative">
          <FontAwesome
            class="text-xl transition-transform duration-100 group-hover:-rotate-45 group-hover:scale-110"
            icon="rocket"
          />
          <FontAwesome
            class="absolute -bottom-2 left-[0.315rem] rotate-180 scale-0 text-xs transition-transform duration-100 group-hover:scale-110"
            icon="fire"
          />
        </div>
        Get LeanLaunch
      </NuxtLink>
    </div>

    <!-- Hero image -->
  </section>
</template>

<script setup></script>
