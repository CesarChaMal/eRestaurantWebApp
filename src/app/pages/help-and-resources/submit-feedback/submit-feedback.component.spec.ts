import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitFeedbackComponent } from './submit-feedback.component';

describe('SubmitFeedbackComponent', () => {
  let component: SubmitFeedbackComponent;
  let fixture: ComponentFixture<SubmitFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
