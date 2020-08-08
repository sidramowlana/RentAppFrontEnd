import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorsPriceComponent } from './competitors-price.component';

describe('CompetitorsPriceComponent', () => {
  let component: CompetitorsPriceComponent;
  let fixture: ComponentFixture<CompetitorsPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitorsPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitorsPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
