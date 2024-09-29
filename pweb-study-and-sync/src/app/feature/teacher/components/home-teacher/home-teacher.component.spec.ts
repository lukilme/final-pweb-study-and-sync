import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeacherComponent } from './home-teacher.component';
import { MaterialModule } from '../../../../core/material/material.module';

describe('HomeTeacherComponent', () => {
  let component: HomeTeacherComponent;
  let fixture: ComponentFixture<HomeTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeTeacherComponent],
      imports: [MaterialModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
