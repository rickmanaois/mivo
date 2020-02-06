import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationTravelComponent } from './quotation-travel.component';

describe('QuotationTravelComponent', () => {
  let component: QuotationTravelComponent;
  let fixture: ComponentFixture<QuotationTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
