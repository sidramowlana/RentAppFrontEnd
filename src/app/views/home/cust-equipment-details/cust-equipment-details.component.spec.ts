import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustEquipmentDetailsComponent } from './cust-equipment-details.component';

describe('CustEquipmentDetailsComponent', () => {
  let component: CustEquipmentDetailsComponent;
  let fixture: ComponentFixture<CustEquipmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustEquipmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustEquipmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
