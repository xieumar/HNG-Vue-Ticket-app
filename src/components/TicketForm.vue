<template>
  <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md space-y-4">
    <div>
      <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title</label>
      <input type="text" id="title" v-model="title" @input="validateField('title')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      <p v-if="errors.title" class="text-red-500 text-xs italic mt-2">{{ errors.title }}</p>
    </div>
    <div>
      <label for="description" class="block text-gray-700 text-sm font-bold mb-2">Description</label>
      <textarea id="description" v-model="description" @input="validateField('description')" rows="4" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
      <p v-if="errors.description" class="text-red-500 text-xs italic mt-2">{{ errors.description }}</p>
    </div>
    <div class="relative">
      <label for="status" class="block text-gray-700 text-sm font-bold mb-2">Status</label>
      <select id="status" v-model="status" @change="validateField('status')" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-6">
        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
      <p v-if="errors.status" class="text-red-500 text-xs italic mt-2">{{ errors.status }}</p>
    </div>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
      {{ isEditing ? 'Update Ticket' : 'Create Ticket' }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useFormValidation } from '../useFormValidation.js'

const props = defineProps({
  ticket: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit'])

const isEditing = ref(false)
const title = ref('')
const description = ref('')
const status = ref('open')

const { errors, validate, validateField } = useFormValidation({
  title: { value: title, required: true },
  description: { value: description, required: false }, // Changed to false
  status: { value: status, required: true },
})

watch(() => props.ticket, (newTicket) => {
  if (newTicket) {
    isEditing.value = true
    title.value = newTicket.title
    description.value = newTicket.description
    status.value = newTicket.status
  } else {
    isEditing.value = false
    title.value = ''
    description.value = ''
    status.value = 'open'
  }
}, { immediate: true })

const handleSubmit = () => {
  if (validate()) {
    emit('submit', {
      title: title.value,
      description: description.value,
      status: status.value,
    })
  }
}
</script>
