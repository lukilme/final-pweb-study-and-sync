import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormRegisterComponent } from './user-form-register.component';
import { MaterialModule } from '../../../../core/material/material.module';
import { UserService } from '../../service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserFormRegisterComponent', () => {
  let component: UserFormRegisterComponent;
  let fixture: ComponentFixture<UserFormRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormRegisterComponent],
      imports:[MaterialModule],
      providers: [
        UserService,
        provideHttpClient(withInterceptorsFromDi())
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
