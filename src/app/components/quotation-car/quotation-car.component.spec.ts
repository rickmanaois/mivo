import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationCarComponent } from './quotation-car.component';

describe('QuotationCarComponent', () => {
  let component: QuotationCarComponent;
  let fixture: ComponentFixture<QuotationCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
