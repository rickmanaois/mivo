import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualPolicyComponent } from './individual-policy.component';

describe('IndividualPolicyComponent', () => {
  let component: IndividualPolicyComponent;
  let fixture: ComponentFixture<IndividualPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
