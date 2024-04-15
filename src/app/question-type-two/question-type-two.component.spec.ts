import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTypeTwoComponent } from './question-type-two.component';

describe('QuestionTypeTwoComponent', () => {
  let component: QuestionTypeTwoComponent;
  let fixture: ComponentFixture<QuestionTypeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionTypeTwoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionTypeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
