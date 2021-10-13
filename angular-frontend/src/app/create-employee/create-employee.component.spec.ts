import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

import { CreateEmployeeComponent } from './create-employee.component';

describe('Component: Student Form ', () => {

  let component: Employee;
  let fixture: ComponentFixture<Employee>;
  let submitEl: DebugElement;
  let id: DebugElement;
  let firstNamel: DebugElement;
  let lastName: DebugElement;
  let emailId : DebugElement;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [ Employee ]
    });
     
    fixture = TestBed.createComponent(Employee);
    component = fixture.componentInstance;

    submitEl = fixture.debugElement.query(By.css('input[id=btnSubmit]'));
    firstNamel = fixture.debugElement.query(By.css('input[id=txtFName]'));
    lastName = fixture.debugElement.query(By.css('input[id=txtLName]'));
    emailId = fixture.debugElement.query(By.css('input[type=email]'));
   
  }));


  it('Setting value to input properties on form load', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('Setting value to input properties on button click', () => {
    component.enabled = true;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeFalsy();
  });

  it('Entering value in input controls and emit output events', () => {
    let user: any;
    firstNamel.nativeElement.value = "Chandru";
    lastName.nativeElement.value = "K";
    emailId.nativeElement.value = "Chandruk@gmail.com";

    // Subscribe to the Observable and store the user in a local variable.
    component.onFormSubmit.subscribe((value) => user = value);

    // This sync emits the event and the subscribe callback gets executed above
    submitEl.triggerEventHandler('click', null);

    // Now we can check to make sure the emitted value is correct
    expect(user.firstName).toBe("Chandru");
    expect(user.lastName).toBe("K");
    expect(user.email).toBe("chandruk@gmail.com");
  });
});