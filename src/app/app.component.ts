import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IsInViewportDirective } from './is-in-viewport.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    

    
    trigger('fadeInOut', [
      transition(':enter', [
        query('.animation-element', [
          
          style({ opacity: 0 }),
          stagger('50ms', [
            animate('100ms', style({ opacity: 1 }))
          ])

        ], { optional: true })
      ]),

      transition(':leave', [
        query('.animation-element', [
          
          stagger('50ms', [
            animate('100ms', style({ opacity: 0 }))
          ])

        ], { optional: true })
      ])

    ]),
    


  ]
})

export class AppComponent {
  title = 'cjscore-fragebogen-demo';
  sectionsArr: any[] = ['1', '2', '3', '4', '5'];

  test() {
    console.log('test')
  }

}