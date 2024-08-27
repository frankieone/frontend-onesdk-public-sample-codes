import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnfidoComponent } from './onfido.component';

describe('OnfidoComponent', () => {
  let component: OnfidoComponent;
  let fixture: ComponentFixture<OnfidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnfidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnfidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
