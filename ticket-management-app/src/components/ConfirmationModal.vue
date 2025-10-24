<template>
  <transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 bg-gray-600 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 class="text-lg font-semibold mb-4">{{ title }}</h3>
        <p class="text-gray-700 mb-6">{{ message }}</p>
        <div class="flex justify-end space-x-4">
          <button @click="cancel" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            {{ cancelButtonText }}
          </button>
          <button @click="confirm" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const isVisible = ref(false)
const title = ref('Confirm Action')
const message = ref('Are you sure you want to proceed?')
const confirmButtonText = ref('Confirm')
const cancelButtonText = ref('Cancel')
let resolvePromise = null

function show(options) {
  title.value = options.title || 'Confirm Action'
  message.value = options.message || 'Are you sure you want to proceed?'
  confirmButtonText.value = options.confirmButtonText || 'Confirm'
  cancelButtonText.value = options.cancelButtonText || 'Cancel'
  isVisible.value = true

  return new Promise((resolve) => {
    resolvePromise = resolve
  })
}

function confirm() {
  isVisible.value = false
  resolvePromise(true)
}

function cancel() {
  isVisible.value = false
  resolvePromise(false)
}

defineExpose({ show })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
