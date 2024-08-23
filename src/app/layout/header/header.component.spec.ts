import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterModule.forRoot([]), MatDialogModule, MatToolbarModule], 
      providers: [
        { provide: MatDialogRef, useValue: {} }, 
        {
          provide: ActivatedRoute, 
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'mockedValue', 
              }
            },
            queryParams: of({}), 
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
