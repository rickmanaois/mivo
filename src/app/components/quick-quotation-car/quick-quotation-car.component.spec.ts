import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickQuotationCarComponent } from './quick-quotation-car.component';

describe('QuickQuotationCarComponent', () => {
  let component: QuickQuotationCarComponent;
  let fixture: ComponentFixture<QuickQuotationCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickQuotationCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickQuotationCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
