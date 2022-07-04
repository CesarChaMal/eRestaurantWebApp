import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAndResourcesMenuComponent } from './help-and-resources-menu.component';

describe('HelpAndResourcesMenuComponent', () => {
  let component: HelpAndResourcesMenuComponent;
  let fixture: ComponentFixture<HelpAndResourcesMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAndResourcesMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAndResourcesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
