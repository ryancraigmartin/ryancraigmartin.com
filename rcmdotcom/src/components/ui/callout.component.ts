import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'

export type CalloutVariant = 'info' | 'success' | 'warning' | 'error' | 'tip' | 'note'

@Component({
  selector: 'ui-callout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="callout"
      [class]="getCalloutClasses()"
    >
      <div class="callout-icon">
        <ng-container [ngSwitch]="variant">
          <!-- Info Icon -->
          <svg *ngSwitchCase="'info'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <!-- Success Icon -->
          <svg *ngSwitchCase="'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <!-- Warning Icon -->
          <svg *ngSwitchCase="'warning'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <!-- Error Icon -->
          <svg *ngSwitchCase="'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <!-- Tip Icon -->
          <svg *ngSwitchCase="'tip'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          <!-- Note Icon -->
          <svg *ngSwitchCase="'note'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </ng-container>
      </div>
      <div class="callout-content">
        <div class="callout-title" *ngIf="title">{{ title }}</div>
        <div class="callout-body">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .callout {
      @apply flex gap-3 p-4 rounded-lg border-l-4 mb-6;
    }

    .callout-icon {
      @apply flex-shrink-0 flex items-start pt-0.5;
    }

    .callout-content {
      @apply flex-1 min-w-0;
    }

    .callout-title {
      @apply font-semibold text-sm uppercase tracking-wide mb-2;
    }

    .callout-body {
      @apply text-sm leading-relaxed;
    }

    /* Info variant */
    .callout-info {
      @apply bg-info-50 border-info-500 text-info-700;
    }
    .callout-info .callout-icon {
      @apply text-info-500;
    }
    .callout-info .callout-title {
      @apply text-info-600;
    }

    /* Success variant */
    .callout-success {
      @apply bg-success-50 border-success-500 text-success-700;
    }
    .callout-success .callout-icon {
      @apply text-success-500;
    }
    .callout-success .callout-title {
      @apply text-success-600;
    }

    /* Warning variant */
    .callout-warning {
      @apply bg-warning-50 border-warning-500 text-warning-700;
    }
    .callout-warning .callout-icon {
      @apply text-warning-500;
    }
    .callout-warning .callout-title {
      @apply text-warning-600;
    }

    /* Error variant */
    .callout-error {
      @apply bg-error-50 border-error-500 text-error-700;
    }
    .callout-error .callout-icon {
      @apply text-error-500;
    }
    .callout-error .callout-title {
      @apply text-error-600;
    }

    /* Tip variant */
    .callout-tip {
      @apply bg-primary-green/10 border-primary-green text-primary-800;
    }
    .callout-tip .callout-icon {
      @apply text-primary-green;
    }
    .callout-tip .callout-title {
      @apply text-primary-green-dark;
    }

    /* Note variant */
    .callout-note {
      @apply bg-secondary-50 border-secondary-400 text-secondary-700;
    }
    .callout-note .callout-icon {
      @apply text-secondary-500;
    }
    .callout-note .callout-title {
      @apply text-secondary-600;
    }
  `]
})
export class CalloutComponent {
  @Input() variant: CalloutVariant = 'info'
  @Input() title?: string

  getCalloutClasses(): string {
    return `callout-${this.variant}`
  }
}