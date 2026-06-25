package aaa.controll_p;

import aaa.service_p.EmployeeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	private final EmployeeService employeeService;

	public HomeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

	@GetMapping("/")
	public String home(Model model) {
		model.addAttribute("title", "MyMini HR");
		return "home";
	}

	@GetMapping("/employees")
	public String employees(Model model) {
		model.addAttribute("employees", employeeService.findAll());
		return "employees/list";
	}
}
