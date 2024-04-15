import { Component } from '@angular/core';
import { animate, keyframes, query, stagger, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'question-type-two',
  templateUrl: './question-type-two.component.html',
  styleUrl: './question-type-two.component.scss',
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
export class QuestionTypeTwoComponent {
  
  sectionsArr: any[] = ['1', '2', '3', '4', '5'];

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


}
