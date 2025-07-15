import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [class]="buttonClasses"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
      type="button"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: []
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary'
  @Input() size: ButtonSize = 'md'
  @Input() disabled = false
  @Input() fullWidth = false
  @Output() onClick = new EventEmitter<Event>()

  get buttonClasses(): string {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus-ring disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantClasses = {
      primary: 'bg-primary-green text-primary-white hover:bg-primary-green-dark shadow-soft hover:shadow-medium',
      secondary: 'bg-primary-white text-primary-green border-2 border-primary-green hover:bg-primary-green hover:text-primary-white',
      ghost: 'text-primary-green hover:bg-primary-green hover:text-primary-white',
      outline: 'border border-primary-300 text-primary-700 hover:bg-primary-50'
    }

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }

    const widthClass = this.fullWidth ? 'w-full' : ''

    return [
      baseClasses,
      variantClasses[this.variant],
      sizeClasses[this.size],
      widthClass
    ].filter(Boolean).join(' ')
  }
}