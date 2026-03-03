import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="relative">
      <input
        [class]="inputClasses"
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      />
      <div *ngIf="icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
        <ng-content select="[slot=icon]"></ng-content>
      </div>
    </div>
  `,
  styles: []
})
export class InputComponent implements ControlValueAccessor {
  @Input() type = 'text'
  @Input() placeholder = ''
  @Input() disabled = false
  @Input() icon = false
  @Input() size: 'sm' | 'md' | 'lg' = 'md'
  @Output() inputChange = new EventEmitter<string>()
  @Output() inputFocus = new EventEmitter<void>()
  @Output() inputBlur = new EventEmitter<void>()

  value = ''
  onChange = (value: string) => {}
  onTouched = () => {}

  get inputClasses(): string {
    const baseClasses = 'w-full border border-primary-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-primary-green focus:border-primary-green focus:outline-none'
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg'
    }

    const iconClasses = this.icon ? 'pl-10' : ''
    const disabledClasses = this.disabled ? 'opacity-50 cursor-not-allowed' : ''

    return [
      baseClasses,
      sizeClasses[this.size],
      iconClasses,
      disabledClasses
    ].filter(Boolean).join(' ')
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement
    this.value = target.value
    this.onChange(this.value)
    this.inputChange.emit(this.value)
  }

  onFocus(): void {
    this.inputFocus.emit()
  }

  onBlur(): void {
    this.onTouched()
    this.inputBlur.emit()
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || ''
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}