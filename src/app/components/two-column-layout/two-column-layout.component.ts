import { animate, query, style, transition, trigger } from '@angular/animations';
import { HostBinding, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'two-column-layout',
  templateUrl: './two-column-layout.component.html',
  styleUrl: './two-column-layout.component.scss',
  animations: [
    
    trigger('heightChange', [
      transition('* => *', [
        query(':enter, :leave', [
          style({ opacity: 0, height: '{{startHeight}}px' }), // Set initial height
          animate('300ms ease-out', style({ opacity: 1, height: '{{endHeight}}px' })) // Animate to new height
        ], { optional: true })
      ], { params: { startHeight: 0, endHeight: 0 } }) // Define parameters for start and end height
    ])


  ]
})
export class TwoColumnLayoutComponent {



}
