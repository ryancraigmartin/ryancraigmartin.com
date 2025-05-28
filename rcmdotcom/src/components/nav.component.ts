import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'rcmdotcom-nav',
  standalone: true,
  // imports: [RouterLink],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <a class="navbar-logo" href="/" >
          <img
            src="https://res.cloudinary.com/ryan-martin/image/upload/f_auto/q_auto/rcm-stamp"
            alt="Ryan Craig Martin Logo"
            width="150"
            height="40"
          />
        </a>
        <ul class="navbar-links">
          <!-- <li>
            <a
              routerLink="/"
              class="navbar-link"
              (mouseenter)="hoverLink($event)"
              (mouseleave)="resetLink($event)"
              >Home</a
            >
          </li>
          <li>
            <a
              routerLink="/about"
              class="navbar-link"
              (mouseenter)="hoverLink($event)"
              (mouseleave)="resetLink($event)"
              >About</a
            >
          </li>
          <li>
            <a
              routerLink="/blog"
              class="navbar-link"
              (mouseenter)="hoverLink($event)"
              (mouseleave)="resetLink($event)"
              >Blog</a
            >
          </li>
          <li>
            <a
              routerLink="/contact"
              class="navbar-link"
              (mouseenter)="hoverLink($event)"
              (mouseleave)="resetLink($event)"
              >Contact</a
            >
          </li> -->
        </ul>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        display: flex;
        justify-content: center;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 1000;
        transition: background-color 0.3s ease, box-shadow 0.3s ease;
      }

      .navbar-container {
        max-width: 1200px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .navbar-logo img {
        display: block;
        transition: transform 0.3s ease;
      }

      .navbar-logo img:hover {
        transform: scale(1.1);
      }

      .navbar-links {
        list-style: none;
        display: flex;
        gap: 1.5rem;
        margin: 0;
        padding: 0;
      }

      .navbar-link {
        text-decoration: none;
        font-size: 1rem;
        font-weight: 500;
        color: #333333;
        position: relative;
        transition: color 0.3s ease, transform 0.3s ease;
      }

      .navbar-link:hover {
        color: #4ca179;
        transform: translateY(-3px);
      }

      .navbar-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #4ca179;
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      .navbar-link:hover::after {
        transform: scaleX(1);
      }

      @media (max-width: 768px) {
        .navbar-links {
          flex-direction: column;
          gap: 1rem;
        }
      }
    `,
  ],
})
export class NavComponent {
  hoverLink(event: Event): void {
    const target = event.target as HTMLElement
    target.style.color = '#4ca179'
    target.style.transform = 'translateY(-3px)'
  }

  resetLink(event: Event): void {
    const target = event.target as HTMLElement
    target.style.color = '#333333'
    target.style.transform = 'translateY(0)'
  }
}
