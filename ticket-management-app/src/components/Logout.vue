<template>
  <div class="max-w-md mx-auto mt-40 p-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold text-center mb-6">It's sad to see you go!</h2>
    <p class="text-center text-gray-600 mb-6">Please confirm your email and password to log out.</p>
    <form @submit.prevent="handleLogout">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" id="email" v-model="email" @input="validateField('email')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <p v-if="errors.email" class="text-red-500 text-xs italic mt-2">{{ errors.email }}</p>
      </div>
      <div class="mb-6">
        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input type="password" id="password" v-model="password" @input="validateField('password')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        <p v-if="errors.password" class="text-red-500 text-xs italic mt-2">{{ errors.password }}</p>
      </div>
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
        Logout
      </button>
      <p v-if="authError" class="text-red-500 text-xs italic mt-4 text-center">{{ authError }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isLoggedIn } from '../auth.js'
import { useFormValidation } from '../useFormValidation.js'
import { useToast } from '../useToast.js'

const email = ref('')
const password = ref('')
const authError = ref('')
const router = useRouter()
const { showToast } = useToast()

const { errors, validate, validateField } = useFormValidation({
  email: { value: email, required: true, isEmail: true },
  password: { value: password, required: true },
})

const handleLogout = () => {
  if (validate()) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

    if (loggedInUser && loggedInUser.email === email.value && loggedInUser.password === password.value) {
      localStorage.removeItem('loggedInUser')
      isLoggedIn.value = false
      showToast('Logged out successfully!', 'success')
      router.push('/')
    } else {
      authError.value = 'Invalid email or password'
      showToast('Invalid email or password', 'error')
    }
  }
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
