import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickQuotationHomeComponent } from './quick-quotation-home.component';

describe('QuickQuotationHomeComponent', () => {
  let component: QuickQuotationHomeComponent;
  let fixture: ComponentFixture<QuickQuotationHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickQuotationHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickQuotationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
