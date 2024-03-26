import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, filter, fromEvent, map, retryWhen, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cjscore-fragebogen-demo';

  //distinctUntilChanged(), // Only emit when direction changes


  @ViewChild('section', { static: false }) section?: ElementRef;
  private destroy$ = new Subject<void>();
  private scrollReachedEdge:boolean = false;
  

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    fromEvent<WheelEvent>(this.section?.nativeElement, 'wheel')
      .pipe(
        map((event) => this.getWheelDirection(event)),
        filter((direction) => {
          if (!this.sectionIsOverflowing()) {
            return true;
          } else if (this.sectionIsOverflowing()) {
            const scrollStatus = this.scrollStatus(this.section?.nativeElement);
            return (scrollStatus === 'up' && direction === 'up') || (scrollStatus === 'down' && direction === 'down');
          }
          return false;
        }),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((direction) => {
        this.triggerAction(direction);
      });
  }

  sectionIsOverflowing(): boolean {
    const sectionElement = this.section?.nativeElement;
    return sectionElement && sectionElement.scrollHeight > sectionElement.clientHeight;
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
  }


}
  