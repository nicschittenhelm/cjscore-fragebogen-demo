import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cjscore-fragebogen-demo';

  @ViewChildren('sections') sections!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.sections.forEach((section, index) => {
      const nativeElement = section.nativeElement;
      nativeElement.addEventListener('scroll', () => this.handleScroll(nativeElement, index));
    });
  }

  handleScroll(element: HTMLElement, index: number): void {
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.scrollToNextSection(index);
    }
  }

  scrollToNextSection(currentIndex: number): void {
    const nextSection = this.sections.toArray()[currentIndex + 1];
    if (nextSection) {
      nextSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}