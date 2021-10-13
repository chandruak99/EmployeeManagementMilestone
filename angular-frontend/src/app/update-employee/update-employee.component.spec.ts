import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employee.service';

import { UpdateEmployeeComponent } from './update-employee.component';

describe('UpdateEmployeeComponent', () => {
  let fixture: ComponentFixture<UpdateEmployeeComponent>;
  let component: UpdateEmployeeComponent;
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateEmployeeComponent],
      imports: [FormsModule, HttpClient, RouterTestingModule],
      providers: [EmployeeService]
    });

    fixture = TestBed.createComponent(UpdateEmployeeComponent);
    component = fixture.componentInstance;

    // Get service instance if registered with providers array of module
    service = TestBed.get(EmployeeService);

    // Get service instance if registered with providers array within the component
    // service = fixture.debugElement.injector.get(ProductsService);
  });

  it(
    'should show employee details for a particular employee',
    async(() => {
      const employee =   {
        firstName:'GokulKannan',
        lastName:'K',
        emailId:'Gokulkannan@gmail.com',
        enabled:'true',
      },

      component.employee = employee;

      fixture.detectChanges();

      fixture.whenStable().then(() => {
        const nameElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#FirstName')
        ).nativeElement;
        const descriptionElement: HTMLTextAreaElement = fixture.debugElement.query(
          By.css('#LastName')
        ).nativeElement;
        const isAvailableElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#emailId')
        ).nativeElement;
        const priceElement: HTMLInputElement = fixture.debugElement.query(
          By.css('#enabled')
        ).nativeElement;

        expect(nameElement.value).toContain(employee.firstName);
        expect(descriptionElement.value).toContain(employee.lastName);
        expect(isAvailableElement.checked).toBeTruthy();
        expect(priceElement.value).toContain(employee.emailId.toString());
      });
    })
  );

  it('should save employee details when form is submitted', () => {
    component.addNew = true;
    const spy = spyOn(service, 'updateEmployee').and.returnValue(
      Observable.empty()
    );

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    // const button = fixture.debugElement.query(By.css('#save'));
    // button.nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });
});