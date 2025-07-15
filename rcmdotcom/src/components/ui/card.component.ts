import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() hover = false
  @Input() padding = true
  @Input() shadow = true

  get cardClasses(): string {
    const baseClasses = 'bg-primary-white rounded-xl border border-primary-200 overflow-hidden'
    const hoverClasses = this.hover ? 'transition-all duration-300 hover:shadow-medium hover:scale-105 cursor-pointer' : ''
    const paddingClasses = this.padding ? 'p-6' : ''
    const shadowClasses = this.shadow ? 'shadow-soft' : ''

    return [baseClasses, hoverClasses, paddingClasses, shadowClasses]
      .filter(Boolean)
      .join(' ')
  }
}