import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import './navbar.component.css'

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-nav-bar',
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a class="navbar-brand" [routerLink]="['/']">My Blog</a>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/']">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/blog']">Blog</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/about']">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" [routerLink]="['/contact']">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  `,
})
export default class NavBar {}