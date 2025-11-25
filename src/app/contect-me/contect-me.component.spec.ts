import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContectMeComponent } from './contect-me.component';

describe('ContectMeComponent', () => {
  let component: ContectMeComponent;
  let fixture: ComponentFixture<ContectMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContectMeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContectMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
