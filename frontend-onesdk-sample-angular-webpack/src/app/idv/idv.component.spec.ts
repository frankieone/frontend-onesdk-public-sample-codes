import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdvDynamicComponent } from './idv.component';

describe('IdvDynamicComponent', () => {
  let component: IdvDynamicComponent;
  let fixture: ComponentFixture<IdvDynamicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdvDynamicComponent]
    });
    fixture = TestBed.createComponent(IdvDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
