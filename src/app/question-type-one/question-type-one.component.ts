import { Component } from '@angular/core';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'question-type-one',
  templateUrl: './question-type-one.component.html',
  styleUrl: './question-type-one.component.scss',
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

    trigger('questionStaggerAnimation', [
      transition(':enter', [
        query('.animation-element', [
          style({ opacity: 0, transform: 'translateX(100%)' }), // Move in from the right
          stagger('30ms ease-out', [
            animate('300ms ease-out', keyframes([
              style({ transform: 'translateX(100%)', opacity: 0, offset: 0 }), // Start position
              style({ transform: 'translateX(0)', opacity: 1, offset: 1 }) // End position
            ]))
          ])
        ], { optional: true })
      ]),
    ])


  ]
})
export class QuestionTypeOneComponent {
  
  sectionsArr: any[] = ['1', '2', '3', '4', '5'];
  demoQuestionArr: string[] = [];
  demoAnswerArr: { [key: number]: string } = {
    1: 'Vel eum iriure dolor',
    2: 'Iusto odio dignissim qui blandit',
    3: 'Oleifend option',
    4: 'Iusto odio dignissim',
    5: 'Suscipit lobortis nisl',
    6: 'Nam liber',
    7: 'Aliquip ex ea commodo consequat',
    8: 'Nonumy eirmod',
  };


  ngOnInit(): void {
    const length = Math.floor(Math.random() * (24 - 20 + 1)) + 20;
    
    for (let i = 1; i <= length; i++) {
      const randomKey = Math.floor(Math.random() * 8) + 1;
      this.demoQuestionArr.push(this.demoAnswerArr[randomKey]);
    }
  }
  
  adjustCommentHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  /*
  demoQuestionArr: any[] = [
    'Lastschrift',
    'Kreditkarte',
    'Debitkarte',
    'Rechnung',
    'Klarna',
    'PayPal',
    'Apple Pay',
    'Google Pay',
    'Amazon Pay'
  ];
  */


}
