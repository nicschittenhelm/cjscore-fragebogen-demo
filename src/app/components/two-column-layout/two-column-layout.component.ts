import { animate, query, style, transition, trigger } from '@angular/animations';
import { HostBinding, Component, ElementRef, Input, OnChanges, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'two-column-layout',
  templateUrl: './two-column-layout.component.html',
  styleUrl: './two-column-layout.component.scss'
})
export class TwoColumnLayoutComponent {

  @ViewChild('scrollSnapPoint') scrollSnapPoint!: ElementRef;

  scrollToTop(): void {
    this.scrollSnapPoint.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  ngAfterViewInit(): void {
    this.scrollToTop
  }

}
