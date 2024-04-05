import { animate, animateChild, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IsInViewportDirective } from './is-in-viewport.directive';
import { debounceTime } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
  

    trigger('scrollAnimation', [
      transition(':enter', [
        query('.animation-element', [
          style({ opacity: 0, transform: 'translateZ(0) rotateX(-90deg)', transformOrigin: 'center' }),
          stagger('70ms', [
            animate('400ms cubic-bezier(.8, 0, 0.2, 3.5)', keyframes([
              style({ transform: 'translateZ(0) rotateX(-90deg)', opacity: 0, offset: 0 }),
              style({ transform: 'translateZ(0) rotateX(-22.5deg)', opacity: 1, offset: 0.25 }),
              style({ transform: 'translateZ(0) rotateX(0deg)', offset: 1 })
          ]))
          ])
        ], { optional: true })
      ]),
      transition(':leave', [
        query('.animation-element', [
            animate('100ms', style({ opacity: 0 }))
        ], { optional: true })
      ])
    ])
    

  ]
})

export class AppComponent {
  title = 'cjscore-fragebogen-demo';
  sectionsArr: any[] = ['1', '2', '3', '4', '5'];
 
}