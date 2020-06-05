import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllRentComponent } from './view-all-rent.component';

describe('ViewAllRentComponent', () => {
  let component: ViewAllRentComponent;
  let fixture: ComponentFixture<ViewAllRentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllRentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
