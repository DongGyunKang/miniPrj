package aaa.controll_p;

import aaa.model_p.EmployeeDTO;
import aaa.service_p.EmployeeService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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

	public EmployeeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	@GetMapping
	public List<EmployeeDTO> list() {
		return employeeService.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<EmployeeDTO> detail(@PathVariable Long id) {
		return employeeService.findById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public EmployeeDTO insert(@RequestBody EmployeeDTO dto) {
		return employeeService.insert(dto);
	}

	@PostMapping("/insert")
	@ResponseStatus(HttpStatus.CREATED)
	public EmployeeDTO insertAlias(@RequestBody EmployeeDTO dto) {
		return employeeService.insert(dto);
	}
}
