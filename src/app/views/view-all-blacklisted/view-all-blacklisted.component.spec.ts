import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllBlacklistedComponent } from './view-all-blacklisted.component';

describe('ViewAllBlacklistedComponent', () => {
  let component: ViewAllBlacklistedComponent;
  let fixture: ComponentFixture<ViewAllBlacklistedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllBlacklistedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllBlacklistedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
