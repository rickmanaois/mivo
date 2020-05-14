import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentBreakdownComponent } from './payment-breakdown.component';

describe('PaymentBreakdownComponent', () => {
  let component: PaymentBreakdownComponent;
  let fixture: ComponentFixture<PaymentBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
