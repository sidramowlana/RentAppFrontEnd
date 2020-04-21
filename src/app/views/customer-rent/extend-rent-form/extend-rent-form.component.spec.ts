import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendRentFormComponent } from './extend-rent-form.component';

describe('ExtendRentFormComponent', () => {
  let component: ExtendRentFormComponent;
  let fixture: ComponentFixture<ExtendRentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendRentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendRentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
