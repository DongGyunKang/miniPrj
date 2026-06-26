import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import http from '@/api/http'

export const useHrStore = defineStore('hr', () => {
  // 대시보드에 표시할 인사관리시스템 업무 메뉴입니다.
  // 메뉴를 추가하면 라우터와 화면 파일도 같이 추가하면 됩니다.
  const modules = ref([
    {
      key: 'employees',
      name: '직원 관리',
      description: '직원 기본정보와 개인정보 변경을 관리합니다.',
      route: '/employees',
      status: '진행',
    },
    {
      key: 'departments',
      name: '부서 관리',
      description: '부서장, 소속 인원, 주요업무, 아침 보고서를 관리합니다.',
      route: '/departments',
      status: '진행',
    },
    {
      key: 'attendance',
      name: '근태 관리',
      description: '부서별 출근/결원 현황과 직원별 근태를 확인합니다.',
      route: '/attendance',
      status: '진행',
    },
    {
      key: 'leave',
      name: '휴가 관리',
      description: '휴가 종류를 선택해 신청하고 사용 현황을 확인합니다.',
      route: '/leave',
      status: '진행',
    },
    {
      key: 'admin',
      name: '관리자 설정',
      description: '권한, 공통코드, 시스템 기준값을 관리합니다.',
      route: '/admin',
      status: '예정',
    },
  ])

  // 부서 관리 화면의 기본 데이터입니다.
  // members는 부서별 소속 인원, mainTasks는 주요업무, morningReports는 아침 보고서 목록입니다.
  const departments = ref([
    {
      id: 1,
      name: '인사팀',
      manager: 'Kim Admin',
      members: ['Kim Admin', 'Han Recruiter', 'Choi HR', 'Yoon Clerk'],
      mainTasks: '채용 일정 관리, 인사기록 정리, 평가 운영',
      morningReports: [
        { id: 1, date: '2026-06-26', content: '신규 입사자 서류 점검과 휴가 신청 건 확인 예정' },
      ],
    },
    {
      id: 2,
      name: '개발팀',
      manager: 'Lee Staff',
      members: ['Lee Staff', 'Jung Dev', 'Moon QA', 'Seo Front'],
      mainTasks: '인사관리 시스템 화면 개발, API 연동, 오류 수정',
      morningReports: [
        { id: 1, date: '2026-06-26', content: '직원 상세 화면과 부서 관리 화면 구조 점검' },
      ],
    },
    {
      id: 3,
      name: '운영팀',
      manager: 'Park User',
      members: ['Park User', 'Oh Operator', 'Lim Support'],
      mainTasks: '근태 데이터 확인, 사용자 문의 대응, 월간 운영 리포트 준비',
      morningReports: [
        { id: 1, date: '2026-06-26', content: '결원 인원 확인 후 부서장에게 공유' },
      ],
    },
  ])

  // 근태 관리 화면의 기본 데이터입니다.
  // status가 '출근'이면 출근 인원, 그 외에는 결원으로 계산합니다.
  const attendance = ref([
    { id: 1, employee: 'Kim Admin', department: '인사팀', checkIn: '09:01', checkOut: '18:04', status: '출근' },
    { id: 2, employee: 'Han Recruiter', department: '인사팀', checkIn: '-', checkOut: '-', status: '결원' },
    { id: 3, employee: 'Lee Staff', department: '개발팀', checkIn: '09:18', checkOut: '-', status: '출근' },
    { id: 4, employee: 'Jung Dev', department: '개발팀', checkIn: '08:55', checkOut: '18:10', status: '출근' },
    { id: 5, employee: 'Park User', department: '운영팀', checkIn: '08:57', checkOut: '18:02', status: '출근' },
    { id: 6, employee: 'Oh Operator', department: '운영팀', checkIn: '-', checkOut: '-', status: '결원' },
  ])

  // 휴가 관리 화면의 기본 데이터입니다.
  // 나중에 leave_requests 같은 테이블로 분리하면 이 구조를 그대로 참고하면 됩니다.
  const leaveRequests = ref([
    { id: 1, employee: 'Kim Admin', type: '연차', startDate: '2026-07-03', endDate: '2026-07-03', reason: '개인 일정', status: '승인대기' },
    { id: 2, employee: 'Lee Staff', type: '오전반차', startDate: '2026-07-08', endDate: '2026-07-08', reason: '병원 방문', status: '승인' },
    { id: 3, employee: 'Park User', type: '병가', startDate: '2026-07-12', endDate: '2026-07-13', reason: '치료', status: '검토' },
  ])

  // 관리자 설정은 아직 세부 구현 전이라 목록만 유지합니다.
  const adminTasks = ref([
    { id: 1, name: '직급 코드 관리', owner: '인사팀', status: '예정' },
    { id: 2, name: '권한 그룹 관리', owner: '관리자', status: '설계' },
    { id: 3, name: '휴가 기준일 설정', owner: '인사팀', status: '예정' },
  ])

  // 휴가 신청 폼의 라디오 버튼에 표시할 휴가 종류입니다.
  const leaveTypes = ['연차', '오전반차', '오후반차', '병가', '경조사']
  const loading = ref(false)

  // 근태 데이터를 부서별 카드 형태로 보여주기 위해 계산한 값입니다.
  // AttendanceView.vue에서 부서별 출근/결원 숫자와 상세 인원 목록을 표시합니다.
  const attendanceByDepartment = computed(() => departments.value.map((department) => {
    const records = attendance.value.filter((item) => item.department === department.name)
    const present = records.filter((item) => item.status === '출근').length
    const absent = records.filter((item) => item.status !== '출근').length

    return {
      department: department.name,
      manager: department.manager,
      total: records.length,
      present,
      absent,
      records,
    }
  }))

  // 대시보드 상단 지표입니다.
  // 실제 DB가 생기면 백엔드 summary API 값으로 바꾸거나 이 계산식을 유지해도 됩니다.
  const summary = computed(() => ({
    modules: modules.value.length,
    departments: departments.value.length,
    todayAttendance: attendance.value.filter((item) => item.status === '출근').length,
    pendingLeaves: leaveRequests.value.filter((item) => item.status !== '승인').length,
  }))

  // 백엔드 샘플 API에서 HR 데이터를 받아옵니다.
  // 백엔드가 꺼져 있거나 DB/API 작업 중이면 catch에서 로컬 샘플 데이터를 그대로 유지합니다.
  async function loadHrData() {
    loading.value = true

    try {
      const [modulesRes, departmentsRes, attendanceRes, leavesRes, adminTasksRes] = await Promise.all([
        http.get('/hr/modules'),
        http.get('/hr/departments'),
        http.get('/hr/attendance'),
        http.get('/hr/leaves'),
        http.get('/hr/admin-tasks'),
      ])

      modules.value = modulesRes.data
      departments.value = departmentsRes.data
      attendance.value = attendanceRes.data
      leaveRequests.value = leavesRes.data
      adminTasks.value = adminTasksRes.data
    } catch {
      // DB/API 준비 전에는 로컬 샘플 데이터로 화면 구조를 유지합니다.
    } finally {
      loading.value = false
    }
  }

  // 부서 추가입니다.
  // members는 "Kim, Lee, Park"처럼 쉼표로 입력받아 배열로 바꿉니다.
  // 백엔드 API를 먼저 호출하고, 실패하면 화면 상태에만 임시 추가합니다.
  async function addDepartment(payload) {
    const department = {
      id: Date.now(),
      name: payload.name,
      manager: payload.manager,
      members: payload.members
        .split(',')
        .map((member) => member.trim())
        .filter(Boolean),
      mainTasks: payload.mainTasks,
      morningReports: [],
    }

    try {
      const { data } = await http.post('/hr/departments', department)
      departments.value = [...departments.value, { ...department, ...data }]
    } catch {
      departments.value = [...departments.value, department]
    }
  }

  // 부서의 주요업무를 수정합니다.
  // 아침 보고서를 받은 뒤 업무가 바뀌었을 때도 이 함수를 사용할 수 있습니다.
  async function updateDepartmentTasks(id, mainTasks) {
    const department = departments.value.find((item) => String(item.id) === String(id))
    if (department) {
      department.mainTasks = mainTasks
    }

    try {
      await http.post(`/hr/departments/${id}/tasks`, { mainTasks })
    } catch {
      // API가 아직 준비되지 않아도 화면 상태 수정은 유지합니다.
    }
  }

  // 부서별 아침 보고서를 추가합니다.
  // updateTasks가 true이면 보고서 내용을 주요업무에도 바로 반영합니다.
  async function addMorningReport(id, payload) {
    const department = departments.value.find((item) => String(item.id) === String(id))
    if (!department) {
      return
    }

    let report = {
      id: Date.now(),
      date: payload.date,
      content: payload.content,
    }

    try {
      const { data } = await http.post(`/hr/departments/${id}/morning-reports`, payload)
      report = { ...report, ...data }
    } catch {
      // API가 아직 준비되지 않아도 화면 상태 추가는 유지합니다.
    }

    department.morningReports = [report, ...department.morningReports]

    if (payload.updateTasks) {
      department.mainTasks = payload.content
    }
  }

  // 휴가 신청을 화면 상태에 추가합니다.
  // 백엔드 API를 먼저 호출하고, 실패하면 화면 상태에만 임시 추가합니다.
  async function addLeaveRequest(payload) {
    let leaveRequest = {
      id: Date.now(),
      status: '승인대기',
      ...payload,
    }

    try {
      const { data } = await http.post('/hr/leaves', leaveRequest)
      leaveRequest = { ...leaveRequest, ...data }
    } catch {
      // API가 아직 준비되지 않아도 화면 상태 추가는 유지합니다.
    }

    leaveRequests.value = [leaveRequest, ...leaveRequests.value]
  }

  return {
    modules,
    departments,
    attendance,
    attendanceByDepartment,
    leaveRequests,
    leaveTypes,
    adminTasks,
    loading,
    summary,
    loadHrData,
    addDepartment,
    updateDepartmentTasks,
    addMorningReport,
    addLeaveRequest,
  }
})
