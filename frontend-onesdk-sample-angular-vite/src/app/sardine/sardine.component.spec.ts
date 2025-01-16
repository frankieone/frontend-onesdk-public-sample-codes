import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SardineComponent } from './sardine.component';

describe('SardineComponent', () => {
  let component: SardineComponent;
  let fixture: ComponentFixture<SardineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SardineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SardineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
