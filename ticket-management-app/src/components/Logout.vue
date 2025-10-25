<template>
  <div class="max-w-md mx-auto mt-40 p-8 bg-white rounded-lg shadow-lg text-center">
    <h2 class="text-3xl font-bold mb-6">It's sad to see you go!</h2>
    <p class="text-gray-600 mb-6">Are you sure you want to log out?</p>
    <button @click="handleLogout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
      Confirm Logout
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { isLoggedIn } from '../auth.js'
import { useToast } from '../useToast.js'

const router = useRouter()
const { showToast } = useToast()

const handleLogout = () => {
  localStorage.removeItem('ticketapp_session')
  isLoggedIn.value = false
  showToast('Logged out successfully!', 'success')
  router.push('/')
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2, p {
  text-align: center;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
