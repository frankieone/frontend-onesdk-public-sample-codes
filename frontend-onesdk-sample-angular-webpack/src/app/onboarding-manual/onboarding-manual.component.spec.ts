import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingManualComponent } from './onboarding-manual.component';

describe('OnboardingManualComponent', () => {
  let component: OnboardingManualComponent;
  let fixture: ComponentFixture<OnboardingManualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnboardingManualComponent]
    });
    fixture = TestBed.createComponent(OnboardingManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
