import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbNotAllowedComponent } from './verb-not-allowed.component';

describe('VerbNotAllowedComponent', () => {
  let component: VerbNotAllowedComponent;
  let fixture: ComponentFixture<VerbNotAllowedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbNotAllowedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbNotAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
