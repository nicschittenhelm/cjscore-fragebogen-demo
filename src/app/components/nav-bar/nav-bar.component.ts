import { Component } from '@angular/core';
import { openMobileNav, fade } from './nav-bar.animation';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  animations: [openMobileNav, fade]
})


export class NavBarComponent {

  isOpened = false; // Use boolean flag

  constructor() {}


  toggleState() {
    this.isOpened = !this.isOpened; // Toggle the boolean value
  }

}
