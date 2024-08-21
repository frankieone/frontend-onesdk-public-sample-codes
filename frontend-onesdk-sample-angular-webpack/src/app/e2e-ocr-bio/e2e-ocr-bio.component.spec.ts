import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E2eOcrBioComponent } from './e2e-ocr-bio.component';

describe('E2eOcrBioComponent', () => {
  let component: E2eOcrBioComponent;
  let fixture: ComponentFixture<E2eOcrBioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [E2eOcrBioComponent]
    });
    fixture = TestBed.createComponent(E2eOcrBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
