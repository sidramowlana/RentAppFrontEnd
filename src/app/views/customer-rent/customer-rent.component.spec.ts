import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRentComponent } from './customer-rent.component';

describe('CustomerRentComponent', () => {
  let component: CustomerRentComponent;
  let fixture: ComponentFixture<CustomerRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
