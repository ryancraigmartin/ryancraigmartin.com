import { CommonModule } from '@angular/common'
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core'

interface TableOfContentsItem {
  id: string
  text: string
  level: number
  element?: HTMLElement
  isVisible?: boolean
}

@Component({
  selector: 'ui-table-of-contents',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-of-contents">
      <div class="toc-header">
        <h3 class="toc-title">{{ title }}</h3>
        <div class="reading-progress">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              [style.width.%]="readingProgress"
            ></div>
          </div>
          <span class="progress-text">{{ readingProgress | number:'1.0-0' }}% read</span>
        </div>
      </div>
      
      <nav class="toc-nav" *ngIf="items.length > 0">
        <ul class="toc-list">
          <li 
            *ngFor="let item of items; trackBy: trackByFn"
            class="toc-item"
            [class]="getTocItemClasses(item)"
          >
            <a 
              [href]="'#' + item.id"
              class="toc-link"
              (click)="onLinkClick($event, item)"
            >
              <span class="toc-number">{{ getItemNumber(item) }}</span>
              <span class="toc-text">{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </nav>

      <div class="toc-footer" *ngIf="showStats">
        <div class="reading-stats">
          <div class="stat">
            <span class="stat-value">{{ totalSections }}</span>
            <span class="stat-label">sections</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ estimatedReadTime }}</span>
            <span class="stat-label">min read</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table-of-contents {
      @apply bg-primary-white rounded-xl border border-primary-300 p-6 sticky top-8;
    }

    .toc-header {
      @apply mb-6;
    }

    .toc-title {
      @apply text-lg font-bold text-primary-800 mb-4;
    }

    .reading-progress {
      @apply space-y-2;
    }

    .progress-bar {
      @apply w-full h-2 bg-primary-200 rounded-full overflow-hidden;
    }

    .progress-fill {
      @apply h-full bg-primary-green transition-all duration-300 ease-out;
    }

    .progress-text {
      @apply text-xs font-medium text-secondary-600;
    }

    .toc-nav {
      @apply mb-6;
    }

    .toc-list {
      @apply space-y-1;
    }

    .toc-item {
      @apply transition-all duration-200;
    }

    .toc-link {
      @apply flex items-start gap-3 p-2 rounded-lg transition-all duration-200 hover:bg-primary-green/10 text-secondary-700 hover:text-primary-green;
    }

    .toc-number {
      @apply flex-shrink-0 w-6 h-6 bg-secondary-200 text-secondary-600 text-xs font-bold rounded-full flex items-center justify-center transition-colors duration-200;
    }

    .toc-text {
      @apply flex-1 text-sm leading-relaxed;
    }

    /* Level-based indentation */
    .toc-item-level-2 {
      @apply ml-0;
    }

    .toc-item-level-3 {
      @apply ml-4;
    }

    .toc-item-level-4 {
      @apply ml-8;
    }

    .toc-item-level-5 {
      @apply ml-12;
    }

    .toc-item-level-6 {
      @apply ml-16;
    }

    /* Active state */
    .toc-item-active .toc-link {
      @apply bg-primary-green/10 text-primary-green;
    }

    .toc-item-active .toc-number {
      @apply bg-primary-green text-primary-white;
    }

    /* Visited state */
    .toc-item-visited .toc-number {
      @apply bg-primary-green/20 text-primary-green;
    }

    .toc-footer {
      @apply pt-4 border-t border-primary-200;
    }

    .reading-stats {
      @apply flex justify-between;
    }

    .stat {
      @apply text-center;
    }

    .stat-value {
      @apply block text-lg font-bold text-primary-800;
    }

    .stat-label {
      @apply text-xs text-secondary-600 uppercase tracking-wide;
    }
  `]
})
export class TableOfContentsComponent implements OnInit, OnDestroy {
  @Input() title = 'Table of Contents'
  @Input() items: TableOfContentsItem[] = []
  @Input() showStats = true
  @Input() estimatedReadTime = 5
  @Input() activeItemId?: string

  @Output() itemClick = new EventEmitter<TableOfContentsItem>()

  readingProgress = 0
  private activeItemIndex = 0
  private observer?: IntersectionObserver

  get totalSections(): number {
    return this.items.length
  }

  ngOnInit(): void {
    this.setupIntersectionObserver()
    this.calculateReadingProgress()
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect()
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.calculateReadingProgress()
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const item = this.items.find(item => item.element === entry.target)
          if (item) {
            item.isVisible = entry.isIntersecting
          }
        })

        // Find the first visible item
        const visibleItem = this.items.find(item => item.isVisible)
        if (visibleItem) {
          this.activeItemId = visibleItem.id
          this.activeItemIndex = this.items.indexOf(visibleItem)
        }
      },
      {
        rootMargin: '-100px 0px -50% 0px'
      }
    )

    // Observe all heading elements
    this.items.forEach(item => {
      const element = document.getElementById(item.id)
      if (element) {
        item.element = element
        this.observer?.observe(element)
      }
    })
  }

  private calculateReadingProgress(): void {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    const totalScrollable = documentHeight - windowHeight
    const scrolled = scrollTop / totalScrollable

    this.readingProgress = Math.min(Math.max(scrolled * 100, 0), 100)
  }

  getTocItemClasses(item: TableOfContentsItem): string {
    let classes = `toc-item-level-${item.level}`
    
    if (this.activeItemId === item.id) {
      classes += ' toc-item-active'
    }

    const itemIndex = this.items.indexOf(item)
    if (itemIndex < this.activeItemIndex) {
      classes += ' toc-item-visited'
    }

    return classes
  }

  getItemNumber(item: TableOfContentsItem): string {
    const itemIndex = this.items.indexOf(item) + 1
    return itemIndex.toString()
  }

  onLinkClick(event: Event, item: TableOfContentsItem): void {
    event.preventDefault()
    
    const element = document.getElementById(item.id)
    if (element) {
      const offset = 100 // Account for sticky header
      const elementPosition = element.offsetTop - offset
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }

    this.itemClick.emit(item)
  }

  trackByFn(index: number, item: TableOfContentsItem): string {
    return item.id
  }
}