import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverageVariableDataComponent } from './coverage-variable-data.component';

describe('CoverageVariableDataComponent', () => {
  let component: CoverageVariableDataComponent;
  let fixture: ComponentFixture<CoverageVariableDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverageVariableDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverageVariableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
