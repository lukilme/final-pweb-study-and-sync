import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDisciplineFormComponent } from './create-discipline-form.component';
import { MaterialModule } from '../../../../core/material/material.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateDisciplineFormComponent', () => {
  let component: CreateDisciplineFormComponent;
  let fixture: ComponentFixture<CreateDisciplineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDisciplineFormComponent],
      imports: [MaterialModule, MatDialogModule, BrowserAnimationsModule],
      
      providers: [
        { provide: MatDialogRef, useValue: {} } // Mock de MatDialogRef
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDisciplineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
