import { ComponentFixture, TestBed } from '@angular/core/testing';

import { E2eIdvComponent } from './e2e-idv.component';

describe('E2eIdvComponent', () => {
  let component: E2eIdvComponent;
  let fixture: ComponentFixture<E2eIdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [E2eIdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(E2eIdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
