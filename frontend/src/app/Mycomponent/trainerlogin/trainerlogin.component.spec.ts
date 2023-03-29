import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerloginComponent } from './trainerlogin.component';

describe('TrainerloginComponent', () => {
  let component: TrainerloginComponent;
  let fixture: ComponentFixture<TrainerloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
