import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingEditionModalComponent } from './meeting-edition-modal.component';

describe('MeetingEditionModalComponent', () => {
  let component: MeetingEditionModalComponent;
  let fixture: ComponentFixture<MeetingEditionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingEditionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingEditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
