import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdvDynamicComponent } from './idv-dynamic.component';

describe('IdvDynamicComponent', () => {
  let component: IdvDynamicComponent;
  let fixture: ComponentFixture<IdvDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdvDynamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdvDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
