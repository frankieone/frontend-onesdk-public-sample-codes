import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdverseComponent } from './idverse.component';

describe('IdverseComponent', () => {
  let component: IdverseComponent;
  let fixture: ComponentFixture<IdverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdverseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IdverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
