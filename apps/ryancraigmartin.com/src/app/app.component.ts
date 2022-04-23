import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { Router } from '@angular/router'

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
  constructor(private http: HttpClient, private router: Router) {}
}
