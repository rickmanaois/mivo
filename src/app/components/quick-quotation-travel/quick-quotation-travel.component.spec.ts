import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickQuotationTravelComponent } from './quick-quotation-travel.component';

describe('QuickQuotationTravelComponent', () => {
  let component: QuickQuotationTravelComponent;
  let fixture: ComponentFixture<QuickQuotationTravelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickQuotationTravelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickQuotationTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
