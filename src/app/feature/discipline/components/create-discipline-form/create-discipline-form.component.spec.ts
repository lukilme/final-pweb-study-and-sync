import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDisciplineFormComponent } from './create-discipline-form.component';

describe('CreateDisciplineFormComponent', () => {
  let component: CreateDisciplineFormComponent;
  let fixture: ComponentFixture<CreateDisciplineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDisciplineFormComponent]
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
