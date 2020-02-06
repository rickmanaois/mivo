import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationHomeComponent } from './quotation-home.component';

describe('QuotationHomeComponent', () => {
  let component: QuotationHomeComponent;
  let fixture: ComponentFixture<QuotationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
