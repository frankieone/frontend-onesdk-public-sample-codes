import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E2eIdvComponent } from './idv-review';

describe('E2eIdvComponent', () => {
  let component: E2eIdvComponent;
  let fixture: ComponentFixture<E2eIdvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [E2eIdvComponent]
    });
    fixture = TestBed.createComponent(E2eIdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
