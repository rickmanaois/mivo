import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickQuotationAccidentComponent } from './quick-quotation-accident.component';

describe('QuickQuotationAccidentComponent', () => {
  let component: QuickQuotationAccidentComponent;
  let fixture: ComponentFixture<QuickQuotationAccidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickQuotationAccidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickQuotationAccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
