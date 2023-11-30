import { Component } from '@angular/core';

import { LinktreeComponent } from './analog-welcome.component';

@Component({
  selector: 'rcmdotcom-home',
  standalone: true,
  imports: [LinktreeComponent],
  template: ` <rcmdotcom-analog-welcome /> `,
})
export default class HomeComponent {}
