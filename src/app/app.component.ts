import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { QuestionTypeOneComponent } from './question-type-one/question-type-one.component';
import { TwoColumnLayoutComponent } from './components/two-column-layout/two-column-layout.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    
    /* old stagger animation
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
      state('false', style({ opacity: 0, })),
      state('true', style({ opacity: 1 })),
      transition('* <=> *', [
        animate('200ms ease-in')
      ])
    ]),
    */

    trigger('expandCollapse', [
      transition(':enter', [
        style({ height: '0' }),
        animate('200ms ease-out', style({ height: '*' }))
      ]),
      transition(':leave', [
        style({ height: '*' }),
        animate('200ms ease-in', style({ height: '0'}))
      ])
    ])



  ]
})

export class AppComponent {
  title = 'cjscore-fragebogen-demo';
  
  questionTypeOne = QuestionTypeOneComponent;

  @ViewChild('questionContainer', { read: ViewContainerRef }) questionContainer!: ViewContainerRef;

  @ViewChild(TwoColumnLayoutComponent) twoColumnLayoutComponent!: TwoColumnLayoutComponent;
  @ViewChild('scrollableQuestionContainer', { static: false }) scrollableQuestionContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.loadQuestion(this.questionTypeOne);
    this.cdr.detectChanges();
  }

  loadQuestion(component: any) {
    this.questionContainer.clear();
    const questionsRef = this.questionContainer.createComponent(component);
  }

  expanded: boolean = false;
  toggleCollapse(): void {
    this.expanded = !this.expanded;
    if (this.expanded) {
      window.addEventListener('scroll', this.onScroll);
    }
  }
  
  onScroll = (): void => {
    this.expanded = false;
    window.removeEventListener('scroll', this.onScroll);
  }


  scrollToTopQuestion(): void {
    this.scrollableQuestionContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToTopSection(): void {
    const snapPoint = this.twoColumnLayoutComponent?.scrollSnapPoint?.nativeElement.getBoundingClientRect().top;
    window.scrollBy(0, snapPoint);
  }
  
}