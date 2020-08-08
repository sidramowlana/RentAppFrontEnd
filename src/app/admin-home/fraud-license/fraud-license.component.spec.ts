import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudLicenseComponent } from './fraud-license.component';

describe('FraudLicenseComponent', () => {
  let component: FraudLicenseComponent;
  let fixture: ComponentFixture<FraudLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraudLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
