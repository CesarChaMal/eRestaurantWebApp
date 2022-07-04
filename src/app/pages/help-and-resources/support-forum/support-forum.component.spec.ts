import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportForumComponent } from './support-forum.component';

describe('SupportForumComponent', () => {
  let component: SupportForumComponent;
  let fixture: ComponentFixture<SupportForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
