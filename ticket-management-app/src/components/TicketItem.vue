<template>
  <div class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center border border-gray-200">
    <div>
      <router-link :to="`/tickets/${ticket.id}`" class="text-xl font-semibold text-blue-600 hover:underline">{{ ticket.title }}</router-link>
      <p class="text-gray-700">{{ ticket.description }}</p>
      <p class="text-gray-500 text-sm">Status: <span :class="{'text-green-600': ticket.status === 'open', 'text-amber-600': ticket.status === 'in progress', 'text-gray-600': ticket.status === 'closed'}">{{ ticket.status }}</span></p>
    </div>
    <div class="flex space-x-2">
      <button @click="$emit('edit', ticket)" class="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded">
        Update
      </button>
      <button @click="$emit('confirm-delete', ticket.id)" class="bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-3 rounded">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

</script>
