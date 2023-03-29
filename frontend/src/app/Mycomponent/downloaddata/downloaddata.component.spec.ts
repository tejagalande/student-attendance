import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloaddataComponent } from './downloaddata.component';

describe('DownloaddataComponent', () => {
  let component: DownloaddataComponent;
  let fixture: ComponentFixture<DownloaddataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloaddataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloaddataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
