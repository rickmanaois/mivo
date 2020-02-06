import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationAccidentComponent } from './quotation-accident.component';

describe('QuotationAccidentComponent', () => {
  let component: QuotationAccidentComponent;
  let fixture: ComponentFixture<QuotationAccidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationAccidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
