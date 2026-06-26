import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import EmployeeDetailView from '@/views/EmployeeDetailView.vue'
import DepartmentsView from '@/views/DepartmentsView.vue'
import AttendanceView from '@/views/AttendanceView.vue'
import LeaveView from '@/views/LeaveView.vue'
import AdminView from '@/views/AdminView.vue'

// 화면 URL과 Vue 컴포넌트를 연결하는 라우터입니다.
// 새 메뉴를 만들 때는 여기에 path와 component를 추가합니다.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 인사관리 대시보드
    { path: '/', name: 'home', component: HomeView },
    // 직원 목록과 직원 상세정보
    { path: '/employees', name: 'employees', component: EmployeesView },
    { path: '/employees/:id', name: 'employee-detail', component: EmployeeDetailView },
    // 부서/근태/휴가/관리자 업무 화면
    { path: '/departments', name: 'departments', component: DepartmentsView },
    { path: '/attendance', name: 'attendance', component: AttendanceView },
    { path: '/leave', name: 'leave', component: LeaveView },
    { path: '/admin', name: 'admin', component: AdminView },
  ],
})

export default router
