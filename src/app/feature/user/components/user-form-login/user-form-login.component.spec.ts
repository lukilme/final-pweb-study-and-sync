import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserFormLoginComponent } from './user-form-login.component';
import { MaterialModule } from '../../../../core/material/material.module';
import { UserService } from '../../service/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UserFormLoginComponent', () => {
  let component: UserFormLoginComponent;
  let fixture: ComponentFixture<UserFormLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserFormLoginComponent],
      imports: [
        BrowserModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        UserService,
        provideHttpClient(withInterceptorsFromDi())
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
