import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, fromEvent, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cjscore-fragebogen-demo';

  sectionIsOverflowing(): boolean {
    const sectionElement = this.section?.nativeElement;
    return !!sectionElement && sectionElement.scrollHeight > sectionElement.clientHeight;
  }
  //distinctUntilChanged(), // Only emit when direction changes


  @ViewChild('section', { static: false }) section?: ElementRef;
  private sectionElement = this.section?.nativeElement;
  private destroy$ = new Subject<void>();

  ngAfterViewInit(): void {
    // Listen to wheel events on the section element
    fromEvent<WheelEvent>(this.section?.nativeElement, 'wheel')
      .pipe(
        debounceTime(0), // Debounce the wheel event
        map((event) => this.getWheelDirection(event)), // Determine scroll direction
        distinctUntilChanged(), // Only emit when direction changes
        takeUntil(this.destroy$) // Unsubscribe when component is destroyed
      )
      .subscribe((direction) => {
        if (!this.sectionIsOverflowing()) {
          this.triggerAction(direction);
        }
      }
    );
    
    fromEvent<Event>(this.section?.nativeElement, 'scroll')
      .pipe(
        debounceTime(0), // Debounce the wheel event
        distinctUntilChanged(), // Only emit when direction changes
        takeUntil(this.destroy$) // Unsubscribe when component is destroyed
      )
      .subscribe((direction) => {
        if (this.sectionIsOverflowing()) {
          this.handleScroll(this.section?.nativeElement);
        }
      }
    );

  
  }

  private handleScroll(sectionElement: HTMLElement): void {
    // Content is overflowing, pause detection
    // Only check for top or bottom when user hits the edges
    if (sectionElement.scrollTop === 0) {
      // Top
      this.triggerAction('up');
    } else if (
      sectionElement.scrollHeight - sectionElement.scrollTop ===
      sectionElement.clientHeight
    ) {
      // Bottom
      this.triggerAction('down');
    }
  }
  


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getWheelDirection(event: WheelEvent): 'up' | 'down' {
    const deltaY = event.deltaY;
    if (deltaY > 0) {
      return 'down';
    } else if (deltaY < 0) {
      return 'up';
    }
    return 'up'; // Default direction
  }


  triggerAction(direction: 'up' | 'down'): void {
    // Replace with your desired functionality
    console.log('Scroll direction:', direction);
    // Example: Scroll to a specific element or load more content
  }







}
  