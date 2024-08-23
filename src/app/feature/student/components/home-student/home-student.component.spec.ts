import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStudentComponent } from './home-student.component';
import { MaterialModule } from '../../../../core/material/material.module';

describe('HomeStudentComponent', () => {
  let component: HomeStudentComponent;
  let fixture: ComponentFixture<HomeStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeStudentComponent],
      imports:[MaterialModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
