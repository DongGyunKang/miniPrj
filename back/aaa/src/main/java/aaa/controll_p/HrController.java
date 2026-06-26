package aaa.controll_p;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hr")
public class HrController {

	@GetMapping("/summary")
	public Map<String, Object> summary() {
		return Map.of(
				"modules", 5,
				"departments", 3,
				"todayAttendance", 3,
				"pendingLeaves", 2
		);
	}

	@GetMapping("/modules")
	public List<Map<String, Object>> modules() {
		return List.of(
				Map.of(
						"key", "employees",
						"name", "직원 관리",
						"description", "직원 기본정보, 부서, 직급, 입사일을 관리합니다.",
						"route", "/employees",
						"status", "진행"
				),
				Map.of(
						"key", "departments",
						"name", "부서 관리",
						"description", "조직도, 부서장, 소속 인원을 정리합니다.",
						"route", "/departments",
						"status", "설계"
				),
				Map.of(
						"key", "attendance",
						"name", "근태 관리",
						"description", "출근, 퇴근, 지각, 결근 내역을 확인합니다.",
						"route", "/attendance",
						"status", "설계"
				),
				Map.of(
						"key", "leave",
						"name", "휴가 관리",
						"description", "연차 신청, 승인, 잔여 휴가를 관리합니다.",
						"route", "/leave",
						"status", "설계"
				),
				Map.of(
						"key", "admin",
						"name", "관리자 설정",
						"description", "권한, 공통코드, 시스템 기준값을 관리합니다.",
						"route", "/admin",
						"status", "예정"
				)
		);
	}

	@GetMapping("/departments")
	public List<Map<String, Object>> departments() {
		return List.of(
				Map.of("id", 1, "name", "인사팀", "manager", "Kim Admin", "headcount", 4, "role", "채용, 인사기록, 평가 운영"),
				Map.of("id", 2, "name", "개발팀", "manager", "Lee Staff", "headcount", 12, "role", "서비스 개발, 유지보수"),
				Map.of("id", 3, "name", "운영팀", "manager", "Park User", "headcount", 7, "role", "고객 운영, 정산, 현장 대응")
		);
	}

	@GetMapping("/attendance")
	public List<Map<String, Object>> attendance() {
		return List.of(
				Map.of("id", 1, "employee", "Kim Admin", "department", "인사팀", "checkIn", "09:01", "checkOut", "18:04", "status", "정상"),
				Map.of("id", 2, "employee", "Lee Staff", "department", "개발팀", "checkIn", "09:18", "checkOut", "-", "status", "지각"),
				Map.of("id", 3, "employee", "Park User", "department", "운영팀", "checkIn", "08:55", "checkOut", "18:10", "status", "정상")
		);
	}

	@GetMapping("/leaves")
	public List<Map<String, Object>> leaves() {
		return List.of(
				Map.of("id", 1, "employee", "Kim Admin", "type", "연차", "period", "2026-07-03", "status", "승인대기"),
				Map.of("id", 2, "employee", "Lee Staff", "type", "오전반차", "period", "2026-07-08", "status", "승인"),
				Map.of("id", 3, "employee", "Park User", "type", "병가", "period", "2026-07-12 ~ 2026-07-13", "status", "검토")
		);
	}

	@GetMapping("/admin-tasks")
	public List<Map<String, Object>> adminTasks() {
		return List.of(
				Map.of("id", 1, "name", "직급 코드 관리", "owner", "인사팀", "status", "예정"),
				Map.of("id", 2, "name", "권한 그룹 관리", "owner", "관리자", "status", "설계"),
				Map.of("id", 3, "name", "휴가 기준일 설정", "owner", "인사팀", "status", "예정")
		);
	}
}
