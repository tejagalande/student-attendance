import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerdahboardComponent } from './trainerdahboard.component';

describe('TrainerdahboardComponent', () => {
  let component: TrainerdahboardComponent;
  let fixture: ComponentFixture<TrainerdahboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerdahboardComponent ],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerdahboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
