import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskTheCommunityComponent } from './ask-the-community.component';

describe('AskTheCommunityComponent', () => {
  let component: AskTheCommunityComponent;
  let fixture: ComponentFixture<AskTheCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskTheCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskTheCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
