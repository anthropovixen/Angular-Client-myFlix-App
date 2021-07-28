import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDirectionComponent } from './movie-direction.component';

describe('MovieDirectionComponent', () => {
  let component: MovieDirectionComponent;
  let fixture: ComponentFixture<MovieDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
