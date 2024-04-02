import { animate, query, stagger, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subject, debounceTime, filter, fromEvent, map, takeUntil, throttleTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [


    trigger('fade', [
      transition(':enter', [
        style({ transform: 'translateY(100%) scaleY(0%)', opacity: 0 }),
        animate('500ms 100ms ease-out', style({ transform: 'translateY(0) scaleY(100%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateY(-100%) scaleY(0%)', opacity: 0 }))
      ])
    ]),


    trigger('stagger', [
      transition(':enter', [ // when the section enters
        style({ opacity: 0 }),
        animate('0ms', style({ opacity: 1 })),
        // Staggered animation for all child elements
        query('*', [
          style({ opacity: 0, transform: 'translateY(100vh)' }),
          stagger('20ms', [
            animate('1000ms', style({ opacity: 1, transform: 'none' })),
          ])
        ], { optional: true }) // 'optional: true' is used in case there are no child elements
      ]),
  
      transition(':leave', [ // when the section leaves
        // Staggered leave animation for all child elements
        query('*', [
          stagger('20ms', [
            animate('1000ms', style({ opacity: 0, transform: 'translateY(-100vh)' })),
          ])
        ], { optional: true }),
        animate('0ms', style({ opacity: 0 }))
      ])
    ]),



  ]
})
export class AppComponent {
  title = 'cjscore-fragebogen-demo';

  @ViewChild('sectionContainer', { static: false }) sectionContainer?: ElementRef;
  private destroy$ = new Subject<void>();
  private scrollReachedEdge:boolean = false;
  currentSectionIndex = 0;
  sectionsArr: any[] = ['1', '2', '3', '4', '5'];
  private lastScrollDirection: 'up' | 'down' | null = null;
  private lastScrollTime: number = 0;
  overflowEnabled = true;

  onAnimationStart(event: AnimationEvent): void {
    if (event.toState === ':enter' || event.toState === ':leave') {
      this.overflowEnabled = false;
    }
  }

  onAnimationEnd(event: AnimationEvent): void {
    if (event.toState === ':enter' || event.toState === ':leave') {
      this.overflowEnabled = true;
    }
  }

  ngAfterViewInit(): void {

    const sectionContainer = this.sectionContainer?.nativeElement;
    sectionContainer.scrollTop = 0;


    fromEvent<WheelEvent>(sectionContainer, 'wheel')
      .pipe(
        map((event) => this.getWheelDirection(event)),
        filter((direction) => {  
          if (!this.isOverflowing(sectionContainer)) {
            return true;
          } else if (this.isOverflowing(sectionContainer)) {
            const scrollStatus = this.scrollStatus(sectionContainer);
            return (scrollStatus === 'up' && direction === 'up') || (scrollStatus === 'down' && direction === 'down');
          }
          return false;
        }),
        throttleTime(1000), 
        debounceTime(0),
        takeUntil(this.destroy$)
        )
        .subscribe((direction) => {

          const currentTime = Date.now();

          if (this.lastScrollDirection === direction && (currentTime - this.lastScrollTime) > 1000) {
            // If the direction is the same and the attempt is within 1 second, trigger the action
            sectionContainer.scrollTop = 0;
            this.triggerAction(direction);
          } else {
            // Update the last scroll direction and time
            this.lastScrollDirection = direction;
            this.lastScrollTime = currentTime;
          }

        });


  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  isOverflowing(sectionContainer: HTMLElement): boolean {
    return sectionContainer.scrollHeight > sectionContainer.clientHeight;
  }

  private scrollStatus(sectionContainer: HTMLElement) {
    if (sectionContainer.scrollTop === 0) {
      // Top
      this.scrollReachedEdge = true;
      return('up');
    } else if (
      sectionContainer.scrollHeight - sectionContainer.scrollTop ===
      sectionContainer.clientHeight
    ) {
      // Bottom
      this.scrollReachedEdge = true;
      return('down');
    } else {
      // Content
      this.scrollReachedEdge = false;
      return('content');
    }
  }

  private getWheelDirection(event: WheelEvent): 'up' | 'down' {
    return event.deltaY > 0 ? 'down' : 'up';
  }

  triggerAction(direction: 'up' | 'down'): void {
    console.log('Current section index:', this.currentSectionIndex);
    if (direction === 'up' && this.currentSectionIndex > 0) {
      this.currentSectionIndex--; // Move to the previous section if available
    } else if (direction === 'down' && this.currentSectionIndex < this.sectionsArr.length - 1) {
      this.currentSectionIndex++; // Move to the next section if available
    }
    console.log('New section index:', this.currentSectionIndex);

  }


}
  