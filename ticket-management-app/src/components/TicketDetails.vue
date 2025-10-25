<template>
  <div class="max-w-2xl mx-auto p-4 pt-16 bg-white shadow-md rounded-lg">
    <h1 class="text-3xl font-bold mb-4">Ticket Details</h1>
    <div v-if="ticket">
      <h2 class="text-2xl font-semibold mb-2">{{ ticket.title }}</h2>
      <p class="text-gray-700 mb-4">{{ ticket.description }}</p>
      <p class="text-gray-600 text-sm">Status: <span :class="{'text-green-600': ticket.status === 'open', 'text-amber-600': ticket.status === 'in_progress', 'text-gray-600': ticket.status === 'closed'}">{{ ticket.status }}</span></p>
      <p class="text-gray-600 text-sm">Created At: {{ ticket.createdAt }}</p>
      <button @click="$router.back()" class="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
        Back to List
      </button>
    </div>
    <div v-else>
      <p class="text-red-500">Ticket not found.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  tickets: {
    type: Array,
    required: true
  }
})

const route = useRoute()
const ticketId = computed(() => parseInt(route.params.id))
const ticket = computed(() => props.tickets.find(t => t.id === ticketId.value))
</script>
