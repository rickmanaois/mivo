import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPrintingComponent } from './document-printing.component';

describe('DocumentPrintingComponent', () => {
  let component: DocumentPrintingComponent;
  let fixture: ComponentFixture<DocumentPrintingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPrintingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
