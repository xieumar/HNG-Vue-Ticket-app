import { ref } from 'vue'

export const isLoggedIn = ref(localStorage.getItem('ticketapp_session') !== null)
