<template>
  <div class="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
    <form @submit.prevent="handleSignup">
      <h2>Sign Up</h2>
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
        <input type="text" id="name" v-model="name" @input="validateField('name')" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <p v-if="errors.name" class="text-red-500 text-xs italic mt-2">{{ errors.name }}</p>
      </div>
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
        Sign Up
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

const name = ref('')
const email = ref('')
const password = ref('')
const authError = ref('')
const router = useRouter()
const { showToast } = useToast()

const { errors, validate, validateField } = useFormValidation({
  name: { value: name, required: true },
  email: { value: email, required: true, isEmail: true },
  password: { value: password, required: true },
})

const handleSignup = () => {
  if (validate()) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const userExists = users.some(u => u.email === email.value)

    if (userExists) {
      authError.value = 'User with this email already exists. Redirecting to login...'
      showToast('User already exists. Redirecting to login...', 'warning')
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
      return
    }

    const newUser = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      password: password.value
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('ticketapp_session', JSON.stringify(newUser))
    isLoggedIn.value = true
    showToast('Account created successfully!', 'success')
    router.push('/dashboard')
  }
}
</script>
