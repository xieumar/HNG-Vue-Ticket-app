<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold">Dashboard</h1>
      <router-link to="/logout" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300">
        Logout
      </router-link>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Total Tickets</h2>
        <p class="text-4xl font-bold text-blue-600">{{ totalTickets }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Open Tickets</h2>
        <p class="text-4xl font-bold text-green-600">{{ openTickets }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">In Progress Tickets</h2>
        <p class="text-4xl font-bold text-amber-600">{{ inProgressTickets }}</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Closed Tickets</h2>
        <p class="text-4xl font-bold text-gray-600">{{ closedTickets }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Tickets Status Over Time</h2>
        <div class="h-80">
          <Bar :data="overTimeChartData" :options="overTimeChartOptions" />
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Ticket Status Distribution</h2>
        <div class="h-80">
          <Doughnut :data="statusDistributionData" :options="statusDistributionOptions" />
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">All Tickets</h2>
      <ul class="divide-y divide-gray-200">
        <li v-for="ticket in tickets" :key="ticket.id" class="py-4 flex justify-between items-center">
          <div>
            <router-link :to="`/tickets/${ticket.id}`" class="text-lg font-medium text-blue-600 hover:underline">{{ ticket.title }}</router-link>
            <p class="text-gray-500 text-sm">Status: <span :class="{'text-green-600': ticket.status === 'open', 'text-amber-600': ticket.status === 'in_progress', 'text-gray-600': ticket.status === 'closed'}">{{ ticket.status }}</span></p>
          </div>
          <router-link :to="`/tickets/${ticket.id}`" class="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded shadow-md transition duration-300">View Details</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Bar, Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
import { isLoggedIn } from '../auth.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

const props = defineProps({
  tickets: {
    type: Array,
    required: true
  }
})

const router = useRouter()

const totalTickets = computed(() => props.tickets.length)
const openTickets = computed(() => props.tickets.filter(t => t.status === 'open').length)
const inProgressTickets = computed(() => props.tickets.filter(t => t.status === 'in_progress').length)
const closedTickets = computed(() => props.tickets.filter(t => t.status === 'closed').length)

// Data for Tickets Status Over Time (Clustered Bar Chart)
const overTimeChartData = computed(() => {
  const dates = [...new Set(props.tickets.map(ticket => ticket.createdAt))].sort()
  const openTicketsByDay = dates.map(date => props.tickets.filter(t => t.createdAt === date && t.status === 'open').length)
  const inProgressTicketsByDay = dates.map(date => props.tickets.filter(t => t.createdAt === date && t.status === 'in_progress').length)

  return {
    labels: dates,
    datasets: [
      {
        label: 'Open Tickets',
        backgroundColor: '#22C55E', // Tailwind green-500
        data: openTicketsByDay
      },
      {
        label: 'In Progress Tickets',
        backgroundColor: '#F59E0B', // Tailwind amber-500
        data: inProgressTicketsByDay
      }
    ]
  }
})

const overTimeChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#4B5563' // Tailwind gray-700
      }
    },
    tooltip: {
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#666',
      borderWidth: 1,
      cornerRadius: 4,
    }
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false
      },
      ticks: {
        color: '#6B7280' // Tailwind gray-500
      }
    },
    y: {
      stacked: true,
      beginAtZero: true,
      ticks: {
        precision: 0,
        color: '#6B7280' // Tailwind gray-500
      },
      grid: {
        color: '#E5E7EB' // Tailwind gray-200
      }
    }
  }
}

// Data for Ticket Status Distribution (Doughnut Chart)
const statusDistributionData = computed(() => {
  const openCount = openTickets.value
  const inProgressCount = inProgressTickets.value
  const closedCount = closedTickets.value

  return {
    labels: ['Open', 'In Progress', 'Closed'],
    datasets: [
      {
        backgroundColor: ['#22C55E', '#F59E0B', '#6B7280'], // Green, Amber, Gray
        data: [openCount, inProgressCount, closedCount]
      }
    ]
  }
})

const statusDistributionOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#4B5563'
      }
    },
    tooltip: {
      backgroundColor: '#333',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: '#666',
      borderWidth: 1,
      cornerRadius: 4,
    }
  }
}

</script>
