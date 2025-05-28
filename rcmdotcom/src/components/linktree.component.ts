import { Component } from '@angular/core'

import { LinksComponent } from './links/links.component'
import { NavComponent } from "./nav.component";

@Component({
    selector: 'rcmdotcom-linktree',
    imports: [LinksComponent, NavComponent],
    template: `
    <main class="flex-1 mx-auto">
      <!-- <rcmdotcom-nav /> -->
      <rcmdotcom-links />
    </main>
  `
})
export class LinktreeComponent {}
