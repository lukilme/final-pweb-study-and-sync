import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormRegisterComponent } from './user-form-register.component';
import { MaterialModule } from '../../../../core/material/material.module';
import { UserService } from '../../service/user.service';

describe('UserFormRegisterComponent', () => {
  let component: UserFormRegisterComponent;
  let fixture: ComponentFixture<UserFormRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormRegisterComponent],
      imports:[MaterialModule],
      providers: [
        UserService        
      ]
    })
    .compileComponents();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(UserFormRegisterComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
