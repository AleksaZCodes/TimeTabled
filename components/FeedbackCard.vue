<template>
  <div class="card h-fit gap-1 overflow-x-auto bg-base-200 p-4 shadow">
    <div class="flex justify-between">
      <h2 class="card-title">Feedback</h2>

      <button class="btn btn-square btn-ghost btn-sm">
        <FontAwesome class="text-lg text-primary" :icon="['far', 'star']" />
      </button>
    </div>

    <div class="divider my-0"></div>

    <div class="flex h-80 flex-col justify-between gap-1 md:h-96">
      <div class="flex w-full flex-col gap-2 overflow-y-auto">
        <ChatBubble
          text="Lorem ipsum dolor sit amet"
          :time="new Date().getHours() + ':' + new Date().getMinutes()"
        />

        <ChatBubble
          text="Lorem ipsum dolor sit amet"
          :received="false"
          :time="new Date().getHours() + ':' + new Date().getMinutes()"
        />
      </div>

      <div class="flex flex-col gap-1">
        <div class="divider my-0"></div>

        <div class="flex gap-2">
          <textarea
            class="textarea w-full break-words text-base"
            rows="1"
            placeholder="Write a message..."
          ></textarea>

          <button class="btn btn-square bg-base-100">
            <FontAwesome class="text-xl text-primary" icon="arrow-up" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
