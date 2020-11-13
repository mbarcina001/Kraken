import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserContainerComponent } from './user-container.component';

describe('UserContainerComponent', () => {
  let component: UserContainerComponent;
  let fixture: ComponentFixture<UserContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
