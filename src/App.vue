<template>
  <div class="flex flex-col min-h-screen">
    <div class="max-w-[1440px] mx-auto w-full flex flex-col min-h-screen">
      <Navbar />
      <main class="flex-grow">
        <router-view :tickets="tickets" @submit="handleSubmit" @edit="handleEdit" @delete="handleDelete" @toggle-status="handleToggleStatus" />
      </main>
      <Footer />
      <ToastNotification />
      <ConfirmationModal ref="confirmationModal" />
    </div>
    <DecorativeCircles />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import ToastNotification from './components/ToastNotification.vue'
import ConfirmationModal from './components/ConfirmationModal.vue'
import DecorativeCircles from './components/DecorativeCircles.vue'

const tickets = ref([
  { id: 1, title: 'Ticket 1', description: 'This is the first ticket', status: 'open', createdAt: '2025-10-20' },
  { id: 2, title: 'Ticket 2', description: 'This is the second ticket', status: 'in_progress', createdAt: '2025-10-21' },
  { id: 3, title: 'Ticket 3', description: 'This is the third ticket', status: 'open', createdAt: '2025-10-22' },
  { id: 4, title: 'Ticket 4', description: 'This is an in progress ticket', status: 'in_progress', createdAt: '2025-10-22' },
  { id: 5, title: 'Ticket 5', description: 'This is a closed ticket', createdAt: '2025-10-23' },
])

const editingTicket = ref(null)
const confirmationModal = ref(null)

// Provide the showConfirmation function globally
provide('showConfirmation', (options) => {
  return confirmationModal.value.show(options)
})

const handleSubmit = (ticketData) => {
  if (editingTicket.value) {
    // Update
    const index = tickets.value.findIndex(t => t.id === editingTicket.value.id)
    tickets.value[index] = { ...ticketData, id: editingTicket.value.id, createdAt: editingTicket.value.createdAt }
  } else {
    // Create
    const newTicket = { ...ticketData, id: Date.now(), createdAt: new Date().toISOString().slice(0, 10) }
    tickets.value.push(newTicket)
  }
  editingTicket.value = null
}

const handleEdit = (ticket) => {
  editingTicket.value = ticket
}

const handleDelete = (ticketId) => {
  tickets.value = tickets.value.filter(t => t.id !== ticketId)
}

const handleToggleStatus = ({ id, status }) => {
  const index = tickets.value.findIndex(t => t.id === id)
  tickets.value[index].status = status
}

</script>

<style scoped>
</style>
