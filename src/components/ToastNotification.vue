<template>
  <transition name="fade">
    <div
      v-if="toast.message.value"
      :class="[
        'fixed',
        'top-4',
        'right-4',
        'p-4',
        'rounded-lg',
        'shadow-lg',
        'text-white',
        'z-50',
        {
          'bg-green-500': toast.type.value === 'success',
          'bg-red-500': toast.type.value === 'error',
          'bg-blue-500': toast.type.value === 'info',
          'bg-yellow-500': toast.type.value === 'warning',
        },
      ]"
    >
      {{ toast.message.value }}
    </div>
  </transition>
</template>

<script setup>
import { useToast } from '../useToast.js'

const toast = useToast()
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
