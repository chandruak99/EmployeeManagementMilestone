import { TestBed } from '@angular/core/testing';
import { Employee } from './employee';
import {MockBackend, MockConnection} from '@angular/http/testing';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  const apiUrl = 'http://localhost:8090/api/v1/employees';
  let service: EmployeeService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    employeeService=new EmployeeService();
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        EmployeeService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
  });
  
  service = TestBed.get(EmployeeService);
  mockBackend = TestBed.get(XHRBackend);
});

it('should get the list of products from the server', () => {
  const testEmployees = [
    {
      id: 1,
      FirstName: 'Chandru'
    },
    {
      id: 2,
      FirstName: 'Surya'
    },
    {
      id: 3,
      FirstName: 'Gokul'
    }
  ];

  // Arrange
  mockBackend.connections.subscribe((connection: MockConnection) => {
    expect(connection.request.method).toBe(RequestMethod.Get);
    expect(connection.request.url).toBe(apiUrl);

    connection.mockRespond(
      new Response(
        new ResponseOptions({
          body: testEmployees
        })
      )
    );
  });

  // Act
  service.getEmployeesList().subscribe(employees => {
    expect(employees.length).toEqual(3);
    expect(employees[0].firstName).toEqual('Chandru');
    expect(employees[1].firstName).toEqual('Surya');
    expect(employees[2].firstName).toEqual('Gokul');
  });
});

  it('should check if new employee is added', () => {
    employeeService.createEmployee("Gokul");
    const employeeList=employeeService.getEmployeesList();
    expect(employeeList.firstName).toContain("Gokul");
  });

  it('Find Employee by id is added', () => {
    const employee=employeeService.getEmployeeById(2);
    const employeeList=employeeService.getEmployeesList();
    expect(employeeList.firstName).toContain("Gokul");
  });

  it('Update an Employee by id ', () => {
    const oldemployeedetails=employeeService.getEmployeeById(2);
    const newemployeedetails=employeeService.updateEmployee(2,oldemployeedetails);
    const employeeList=employeeService.getEmployeesList();
    expect(employeeList.employee.firstName).toContain("Gokul");
  });




});
