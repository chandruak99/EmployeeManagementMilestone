package net.javaguides.springboot;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.mindtree.employeemanagerapp.model.Employee;
import com.mindtree.employeemanagerapp.service.EmployeeService;
import com.mindtree.employeemanagerapp.service.serviceimpl.EmployeeServiceImpl;

class MockitoTests {
	
	

	@Test
	public void letsMockEmployeeNAme() {
		Employee employee = mock(Employee.class);
		Mockito.when(employee.getFirstName()).thenReturn("Chandru");
		assertEquals("Chandru", "Chandru");
	}
	
	@Test
	public void letsMockEmployeeListGet() {
		EmployeeService emps=new EmployeeServiceImpl();
		List<Employee> temp=emps.getAllEmployees();
	     List<String> employees = mock(List.class);
		Mockito.when(employees.get(1)).thenReturn("Surya");
		assertEquals("Surya", employees.get(1));
		assertNull(employees.get(1));
	}
	
	
	
	
}
