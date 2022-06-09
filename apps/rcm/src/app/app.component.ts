import { Component } from '@angular/core'

@Component({
  selector: 'ryancraigmartin-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  constructor() {}
}
