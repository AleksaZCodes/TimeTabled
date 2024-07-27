<template>
  <div>
    <button class="btn btn-sm" onclick="accountModal.showModal()">
      <FontAwesome icon="user" /> Account
    </button>

    <dialog class="modal" id="accountModal">
      <div class="modal-box flex flex-col gap-6">
        <form class="absolute right-2 top-2" method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost">
            <FontAwesome icon="xmark" />
          </button>
        </form>
        <div class="flex items-center justify-between">
          <div class="flex gap-4 items-center">
            <div class="avatar placeholder">
              <div
                class="bg-neutral text-neutral-content w-16 rounded-full"
                :style="{
                  backgroundImage:
                    (editing && avatarUrl
                      ? 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), '
                      : '') + `url(${avatarUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }"
              >
                <FontAwesome
                  class="text-3xl"
                  v-if="!editing"
                  v-show="!avatarUrl"
                  icon="user"
                />
                <label
                  class="btn btn-circle btn-ghost"
                  v-else
                  for="avatarInput"
                >
                  <input
                    class="hidden"
                    id="avatarInput"
                    @change="saveAvatar"
                    type="file"
                    accept="image/png, image/jpeg"
                    ref="avatarInput"
                    :disabled="loading"
                  />
                  <FontAwesome class="text-3xl ml-3 z-10" icon="user-pen" />
                </label>
              </div>
            </div>

            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-bold" v-if="!editing">
                  {{ name }}
                </h3>
                <input
                  class="input h-fit text-xl px-0 font-bold border-none"
                  v-show="editing"
                  v-model="name"
                  ref="nameInput"
                  type="text"
                  required
                  :disabled="loading"
                />
              </div>
              <p>Member since 2024</p>
            </div>
          </div>

          <button
            class="btn btn-circle btn-ghost"
            @click="toggleEditing"
            :disabled="loading"
          >
            <FontAwesome
              class="text-xl"
              :icon="!editing ? 'pen-to-square' : 'check'"
            />
          </button>
        </div>

        <button class="btn" @click="logOut" :disabled="loading || editing">
          Log out
        </button>
      </div>
    </dialog>
  </div>
</template>

<script setup>
import pica from 'pica'

const editing = ref(false)

const name = ref('Aleksa Zdravkovic')
const avatar = ref(null)
const avatarUrl = ref('')
const nameInput = ref(null)
const loading = ref(false)

const toggleEditing = () => {
  if (editing.value) {
    if (name.value.length >= 3) {
      editing.value = false
    } else {
      alert('Name must be at least 3 characters long')
    }
  } else {
    editing.value = true
  }
}

const saveAvatar = async event => {
  loading.value = true

  const file = event.target.files[0]
  if (file) {
    const img = new Image()
    img.onload = async () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const maxSize = 300

      const size = Math.min(img.width, img.height)
      const offsetX = (img.width - size) / 2
      const offsetY = (img.height - size) / 2

      canvas.width = maxSize
      canvas.height = maxSize
      ctx.drawImage(img, offsetX, offsetY, size, size, 0, 0, maxSize, maxSize)

      const picaInstance = pica()
      const resizedCanvas = document.createElement('canvas')
      resizedCanvas.width = maxSize
      resizedCanvas.height = maxSize

      await picaInstance.resize(canvas, resizedCanvas)

      resizedCanvas.toBlob(async blob => {
        if (blob) {
          avatar.value = blob
          avatarUrl.value = URL.createObjectURL(blob)
        }
      }, 'image/jpeg')
    }

    img.src = URL.createObjectURL(file)
  }

  loading.value = false
}

watch(editing, async newValue => {
  if (newValue) {
    await nextTick()
    nameInput.value.focus()
  }
})

const logOut = async () => {
  loading.value = true

  const { error } = await useSupabaseClient().auth.signOut()

  if (error) {
    alert(error)
  }

  await useRouter().push('/login')
}
</script>
