import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeOneComponent } from './question-type-one.component';

describe('QuestionTypeOneComponent', () => {
  let component: QuestionTypeOneComponent;
  let fixture: ComponentFixture<QuestionTypeOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionTypeOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionTypeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
