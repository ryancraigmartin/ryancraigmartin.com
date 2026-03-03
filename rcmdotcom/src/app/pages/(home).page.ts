import { Component, inject, OnInit } from '@angular/core'

import { LinktreeComponent } from '../../components/linktree.component'
import { FooterComponent } from '../../components/footer.component'
import { StructuredDataService } from '../services/structured-data.service'

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
export default class HomeComponent implements OnInit {
  private structuredDataService = inject(StructuredDataService)

  ngOnInit(): void {
    this.structuredDataService.addWebsiteSchema()
    this.structuredDataService.addPersonSchema()
  }
}
