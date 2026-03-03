import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PageLayoutComponent } from '../../components/page-layout.component'
import { CardComponent } from '../../components/ui/card.component'
import { BadgeComponent } from '../../components/ui/badge.component'

interface UsesCategory {
  title: string
  icon: string
  items: UsesItem[]
}

interface UsesItem {
  name: string
  description: string
  url?: string
  tags?: string[]
  featured?: boolean
}

@Component({
  standalone: true,
  imports: [CommonModule, PageLayoutComponent, CardComponent, BadgeComponent],
  template: `
    <app-page-layout 
      pageTitle="Uses"
      pageSubtitle="Tools, software, and hardware that power my daily workflow"
      [breadcrumbs]="breadcrumbs"
      seoTitle="Uses - Tools & Software"
      seoDescription="Discover the tools, software, and hardware that I use for development, design, and productivity."
      [seoKeywords]="['tools', 'software', 'hardware', 'development', 'productivity', 'workflow']"
    >
      <div class="container-main py-12">
        <div class="max-w-4xl mx-auto">
          <!-- Introduction -->
          <div class="text-center mb-12">
            <p class="text-lg text-secondary-600 leading-relaxed">
              Here's a comprehensive list of the tools, software, and hardware that I use to build products, 
              create content, and stay productive. This page is regularly updated as my setup evolves.
            </p>
          </div>

          <!-- Categories -->
          <div class="space-y-12">
            @for(category of categories; track category.title) {
            <section>
              <div class="flex items-center mb-6">
                <div class="w-8 h-8 mr-3 text-primary-green">
                  <div [innerHTML]="category.icon"></div>
                </div>
                <h2 class="text-2xl font-bold text-primary-800">{{ category.title }}</h2>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                @for(item of category.items; track item.name) {
                <ui-card [hover]="true" [class.ring-2]="item.featured" [class.ring-primary-green]="item.featured">
                  <div class="flex items-start justify-between mb-3">
                    <h3 class="font-semibold text-primary-800 text-lg">
                      @if(item.url) {
                      <a [href]="item.url" target="_blank" rel="noopener noreferrer" 
                         class="hover:text-primary-green transition-colors duration-300">
                        {{ item.name }}
                        <svg class="inline w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                      } @else {
                      {{ item.name }}
                      }
                    </h3>
                    @if(item.featured) {
                    <ui-badge variant="primary" size="sm">Featured</ui-badge>
                    }
                  </div>
                  
                  <p class="text-secondary-600 mb-4">{{ item.description }}</p>
                  
                  @if(item.tags && item.tags.length > 0) {
                  <div class="flex flex-wrap gap-2">
                    @for(tag of item.tags; track tag) {
                    <ui-badge variant="default" size="sm">{{ tag }}</ui-badge>
                    }
                  </div>
                  }
                </ui-card>
                }
              </div>
            </section>
            }
          </div>

          <!-- Update Notice -->
          <div class="mt-16">
            <ui-card class="text-center bg-primary-cream">
              <div class="flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-lg font-semibold text-primary-800">Last Updated</h3>
              </div>
              <p class="text-secondary-600">
                This page was last updated on <strong>{{ lastUpdated | date : 'longDate' }}</strong>. 
                If you have any questions about my setup or want to suggest something new, 
                feel free to <a href="mailto:contact@ryanmartin.io" class="text-primary-green hover:text-primary-green-dark">reach out</a>!
              </p>
            </ui-card>
          </div>
        </div>
      </div>
    </app-page-layout>
  `,
  styles: []
})
export default class UsesPage {
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Uses', url: '/uses' }
  ]

  lastUpdated = new Date('2025-01-15')

  categories: UsesCategory[] = [
    {
      title: 'Development Tools',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
      </svg>`,
      items: [
        {
          name: 'Visual Studio Code',
          description: 'My primary code editor with extensive customization through extensions and themes.',
          url: 'https://code.visualstudio.com/',
          tags: ['Editor', 'IDE'],
          featured: true
        },
        {
          name: 'Angular',
          description: 'Primary framework for building scalable web applications with TypeScript.',
          url: 'https://angular.dev/',
          tags: ['Framework', 'TypeScript', 'Frontend']
        },
        {
          name: 'Node.js',
          description: 'JavaScript runtime for backend development and tooling.',
          url: 'https://nodejs.org/',
          tags: ['Runtime', 'Backend', 'JavaScript']
        },
        {
          name: 'Git',
          description: 'Version control system for tracking changes and collaboration.',
          url: 'https://git-scm.com/',
          tags: ['Version Control', 'CLI']
        }
      ]
    },
    {
      title: 'Design & Productivity',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
      </svg>`,
      items: [
        {
          name: 'Figma',
          description: 'Collaborative design tool for creating interfaces, prototypes, and design systems.',
          url: 'https://figma.com/',
          tags: ['Design', 'Prototyping', 'Collaboration'],
          featured: true
        },
        {
          name: 'Notion',
          description: 'All-in-one workspace for notes, project management, and documentation.',
          url: 'https://notion.so/',
          tags: ['Productivity', 'Notes', 'Project Management']
        },
        {
          name: 'Linear',
          description: 'Issue tracking and project management built for modern software teams.',
          url: 'https://linear.app/',
          tags: ['Project Management', 'Issue Tracking']
        },
        {
          name: 'Raycast',
          description: 'Productivity tool that replaces Spotlight with powerful features and extensions.',
          url: 'https://raycast.com/',
          tags: ['Productivity', 'Launcher', 'macOS']
        }
      ]
    },
    {
      title: 'Hardware',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>`,
      items: [
        {
          name: 'MacBook Pro 16" M3 Max',
          description: 'Primary development machine with 36GB RAM and 1TB SSD for optimal performance.',
          tags: ['Laptop', 'Apple', 'Development'],
          featured: true
        },
        {
          name: 'Studio Display',
          description: '27-inch 5K Retina display for crisp visuals and extended screen real estate.',
          url: 'https://apple.com/studio-display/',
          tags: ['Monitor', 'Apple', '5K']
        },
        {
          name: 'Magic Keyboard',
          description: 'Wireless keyboard with numeric keypad for comfortable typing.',
          url: 'https://apple.com/magic-keyboard/',
          tags: ['Keyboard', 'Apple', 'Wireless']
        },
        {
          name: 'Magic Trackpad',
          description: 'Multi-touch trackpad for precise cursor control and gestures.',
          url: 'https://apple.com/magic-trackpad/',
          tags: ['Trackpad', 'Apple', 'Wireless']
        }
      ]
    },
    {
      title: 'Audio & Recording',
      icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-full h-full">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
      </svg>`,
      items: [
        {
          name: 'Shure SM7B',
          description: 'Professional dynamic microphone for podcasting and vocal recording.',
          url: 'https://www.shure.com/en-US/products/microphones/sm7b',
          tags: ['Microphone', 'Audio', 'Professional'],
          featured: true
        },
        {
          name: 'Focusrite Scarlett 2i2',
          description: 'USB audio interface for connecting professional microphones and instruments.',
          url: 'https://focusrite.com/en/usb-audio-interface/scarlett/scarlett-2i2',
          tags: ['Audio Interface', 'USB', 'Recording']
        },
        {
          name: 'Sony WH-1000XM4',
          description: 'Noise-canceling headphones for focused work and high-quality audio monitoring.',
          url: 'https://sony.com/electronics/headband-headphones/wh-1000xm4',
          tags: ['Headphones', 'Noise Canceling', 'Wireless']
        },
        {
          name: 'Logic Pro',
          description: 'Professional audio production software for music creation and podcast editing.',
          url: 'https://apple.com/logic-pro/',
          tags: ['DAW', 'Audio Editing', 'Music Production']
        }
      ]
    }
  ]
}