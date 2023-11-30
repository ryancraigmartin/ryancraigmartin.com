import { Component } from '@angular/core';

import { LinktreeComponent } from './linktree.component';

@Component({
  selector: 'rcmdotcom-home',
  standalone: true,
  imports: [LinktreeComponent],
  template: ` <rcmdotcom-linktree /> `,
})
export default class HomeComponent {}
