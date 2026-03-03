import { CommonModule } from '@angular/common'
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { ButtonComponent } from './button.component'

@Component({
  selector: 'ui-action-module',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="action-module" [class]="getModuleClasses()">
      <div class="action-module-icon" *ngIf="icon">
        <div class="icon-wrapper">
          <ng-content select="[slot=icon]"></ng-content>
        </div>
      </div>
      
      <div class="action-module-content">
        <h3 class="action-module-title" *ngIf="title">{{ title }}</h3>
        <div class="action-module-description" *ngIf="description">{{ description }}</div>
        <div class="action-module-body">
          <ng-content></ng-content>
        </div>
        
        <div class="action-module-footer" *ngIf="ctaText || hasFooterContent">
          <ng-content select="[slot=footer]"></ng-content>
          <ui-button 
            *ngIf="ctaText"
            [variant]="ctaVariant"
            [size]="ctaSize"
            (onClick)="onCtaClick()"
            class="mt-4"
          >
            {{ ctaText }}
            <svg 
              *ngIf="showCtaArrow" 
              class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7 7 7-7 7"></path>
            </svg>
          </ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .action-module {
      @apply rounded-xl border p-6 transition-all duration-200 hover:shadow-medium;
    }

    .action-module-icon .icon-wrapper {
      @apply w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-4;
    }

    .action-module-title {
      @apply text-xl font-bold mb-2;
    }

    .action-module-description {
      @apply text-secondary-600 mb-4;
    }

    .action-module-body {
      @apply mb-4;
    }

    .action-module-footer {
      @apply flex flex-col;
    }

    /* Default variant */
    .action-module-default {
      @apply bg-primary-white border-primary-300;
    }
    .action-module-default .action-module-title {
      @apply text-primary-800;
    }
    .action-module-default .icon-wrapper {
      @apply bg-primary-green/10 text-primary-green;
    }

    /* Primary variant */
    .action-module-primary {
      @apply bg-primary-green/5 border-primary-green/20;
    }
    .action-module-primary .action-module-title {
      @apply text-primary-green-dark;
    }
    .action-module-primary .icon-wrapper {
      @apply bg-primary-green text-primary-white;
    }

    /* Secondary variant */
    .action-module-secondary {
      @apply bg-secondary-50 border-secondary-200;
    }
    .action-module-secondary .action-module-title {
      @apply text-secondary-800;
    }
    .action-module-secondary .icon-wrapper {
      @apply bg-secondary-500 text-primary-white;
    }

    /* Info variant */
    .action-module-info {
      @apply bg-info-50 border-info-200;
    }
    .action-module-info .action-module-title {
      @apply text-info-800;
    }
    .action-module-info .icon-wrapper {
      @apply bg-info-500 text-primary-white;
    }

    /* Success variant */
    .action-module-success {
      @apply bg-success-50 border-success-200;
    }
    .action-module-success .action-module-title {
      @apply text-success-800;
    }
    .action-module-success .icon-wrapper {
      @apply bg-success-500 text-primary-white;
    }

    /* Compact size */
    .action-module-compact {
      @apply p-4;
    }
    .action-module-compact .action-module-title {
      @apply text-lg;
    }
    .action-module-compact .icon-wrapper {
      @apply w-10 h-10 text-lg mb-3;
    }

    /* Large size */
    .action-module-large {
      @apply p-8;
    }
    .action-module-large .action-module-title {
      @apply text-2xl;
    }
    .action-module-large .icon-wrapper {
      @apply w-16 h-16 text-2xl mb-6;
    }
  `]
})
export class ActionModuleComponent {
  @Input() variant: 'default' | 'primary' | 'secondary' | 'info' | 'success' = 'default'
  @Input() size: 'compact' | 'default' | 'large' = 'default'
  @Input() icon = false
  @Input() title?: string
  @Input() description?: string
  @Input() ctaText?: string
  @Input() ctaVariant: 'primary' | 'secondary' | 'ghost' = 'primary'
  @Input() ctaSize: 'sm' | 'md' | 'lg' = 'md'
  @Input() showCtaArrow = true
  @Input() hasFooterContent = false

  @Output() ctaClick = new EventEmitter<void>()

  getModuleClasses(): string {
    let classes = `action-module-${this.variant}`
    if (this.size !== 'default') {
      classes += ` action-module-${this.size}`
    }
    return classes
  }

  onCtaClick(): void {
    this.ctaClick.emit()
  }
}