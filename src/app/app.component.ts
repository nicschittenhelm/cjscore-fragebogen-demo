import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, filter, fromEvent, map, retryWhen, takeUntil, throttleTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cjscore-fragebogen-demo';

  @ViewChild('section', { static: false }) section?: ElementRef;
  @ViewChildren('section') sectionElements?: QueryList<ElementRef>;
  private destroy$ = new Subject<void>();
  private scrollReachedEdge:boolean = false;
  currentSectionIndex = 0;
  sectionsArr: any[] = ['magna', 'ipsum', 'dolor', 'sit', 'amet'];
  //*ngIf="i === currentSectionIndex"

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewChecked(): void {
    
    this.sectionElements?.forEach((element, index) => {
      //const sectionElement = this.sectionElements?.toArray()[index]?.nativeElement;
      const sectionElement = element.nativeElement

      if (!sectionElement.wheelListenerAdded) {
        fromEvent<WheelEvent>(sectionElement, 'wheel')
          .pipe(
            map((event) => this.getWheelDirection(event)),
            filter((direction) => {
              if (!this.sectionIsOverflowing(sectionElement)) {
                return true;
              } else if (this.sectionIsOverflowing(sectionElement)) {
                const scrollStatus = this.scrollStatus(sectionElement);
                return (scrollStatus === 'up' && direction === 'up') || (scrollStatus === 'down' && direction === 'down');
              }
              return false;
            }),
            throttleTime(200), // Add a 200ms timeout
            debounceTime(0), // Add a short delay (adjust the time as needed)
            distinctUntilChanged(),
            takeUntil(this.destroy$)
            )
            .subscribe((direction) => {
              this.triggerAction(direction);
            });
        // Mark the section as having the wheel listener added
        sectionElement.wheelListenerAdded = true;
      }
    });
  }

  sectionIsOverflowing(sectionElement: HTMLElement): boolean {
    return sectionElement.scrollHeight > sectionElement.clientHeight;
  }

  private scrollStatus(sectionElement: HTMLElement) {
    if (sectionElement.scrollTop === 0) {
      // Top
      this.scrollReachedEdge = true;
      return('up');
    } else if (
      sectionElement.scrollHeight - sectionElement.scrollTop ===
      sectionElement.clientHeight
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
    console.log('Scroll direction:', direction);
    console.log('Current section index:', this.currentSectionIndex);
    
    if (direction === 'up' && this.currentSectionIndex > 0) {
      this.currentSectionIndex--; // Move to the previous section if available
    } else if (direction === 'down' && this.currentSectionIndex < this.sectionsArr.length - 1) {
      this.currentSectionIndex++; // Move to the next section if available
    }
    console.log('New section index:', this.currentSectionIndex);
    
  }


}
  