import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { QuestionTypeOneComponent } from './question-type-one/question-type-one.component';
import { QuestionTypeTwoComponent } from './question-type-two/question-type-two.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    
    trigger('scrollAnimation', [
      transition('false => true', [
        query('.animation-element', [
          style({ opacity: 0, transform: 'translateZ(0) rotateX(-90deg)', transformOrigin: 'center' }),
          stagger('70ms', [
            animate('400ms cubic-bezier(.8, 0, 0.2, 3.5)', keyframes([
              style({ transform: 'translateZ(0) rotateX(-90deg)', opacity: 0, offset: 0 }),
              style({ transform: 'translateZ(0) rotateX(-22.5deg)', opacity: 1, offset: 0.25 }),
              style({ transform: 'translateZ(0) rotateX(0deg)', opacity: 1, offset: 1 })
            ]))
          ])
        ], { optional: true })
      ]),
      
    ]),
    
    trigger('stateAnimation', [
      state('false', style({ opacity: 0 })),
      state('true', style({ opacity: 1 })),
      transition('* <=> *', [
        animate('200ms ease-in')
      ])
    ])

  ]
})

export class AppComponent {
  title = 'cjscore-fragebogen-demo';
  

  questionTypeOne = QuestionTypeOneComponent;
  questionTypeTwo = QuestionTypeTwoComponent;

  @ViewChild('questionContainer', { read: ViewContainerRef }) questionContainer!: ViewContainerRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.loadJourneyPhase(this.questionTypeOne);
    this.cdr.detectChanges(); // Trigger change detection
  }

  loadJourneyPhase(component: any) {
    this.questionContainer.clear();
    const questionsRef = this.questionContainer.createComponent(component);
  }

  
  
}