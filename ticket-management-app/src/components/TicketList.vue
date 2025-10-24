<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Ticket List</h1>
      <button @click="showForm = !showForm" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 mt-4">
        {{ showForm ? 'Cancel' : 'Create New Ticket' }}
      </button>
      <TicketForm v-if="showForm" :ticket="editingTicket" @submit="handleSubmit" class="mt-4" />
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div v-for="ticket in tickets" :key="ticket.id">
        <TicketItem :ticket="ticket" @edit="handleEdit" @confirm-delete="confirmDelete" @toggle-status="handleToggleStatus" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import TicketItem from './TicketItem.vue'
import TicketForm from './TicketForm.vue'
import { useToast } from '../useToast.js'

const props = defineProps({
  tickets: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['submit', 'edit', 'delete', 'toggle-status'])

const showForm = ref(false)
const editingTicket = ref(null)
const { showToast } = useToast()
const showConfirmation = inject('showConfirmation')

const handleSubmit = (ticketData) => {
  emit('submit', ticketData)
  showForm.value = false
  showToast(editingTicket.value ? 'Ticket updated successfully!' : 'Ticket created successfully!', 'success')
}

const handleEdit = (ticket) => {
  editingTicket.value = ticket
  showForm.value = true
  emit('edit', ticket)
}

const confirmDelete = async (ticketId) => {
  const result = await showConfirmation({
    title: 'Delete Ticket',
    message: 'Are you sure you want to delete this ticket? This action cannot be undone.',
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
  })

  if (result) {
    emit('delete', ticketId)
    showToast('Ticket deleted successfully!', 'success')
  } else {
    showToast('Ticket deletion cancelled.', 'info')
  }
}

const handleToggleStatus = ({ id, status }) => {
  let newStatus = 'open'
  if (status === 'open') {
    newStatus = 'in progress'
  } else if (status === 'in progress') {
    newStatus = 'closed'
  } else if (status === 'closed') {
    newStatus = 'open'
  }
  emit('toggle-status', { id, status: newStatus })
  showToast(`Ticket status changed to ${newStatus}!`, 'success')
}

</script>


