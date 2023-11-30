import { LinksComponent } from '../links/links.component'
import { Component } from '@angular/core'

@Component({
  selector: 'rcmdotcom-linktree',
  standalone: true,
  imports: [LinksComponent],
  template: `
    <main class="flex-1 mx-auto">
      <rcmdotcom-links />
    </main>
  `,
})
export class LinktreeComponent {}
