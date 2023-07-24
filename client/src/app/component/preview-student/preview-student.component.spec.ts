import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewStudentComponent } from './preview-student.component';

describe('PreviewStudentComponent', () => {
  let component: PreviewStudentComponent;
  let fixture: ComponentFixture<PreviewStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewStudentComponent]
    });
    fixture = TestBed.createComponent(PreviewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
