import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineHomeComponent } from './discipline-home.component';

describe('DisciplineHomeComponent', () => {
  let component: DisciplineHomeComponent;
  let fixture: ComponentFixture<DisciplineHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisciplineHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplineHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
