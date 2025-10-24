<template>
  <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
    <form @submit.prevent="handleLogin">
      <h2 class="text-3xl font-bold text-center mb-6">Login</h2>
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
        Login
      </button>
      <p v-if="authError" class="text-red-500 text-xs italic mt-4 text-center">{{ authError }}</p>
      <p class="text-center text-gray-600 text-sm mt-4">First time user? <router-link to="/signup" class="text-blue-500 hover:text-blue-800">Sign up</router-link></p>
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

const handleLogin = () => {
  if (validate()) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === email.value && u.password === password.value)

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      isLoggedIn.value = true
      showToast('Logged in successfully!', 'success')
      router.push('/dashboard')
    } else {
      authError.value = 'Invalid email or password'
      showToast('Invalid email or password', 'error')
    }
  }
}
</script>
