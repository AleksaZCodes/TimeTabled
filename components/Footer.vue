<template>
  <footer class="bg-base-200 text-base-content">
    <div
      class="mx-auto flex max-w-7xl flex-wrap justify-between gap-8 px-8 py-8"
    >
      <aside class="flex flex-col gap-2">
        <Logo />
        <p>Stop overengineering, start launching</p>
        <p>Copyright © 2024 - All rights reserved</p>
        <p>Made by @AleksaZCodes</p>
      </aside>

      <div class="flex min-w-0 flex-wrap justify-between gap-16">
        <nav class="flex max-w-fit flex-col">
          <h6 class="footer-title">Services</h6>
          <a class="link-hover link">Branding</a>
          <a class="link-hover link">Design</a>
          <a class="link-hover link">Marketing</a>
          <a class="link-hover link">Advertisement</a>
        </nav>

        <nav class="flex max-w-fit flex-col">
          <h6 class="footer-title">Company</h6>
          <a class="link-hover link">About us</a>
          <a class="link-hover link">Contact</a>
          <a class="link-hover link">Jobs</a>
          <a class="link-hover link">Press kit</a>
        </nav>

        <nav class="flex max-w-fit flex-col">
          <h6 class="footer-title">Legal</h6>
          <NuxtLink class="link-hover link" to="/terms-of-service"
            >Terms of service</NuxtLink
          >
          <NuxtLink class="link-hover link" to="/privacy-policy"
            >Privacy policy</NuxtLink
          >
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
