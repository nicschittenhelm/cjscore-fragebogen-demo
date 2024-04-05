import { Directive, ElementRef } from '@angular/core';
import { defer, Observable, shareReplay } from 'rxjs';

@Directive({
  exportAs: 'IsInViewport',
  selector: '[appIsInViewport]'
})
export class IsInViewportDirective {

  public readonly isOnScreen$: Observable<boolean>;

  constructor(private readonly _elementRef: ElementRef) {
    this.isOnScreen$ = defer(() => {
      return this.getIsOnScreen$(this._elementRef.nativeElement);
    }).pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true,
      }),
    );
  }

  private getIsOnScreen$(element: Element): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          // Determine if the center of the element is in the viewport
          const intersectionRatio = entries[0].intersectionRatio;
          subscriber.next(intersectionRatio >= 0.5);
        },
        {
          threshold: 0.5, // Trigger when at least 50% of the element is visible
        }
      );
  
      intersectionObserver.observe(element);
  
      return () => {
        intersectionObserver.disconnect();
      };
    });
  }

  
}