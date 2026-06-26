package aaa.controll_p;

import aaa.model_p.EmployeeDTO;
import aaa.service_p.EmployeeService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

	private final EmployeeService employeeService;

	// 생성자 주입입니다.
	// EmployeeService가 실제 직원 조회/등록 로직을 담당합니다.
	public EmployeeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	// 직원 목록 조회 API입니다.
	// 프론트의 EmployeesView.vue가 처음 열릴 때 호출합니다.
	@GetMapping
	public List<EmployeeDTO> list() {
		return employeeService.findAll();
	}

	// 직원 상세 조회 API입니다.
	// 현재 프론트는 로컬 상태에서 상세를 찾지만, DB 연결 뒤에는 이 API를 직접 써도 됩니다.
	@GetMapping("/{id}")
	public ResponseEntity<EmployeeDTO> detail(@PathVariable Long id) {
		return employeeService.findById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	// 직원 등록 API입니다.
	// 지금은 EmployeeDAO.insert()가 employees 테이블에 기본정보를 저장합니다.
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public EmployeeDTO insert(@RequestBody EmployeeDTO dto) {
		return employeeService.insert(dto);
	}

	// 수업 예제나 기존 코드에서 /insert 형태로 호출할 수도 있어서 남겨둔 별칭 API입니다.
	@PostMapping("/insert")
	@ResponseStatus(HttpStatus.CREATED)
	public EmployeeDTO insertAlias(@RequestBody EmployeeDTO dto) {
		return employeeService.insert(dto);
	}

	// 직원 개인정보 수정 API의 뼈대입니다.
	// 아직 DB update SQL을 만들지 않았기 때문에 받은 DTO에 id만 넣어서 그대로 반환합니다.
	// 나중에 EmployeeService.updateProfile(id, dto) 같은 메서드로 바꾸면 됩니다.
	@PatchMapping("/{id}")
	public EmployeeDTO updateProfile(@PathVariable Long id, @RequestBody EmployeeDTO dto) {
		dto.setId(id);
		return dto;
	}
}
