import { Component, Input, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { Meta, Title } from '@angular/platform-browser'

import { NavComponent } from './nav.component'
import { FooterComponent } from './footer.component'
import { ButtonComponent } from './ui/button.component'
import { CardComponent } from './ui/card.component'

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, NavComponent, FooterComponent, ButtonComponent, CardComponent],
  template: `
    <div class="min-h-screen bg-gradient-primary">
      <!-- Navigation -->
      <nav class="sticky top-0 z-50 bg-primary-white/80 backdrop-blur-md border-b border-primary-200">
        <div class="container-main">
          <div class="flex items-center justify-between py-4">
            <a routerLink="/" class="flex items-center space-x-2">
              <img
                src="https://res.cloudinary.com/ryan-martin/image/upload/f_auto/q_auto/rcm-stamp"
                alt="Ryan Craig Martin Logo"
                width="120"
                height="32"
                class="transition-transform duration-300 hover:scale-105"
              />
            </a>
            
            <div class="hidden md:flex items-center space-x-8">
              <a routerLink="/" class="nav-link">Home</a>
              <a routerLink="/blog" class="nav-link">Blog</a>
              <a routerLink="/uses" class="nav-link">Uses</a>
              <a routerLink="/about" class="nav-link">About</a>
              <a routerLink="/contact" class="nav-link">Contact</a>
            </div>

            <!-- Mobile menu button -->
            <button class="md:hidden p-2" (click)="toggleMobileMenu()">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          <!-- Mobile menu -->
          <div class="md:hidden" [class.hidden]="!showMobileMenu">
            <div class="py-4 space-y-2 border-t border-primary-200">
              <a routerLink="/" class="block nav-link" (click)="closeMobileMenu()">Home</a>
              <a routerLink="/blog" class="block nav-link" (click)="closeMobileMenu()">Blog</a>
              <a routerLink="/uses" class="block nav-link" (click)="closeMobileMenu()">Uses</a>
              <a routerLink="/about" class="block nav-link" (click)="closeMobileMenu()">About</a>
              <a routerLink="/contact" class="block nav-link" (click)="closeMobileMenu()">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Header -->
      @if(showHeader) {
      <header class="relative py-16 overflow-hidden">
        @if(backgroundImage) {
        <div class="absolute inset-0">
          <img [src]="backgroundImage" [alt]="pageTitle" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
        </div>
        }
        
        <div class="container-main relative">
          <div class="text-center">
            @if(breadcrumbs && breadcrumbs.length > 0) {
            <nav class="mb-4">
              <ol class="flex items-center justify-center space-x-2 text-sm">
                @for(breadcrumb of breadcrumbs; track breadcrumb.label; let isLast = $last) {
                <li class="flex items-center">
                  @if(!isLast) {
                  <a [routerLink]="breadcrumb.url" class="text-primary-green hover:text-primary-green-dark">
                    {{ breadcrumb.label }}
                  </a>
                  <span class="mx-2 text-secondary-400">/</span>
                  } @else {
                  <span class="text-secondary-600">{{ breadcrumb.label }}</span>
                  }
                </li>
                }
              </ol>
            </nav>
            }
            
            <h1 [class]="titleClass">{{ pageTitle }}</h1>
            @if(pageSubtitle) {
            <p class="text-xl text-secondary-600 mt-4 max-w-2xl mx-auto text-balance">{{ pageSubtitle }}</p>
            }
          </div>
        </div>
      </header>
      }

      <!-- Main Content -->
      <main class="flex-1">
        <ng-content></ng-content>
      </main>

      <!-- Footer -->
      <rcmdotcom-footer />
    </div>
  `,
  styles: [
    `
      .nav-link {
        @apply text-primary-700 hover:text-primary-green transition-colors duration-300 font-medium;
      }

      .nav-link:hover {
        @apply text-primary-green;
      }
    `
  ]
})
export class PageLayoutComponent implements OnInit {
  @Input() pageTitle = ''
  @Input() pageSubtitle = ''
  @Input() showHeader = true
  @Input() backgroundImage = ''
  @Input() breadcrumbs: { label: string; url: string }[] = []
  @Input() seoTitle = ''
  @Input() seoDescription = ''
  @Input() seoKeywords: string[] = []

  private meta = inject(Meta)
  private title = inject(Title)
  
  showMobileMenu = false
  
  get titleClass(): string {
    const baseClass = 'font-bold text-primary-800 mb-4'
    return this.backgroundImage 
      ? `${baseClass} text-4xl md:text-5xl text-primary-white`
      : `${baseClass} text-3xl md:text-4xl`
  }

  ngOnInit(): void {
    this.updateSEO()
  }

  private updateSEO(): void {
    const title = this.seoTitle || this.pageTitle
    const description = this.seoDescription || `${this.pageTitle} - Ryan Craig Martin`

    this.title.setTitle(title ? `${title} | Ryan Craig Martin` : 'Ryan Craig Martin')
    this.meta.updateTag({ name: 'description', content: description })
    
    if (this.seoKeywords.length > 0) {
      this.meta.updateTag({ name: 'keywords', content: this.seoKeywords.join(', ') })
    }

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: title })
    this.meta.updateTag({ property: 'og:description', content: description })
    this.meta.updateTag({ property: 'og:type', content: 'website' })

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:title', content: title })
    this.meta.updateTag({ name: 'twitter:description', content: description })
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' })
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu
  }

  closeMobileMenu(): void {
    this.showMobileMenu = false
  }
}