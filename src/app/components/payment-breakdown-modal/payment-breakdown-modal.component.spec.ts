import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBreakdownModalComponent } from './payment-breakdown-modal.component';

describe('PaymentBreakdownModalComponent', () => {
  let component: PaymentBreakdownModalComponent;
  let fixture: ComponentFixture<PaymentBreakdownModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentBreakdownModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBreakdownModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
