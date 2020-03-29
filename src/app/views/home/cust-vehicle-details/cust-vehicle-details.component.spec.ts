import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustVehicleDetailsComponent } from './cust-vehicle-details.component';

describe('CustVehicleDetailsComponent', () => {
  let component: CustVehicleDetailsComponent;
  let fixture: ComponentFixture<CustVehicleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustVehicleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
