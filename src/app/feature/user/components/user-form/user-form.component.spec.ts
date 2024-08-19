import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormComponent } from './user-form.component';
import { UserFormLoginComponent } from '../user-form-login/user-form-login.component';
import { UserFormRegisterComponent } from '../user-form-register/user-form-register.component';
import { MaterialModule } from '../../../../core/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserFormComponent,
        UserFormLoginComponent,
        UserFormRegisterComponent
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [UserService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
