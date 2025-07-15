import { Component } from '@angular/core'

import { LinktreeComponent } from '../../components/linktree.component'
import { FooterComponent } from '../../components/footer.component'

@Component({
    selector: 'rcmdotcom-home',
    imports: [LinktreeComponent, FooterComponent],
    template: `
    <div class="min-h-screen bg-gradient-primary">
      <rcmdotcom-linktree />
      <rcmdotcom-footer />
    </div>
  `
})
export default class HomeComponent {}
