import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditionModalComponent } from './user-edition-modal.component';

describe('UserEditionModalComponent', () => {
  let component: UserEditionModalComponent;
  let fixture: ComponentFixture<UserEditionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
