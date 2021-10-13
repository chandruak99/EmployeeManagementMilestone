import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { EmployeeService } from '../employee.service';

import { EmployeeDetailsComponent } from './employee-details.component';


class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }
}

describe('EmployeeDetailsComponent', () => {
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let component: EmployeeDetailsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:  [HttpModule, RouterTestingModule],
      declarations: [EmployeeDetailsComponent],
      providers: [
        EmployeeService,
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    });

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should show product details for a particular product', () => {
    component.employee = {
     
        id:3,
          firstName:'Gokul',
          lastName:'A',
          emailId:'Gokul@gmail.com',
          enabled:'true',
    };

    fixture.detectChanges();

    const nameElement: HTMLElement = fixture.debugElement.query(
      By.css('.FirstName')
    ).nativeElement;
    const descriptionElement: HTMLElement = fixture.debugElement.query(
      By.css('#LastName')
    ).nativeElement;
    const availabilityElement: HTMLElement = fixture.debugElement.query(
      By.css('#emailid')
    ).nativeElement;
    const priceElement: HTMLElement = fixture.debugElement.query(
      By.css('#enabled')
    ).nativeElement;

    expect(nameElement.innerText).toContain('Gokul');
    expect(descriptionElement.innerText).toContain('A');
    expect(availabilityElement.innerText).toContain('Gokul@gmail.com');
    expect(priceElement.innerText).toContain('true');
  });

  

  it('should navigate the user to the `Not Found` component when an invalid Employee id is passed', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    fixture.detectChanges();

    const route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ id: 'abc' });

    expect(spy).toHaveBeenCalledWith(['/not-found']);
  });
});

