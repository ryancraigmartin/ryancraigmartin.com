import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
export type BadgeSize = 'sm' | 'md' | 'lg'

@Component({
  selector: 'ui-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses">
      <ng-content></ng-content>
    </span>
  `,
  styles: []
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default'
  @Input() size: BadgeSize = 'md'

  get badgeClasses(): string {
    const baseClasses = 'inline-flex items-center font-medium rounded-full transition-all duration-300'

    const variantClasses = {
      default: 'bg-primary-alabaster text-secondary-700',
      primary: 'bg-primary-green text-primary-white',
      secondary: 'bg-secondary-100 text-secondary-700',
      success: 'bg-success-50 text-success-700',
      warning: 'bg-warning-50 text-warning-700',
      error: 'bg-error-50 text-error-700'
    }

    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base'
    }

    return [
      baseClasses,
      variantClasses[this.variant],
      sizeClasses[this.size]
    ].filter(Boolean).join(' ')
  }
}