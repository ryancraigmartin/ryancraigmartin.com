import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { Router } from '@angular/router'
// import { Message } from '@ryancraigmartin/api-interfaces'

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
  // hello$ = this.http.get<Message>('/api/hello')
  constructor(private http: HttpClient, private router: Router) {}
}
