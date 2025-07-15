import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'ui-section-number',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-number" [class]="getSectionClasses()">
      <div class="section-badge">
        <span class="section-number-text">{{ sectionNumber }}</span>
      </div>
      <div class="section-content">
        <h2 class="section-title" *ngIf="title">{{ title }}</h2>
        <p class="section-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
        <div class="section-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .section-number {
      @apply flex gap-6 mb-12 scroll-mt-24;
    }

    .section-badge {
      @apply flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg;
    }

    .section-number-text {
      @apply select-none;
    }

    .section-content {
      @apply flex-1 min-w-0;
    }

    .section-title {
      @apply text-2xl md:text-3xl font-bold mb-3 text-primary-800;
    }

    .section-subtitle {
      @apply text-lg text-secondary-600 mb-6 leading-relaxed;
    }

    .section-body {
      @apply prose prose-lg max-w-none;
    }

    /* Default variant */
    .section-default .section-badge {
      @apply bg-primary-green text-primary-white;
    }

    /* Primary variant */
    .section-primary .section-badge {
      @apply bg-primary-green text-primary-white shadow-lg;
    }

    /* Secondary variant */
    .section-secondary .section-badge {
      @apply bg-secondary-500 text-primary-white;
    }

    /* Outline variant */
    .section-outline .section-badge {
      @apply border-2 border-primary-green text-primary-green bg-primary-white;
    }

    /* Large size */
    .section-large {
      @apply gap-8 mb-16;
    }

    .section-large .section-badge {
      @apply w-16 h-16 text-xl;
    }

    .section-large .section-title {
      @apply text-3xl md:text-4xl;
    }

    /* Small size */
    .section-small {
      @apply gap-4 mb-8;
    }

    .section-small .section-badge {
      @apply w-10 h-10 text-base;
    }

    .section-small .section-title {
      @apply text-xl md:text-2xl;
    }

    /* Mobile responsiveness */
    @media (max-width: 640px) {
      .section-number {
        @apply flex-col gap-4;
      }

      .section-badge {
        @apply self-start;
      }

      .section-large {
        @apply gap-4;
      }
    }
  `]
})
export class SectionNumberComponent {
  @Input() sectionNumber!: number | string
  @Input() title?: string
  @Input() subtitle?: string
  @Input() variant: 'default' | 'primary' | 'secondary' | 'outline' = 'default'
  @Input() size: 'small' | 'default' | 'large' = 'default'

  getSectionClasses(): string {
    let classes = `section-${this.variant}`
    if (this.size !== 'default') {
      classes += ` section-${this.size}`
    }
    return classes
  }
}