import {
    animate,
    group,
    keyframes,
    query,
    stagger,
    state,
    style,
    transition,
    trigger
  } from "@angular/animations";
  export const openMobileNav = trigger('openMobileNav', [
      state('closed', style({
        transform: 'scale(0) translateX(100%)',
        opacity: 0,
        display: 'none',
      })),
      state('opened', style({
        transform: 'scale(1) translateX(0)',
        opacity: 1,
        display: 'block',
      })),
      transition('closed => opened', [
        group([
          // Scale the container
          animate('500ms cubic-bezier(0,.75,.3,1)', keyframes([
            style({ transform: 'scaleX(0) scaleY(0)',display: 'block', opacity: 1, offset: 0 }),
            style({ transform: 'scaleX(0.3) scaleY(1)', offset: 0.7 }),
            style({ transform: 'scaleX(1) scaleY(1)', offset: 1.0 }),
          ])),
          // Fade in list items with stagger
          query('li', style({
            opacity: 0,
            transform: 'translateX(100%)'
          }), { optional: true }),
          query('li', stagger('100ms', [
            animate('500ms 100ms cubic-bezier(0,.75,.3,1)', style({
              opacity: 1,
              transform: 'translateX(0)'
            })) // Adding delay to match the scale timing
          ]), { optional: true })
        ])
      ]),
      transition('opened => closed', [
        group([
          // Scale the container back
          animate('200ms cubic-bezier(.30,0,1,1)', keyframes([
            style({ transform: 'scaleX(1) scaleY(1)', offset: 0 }),
            style({ transform: 'scaleX(0.3) scaleY(1)', offset: 0.7 }),
            style({ transform: 'scaleX(0) scaleY(0)', display: 'none', offset: 1.0 }),
          ])),
          // Fade out list items with stagger
          query('li', stagger('50ms', [
            animate('300ms cubic-bezier(0,.75,.3,1)', style({ 
              opacity: 0,
              transform: 'translateX(100%)'
            }))
          ]), { optional: true })
        ])
      ])
    ]);


  export const fade = trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }), // Start with opacity 0
        animate('100ms ease-in-out', style({ opacity: 1 })) // Animate to opacity 1
      ]),
      // Fade out
      transition(':leave', [
        animate('100ms ease-in-out', style({ opacity: 0 })) // Animate to opacity 0
      ])
    ]);
  