import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartUiComponent } from './smart-ui.component';

describe('SmartUiComponent', () => {
  let component: SmartUiComponent;
  let fixture: ComponentFixture<SmartUiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmartUiComponent]
    });
    fixture = TestBed.createComponent(SmartUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
