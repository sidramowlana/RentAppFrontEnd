import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEmptyComponent } from './start-empty.component';

describe('StartEmptyComponent', () => {
  let component: StartEmptyComponent;
  let fixture: ComponentFixture<StartEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
