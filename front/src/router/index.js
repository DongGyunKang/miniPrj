import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import DepartmentsView from '@/views/DepartmentsView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import LeaveView from '@/views/LeaveView.vue'
import AdminView from '@/views/AdminView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/employees', name: 'employees', component: EmployeesView },
    { path: '/departments', name: 'departments', component: DepartmentsView },
    { path: '/attendance', name: 'attendance', component: AttendanceView },
    { path: '/leave', name: 'leave', component: LeaveView },
    { path: '/admin', name: 'admin', component: AdminView },
  ],
})

export default router
