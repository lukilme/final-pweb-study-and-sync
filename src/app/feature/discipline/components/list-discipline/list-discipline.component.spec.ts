import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisciplineComponent } from './list-discipline.component';

describe('ListDisciplineComponent', () => {
  let component: ListDisciplineComponent;
  let fixture: ComponentFixture<ListDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListDisciplineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
