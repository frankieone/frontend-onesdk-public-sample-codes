import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdverseComponent } from './idverse.component';

describe('IdverseComponent', () => {
  let component: IdverseComponent;
  let fixture: ComponentFixture<IdverseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdverseComponent]
    });
    fixture = TestBed.createComponent(IdverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
