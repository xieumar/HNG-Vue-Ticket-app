<template>
  <nav v-if="showNavbar" class="bg-[#155DFC] p-4 fixed w-full top-0 z-30 shadow-lg">
    <div class="container mx-auto flex items-center justify-between flex-wrap">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <router-link to="/" class="font-semibold text-xl tracking-tight">TicketApp</router-link>
      </div>
      <div class="block lg:hidden">
        <button @click="isOpen = !isOpen" class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-200 hover:border-gray-200">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div :class="isOpen ? 'block' : 'hidden'" class="w-full flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow lg:flex lg:justify-center lg:space-x-6 mt-4 lg:mt-0">
          <router-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">Home</router-link>
          <router-link to="/tickets" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4">Tickets</router-link>
          <router-link to="/dashboard" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200">Dashboard</router-link>
        </div>
        <div class="mt-4 lg:mt-0">
          <router-link v-if="isLoggedIn" to="/logout" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">Logout</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { isLoggedIn } from '../auth.js'

const route = useRoute()
const isOpen = ref(false)

const showNavbar = computed(() => {
  return route.path !== '/login' && route.path !== '/signup'
})

</script>
