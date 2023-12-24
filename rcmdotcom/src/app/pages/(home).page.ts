import { Component } from '@angular/core'

import { LinktreeComponent } from '../../components/linktree.component'
import { FooterComponent } from '../../components/footer.component'

@Component({
  selector: 'rcmdotcom-home',
  standalone: true,
  imports: [LinktreeComponent, FooterComponent],
  template: `
    <rcmdotcom-linktree />
    <rcmdotcom-footer />
  `,
})
export default class HomeComponent {}
