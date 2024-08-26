import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteDisciplineFormComponent } from './invite-discipline-form.component';

describe('InviteDisciplineFormComponent', () => {
  let component: InviteDisciplineFormComponent;
  let fixture: ComponentFixture<InviteDisciplineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteDisciplineFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteDisciplineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
