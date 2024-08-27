import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartuiComponent } from './smartui.component';

describe('SmartuiComponent', () => {
  let component: SmartuiComponent;
  let fixture: ComponentFixture<SmartuiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartuiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmartuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
