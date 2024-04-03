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
          // Sometimes entries receive multiple entries
          // Last one is correct
          subscriber.next(entries[entries.length - 1].isIntersecting);
        },
        {
          threshold: 1,
        },
      );

      intersectionObserver.observe(element);

      return () => {
        intersectionObserver.disconnect();
      };
    });
  }

}
