package aaa.service_p;

import aaa.model_p.EmployeeDAO;
import aaa.model_p.EmployeeDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

	private final EmployeeDAO employeeDAO;

	public EmployeeService(EmployeeDAO employeeDAO) {
		this.employeeDAO = employeeDAO;
	}

	public List<EmployeeDTO> findAll() {
		return employeeDAO.list();
	}

	public Optional<EmployeeDTO> findById(Long id) {
		return employeeDAO.detail(id);
	}

	public EmployeeDTO insert(EmployeeDTO dto) {
		return employeeDAO.insert(dto);
	}
}
