import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalSummaryComponent } from './legal-summary.component';

describe('LegalSummaryComponent', () => {
  let component: LegalSummaryComponent;
  let fixture: ComponentFixture<LegalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
