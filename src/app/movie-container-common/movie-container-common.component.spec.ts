import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieContainerCommonComponent } from './movie-container-common.component';

describe('MovieContainerCommonComponent', () => {
  let component: MovieContainerCommonComponent;
  let fixture: ComponentFixture<MovieContainerCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieContainerCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieContainerCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
