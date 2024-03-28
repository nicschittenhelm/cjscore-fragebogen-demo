import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, filter, fromEvent, map, retryWhen, takeUntil, throttleTime } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cjscore-fragebogen-demo';

  @ViewChild('sectionContainer', { static: false }) sectionContainer?: ElementRef;
  //@ViewChildren('section') sectionContainers?: QueryList<ElementRef>;
  private destroy$ = new Subject<void>();
  private scrollReachedEdge:boolean = false;
  currentSectionIndex = 0;
  sectionsArr: any[] = ['1', '2', '3', '4', '5'];
  //*ngIf="i === currentSectionIndex"

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



  ngAfterViewInit(): void {

    const sectionContainer = this.sectionContainer?.nativeElement;

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
        throttleTime(300), 
        debounceTime(0),
        takeUntil(this.destroy$)
        )
        .subscribe((direction) => {
          this.triggerAction(direction);
        });

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
  