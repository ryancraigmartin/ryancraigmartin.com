import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
// import NavBar from '../components/navbar/navbar.component'

@Component({
  selector: 'rcmdotcom-root',
  standalone: true,
  // imports: [NavBar, RouterOutlet],
  imports: [RouterOutlet],
  template: `
    <!-- <app-nav-bar /> -->
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
