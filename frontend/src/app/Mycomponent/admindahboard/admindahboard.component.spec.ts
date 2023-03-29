import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindahboardComponent } from './admindahboard.component';

describe('AdmindahboardComponent', () => {
  let component: AdmindahboardComponent;
  let fixture: ComponentFixture<AdmindahboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindahboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmindahboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
