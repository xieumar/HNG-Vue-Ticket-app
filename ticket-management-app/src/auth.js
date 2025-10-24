import { ref } from 'vue'

export const isLoggedIn = ref(localStorage.getItem('loggedInUser') !== null)
