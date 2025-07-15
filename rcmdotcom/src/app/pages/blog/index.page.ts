import { ContentFile, injectContentFiles } from '@analogjs/content'
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations'
import { DatePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, HostListener, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { BlogPost } from '../../models/BlogPost.interface'
import { ButtonComponent } from '../../../components/ui/button.component'
import { CardComponent } from '../../../components/ui/card.component'
import { BadgeComponent } from '../../../components/ui/badge.component'
import { InputComponent } from '../../../components/ui/input.component'

@Component({
  standalone: true,
  imports: [RouterLink, DatePipe, FormsModule, ButtonComponent, CardComponent, BadgeComponent, InputComponent],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }),
            stagger(100, [
              animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
    trigger('cardHover', [
      state(
        'inactive',
        style({
          transform: 'scale(1) rotate(0deg)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }),
      ),
      state(
        'active',
        style({
          transform: 'scale(1.02) rotate(1deg)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }),
      ),
      transition('inactive => active', animate('200ms ease-out')),
      transition('active => inactive', animate('150ms ease-in')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="blog-listing-container">
      <!-- Enhanced Header -->
      <header class="blog-header">
        <div class="container-main">
          <!-- Breadcrumb -->
          <nav class="breadcrumb-nav" aria-label="Breadcrumb">
            <ol class="breadcrumb-list">
              <li><a routerLink="/" class="breadcrumb-link">Home</a></li>
              <li class="breadcrumb-current">Blog</li>
            </ol>
          </nav>

          <!-- Hero Content -->
          <div class="hero-content">
            <div class="hero-badge">
              <span class="hero-badge-text">Latest Insights</span>
            </div>
            <h1 class="hero-title">Blog</h1>
            <p class="hero-subtitle">Thoughts, ideas, and explorations in modern web development</p>
            
            <!-- Stats -->
            <div class="blog-stats">
              <div class="stat">
                <span class="stat-number">{{ allPosts().length }}</span>
                <span class="stat-label">Articles</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ uniqueTags().length }}</span>
                <span class="stat-label">Topics</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ getTotalReadingTime() }}</span>
                <span class="stat-label">Min Read</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Enhanced Controls -->
      <section class="blog-controls">
        <div class="container-main">
          <div class="controls-grid">
            <!-- Search -->
            <div class="search-section">
              <div class="search-wrapper">
                <ui-input
                  [(ngModel)]="searchQuery"
                  placeholder="Search articles, topics, or ideas..."
                  [icon]="true"
                  (inputChange)="onSearchChange($event)"
                  class="search-input"
                >
                  <svg slot="icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </ui-input>
                <div class="search-results-count" *ngIf="searchQuery()">
                  {{ filteredPosts().length }} results found
                </div>
              </div>
            </div>

            <!-- Filter Tags -->
            <div class="filter-section">
              <h3 class="filter-title">Filter by Topic</h3>
              <div class="filter-tags">
                <ui-button
                  variant="primary"
                  size="sm"
                  [class.active]="activeFilter() === 'all'"
                  (onClick)="setFilter('all')"
                  class="filter-button"
                >
                  All Posts
                  <span class="tag-count">{{ allPosts().length }}</span>
                </ui-button>
                @for (tag of uniqueTags(); track tag) {
                <ui-button
                  variant="secondary"
                  size="sm"
                  [class.active]="activeFilter() === tag"
                  (onClick)="setFilter(tag)"
                  class="filter-button"
                >
                  {{ tag }}
                  <span class="tag-count">{{ getTagCount(tag) }}</span>
                </ui-button>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Section -->
      <section class="blog-content">
        <div class="container-main">
          
          <!-- Featured Post -->
          @if(featuredPost() && activeFilter() === 'all' && !searchQuery()){
          <div class="featured-section">
            <h2 class="section-title">Featured Article</h2>
            <div class="featured-post">
              <ui-card [hover]="true" [padding]="false" class="featured-card">
                <article
                  class="featured-article"
                  [routerLink]="['/blog', featuredPost()?.slug]"
                  [@cardHover]="hoveredIndex() === -1 ? 'active' : 'inactive'"
                  (mouseenter)="setHoveredIndex(-1)"
                  (mouseleave)="setHoveredIndex(null)"
                >
                  <div class="featured-image-wrapper">
                    <img
                      [src]="featuredPost()?.cardImage || 'https://picsum.photos/800/400'"
                      [alt]="featuredPost()?.title"
                      class="featured-image"
                    />
                    <ui-badge variant="primary" class="featured-badge">
                      Featured
                    </ui-badge>
                    <div class="featured-overlay"></div>
                  </div>
                  
                  <div class="featured-content">
                    <div class="featured-meta">
                      <time class="meta-date">{{ featuredPost()?.date | date : 'mediumDate' }}</time>
                      <span class="meta-separator">•</span>
                      <span class="meta-reading-time">{{ calculateReadingTime(featuredPost()?.content || '') }} min read</span>
                    </div>
                    
                    @if (featuredPost()?.tags?.length) {
                    <div class="featured-tags">
                      @for(tag of featuredPost()?.tags?.slice(0, 3); track tag) {
                      <ui-badge variant="default" size="sm">
                        {{ tag }}
                      </ui-badge>
                      }
                    </div>
                    }
                    
                    <h3 class="featured-title">{{ featuredPost()?.title }}</h3>
                    <p class="featured-excerpt">
                      {{ featuredPost()?.excerpt || 'Discover insights and practical knowledge in this comprehensive guide.' }}
                    </p>
                    
                    <ui-button variant="primary" class="featured-cta">
                      Read Full Article
                      <svg class="cta-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14m-7-7 7 7-7 7"/>
                      </svg>
                    </ui-button>
                  </div>
                </article>
              </ui-card>
            </div>
          </div>
          }

          <!-- Articles Grid -->
          <div class="articles-section">
            <div class="section-header">
              <h2 class="section-title">
                @if (searchQuery()) {
                  Search Results
                } @else if (activeFilter() !== 'all') {
                  {{ activeFilter() | titlecase }} Articles
                } @else {
                  Recent Articles
                }
              </h2>
              <p class="section-subtitle">
                {{ filteredPosts().length }} 
                {{ filteredPosts().length === 1 ? 'article' : 'articles' }}
                @if (activeFilter() !== 'all') {
                  in {{ activeFilter() }}
                }
                @if (searchQuery()) {
                  matching "{{ searchQuery() }}"
                }
              </p>
            </div>

            <div class="articles-grid" @cardAnimation>
              @for(post of filteredPosts(); track post.slug) {
              <article class="article-card">
                <ui-card [hover]="true" [padding]="false" class="h-full">
                  <div
                    class="article-card-content"
                    [routerLink]="['/blog', post.slug]"
                    [@cardHover]="hoveredIndex() === post.slug ? 'active' : 'inactive'"
                    (mouseenter)="setHoveredIndex(post.slug)"
                    (mouseleave)="setHoveredIndex(null)"
                  >
                    <div class="article-image-wrapper">
                      <img
                        [src]="post.cardImage || 'https://picsum.photos/400/240'"
                        [alt]="post.title"
                        class="article-image"
                        loading="lazy"
                      />
                      <div class="article-image-overlay"></div>
                      <div class="article-meta-overlay">
                        <time class="overlay-date">{{ post.date | date : 'MMM d' }}</time>
                        <span class="overlay-reading-time">{{ calculateReadingTime(post.content || '') }} min</span>
                      </div>
                    </div>

                    <div class="article-body">
                      @if(post.tags?.length){
                      <div class="article-tags">
                        @for(tag of post.tags.slice(0, 2); track tag) {
                        <ui-badge variant="default" size="sm">
                          {{ tag }}
                        </ui-badge>
                        }
                        @if(post.tags.length > 2) {
                        <span class="tags-more">+{{ post.tags.length - 2 }}</span>
                        }
                      </div>
                      }
                      
                      <h3 class="article-title">{{ post.title }}</h3>
                      <p class="article-excerpt">
                        {{ post.excerpt || 'No excerpt available for this post.' }}
                      </p>

                      <div class="article-footer">
                        <time class="article-date">{{ post.date | date : 'mediumDate' }}</time>
                        <ui-button variant="ghost" size="sm" class="read-more-btn">
                          Read more
                          <svg class="read-more-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14m-7-7 7 7-7 7"/>
                          </svg>
                        </ui-button>
                      </div>
                    </div>
                  </div>
                </ui-card>
              </article>
              }
            </div>
          </div>

          <!-- Empty State -->
          @if (filteredPosts().length === 0) {
          <div class="empty-state">
            <ui-card class="empty-state-card">
              <div class="empty-state-content">
                <div class="empty-state-icon">
                  <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 class="empty-state-title">No articles found</h3>
                <p class="empty-state-description">
                  @if (searchQuery()) {
                    No articles match your search for "<strong>{{ searchQuery() }}</strong>".
                    <br>Try different keywords or browse all articles.
                  } @else {
                    No articles found in the "<strong>{{ activeFilter() }}</strong>" category.
                    <br>Try selecting a different topic or view all articles.
                  }
                </p>
                <div class="empty-state-actions">
                  @if (searchQuery() || activeFilter() !== 'all') {
                  <ui-button variant="primary" (onClick)="clearFilters()">
                    Clear filters
                  </ui-button>
                  }
                  <ui-button variant="secondary" routerLink="/">
                    Back to Home
                  </ui-button>
                </div>
              </div>
            </ui-card>
          </div>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .blog-listing-container {
        @apply min-h-screen bg-primary-white;
      }

      /* Header Section */
      .blog-header {
        @apply bg-gradient-to-br from-primary-cream to-primary-white border-b border-primary-300 py-12;
      }

      .breadcrumb-nav {
        @apply mb-8;
      }

      .breadcrumb-list {
        @apply flex items-center space-x-2 text-sm text-secondary-600;
      }

      .breadcrumb-link {
        @apply hover:text-primary-green transition-colors;
      }

      .breadcrumb-current {
        @apply text-primary-800 font-medium;
      }

      .breadcrumb-list li:not(:last-child)::after {
        content: '→';
        @apply ml-2 text-secondary-400;
      }

      .hero-content {
        @apply text-center max-w-4xl mx-auto;
      }

      .hero-badge {
        @apply inline-flex mb-6;
      }

      .hero-badge-text {
        @apply bg-primary-green text-primary-white px-4 py-2 rounded-full text-sm font-medium;
      }

      .hero-title {
        @apply text-5xl md:text-6xl font-bold text-primary-800 mb-6;
      }

      .hero-subtitle {
        @apply text-xl text-secondary-700 mb-8 max-w-2xl mx-auto leading-relaxed;
      }

      .blog-stats {
        @apply flex justify-center gap-8 mt-8;
      }

      .stat {
        @apply text-center;
      }

      .stat-number {
        @apply block text-2xl font-bold text-primary-green;
      }

      .stat-label {
        @apply text-sm text-secondary-600 uppercase tracking-wide;
      }

      /* Controls Section */
      .blog-controls {
        @apply bg-primary-white py-8 border-b border-primary-200;
      }

      .controls-grid {
        @apply grid grid-cols-1 lg:grid-cols-3 gap-8 items-start;
      }

      .search-section {
        @apply lg:col-span-1;
      }

      .search-wrapper {
        @apply space-y-3;
      }

      .search-input {
        @apply w-full;
      }

      .search-results-count {
        @apply text-sm text-secondary-600 font-medium;
      }

      .filter-section {
        @apply lg:col-span-2;
      }

      .filter-title {
        @apply text-lg font-semibold text-primary-800 mb-4;
      }

      .filter-tags {
        @apply flex flex-wrap gap-3;
      }

      .filter-button {
        @apply relative;
      }

      .filter-button.active {
        @apply bg-primary-green text-primary-white border-primary-green;
      }

      .tag-count {
        @apply ml-2 bg-primary-white/20 text-xs px-2 py-0.5 rounded-full;
      }

      .filter-button.active .tag-count {
        @apply bg-primary-white/30;
      }

      /* Content Section */
      .blog-content {
        @apply py-12;
      }

      .section-title {
        @apply text-3xl font-bold text-primary-800 mb-2;
      }

      .section-subtitle {
        @apply text-secondary-600 mb-8;
      }

      .section-header {
        @apply mb-8;
      }

      /* Featured Post */
      .featured-section {
        @apply mb-16;
      }

      .featured-post {
        @apply max-w-5xl mx-auto;
      }

      .featured-card {
        @apply overflow-hidden;
      }

      .featured-article {
        @apply grid lg:grid-cols-5 cursor-pointer h-full;
      }

      .featured-image-wrapper {
        @apply lg:col-span-2 h-64 lg:h-full overflow-hidden relative;
      }

      .featured-image {
        @apply w-full h-full object-cover transition-transform duration-500 hover:scale-105;
      }

      .featured-badge {
        @apply absolute top-4 left-4 z-10;
      }

      .featured-overlay {
        @apply absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent lg:hidden;
      }

      .featured-content {
        @apply lg:col-span-3 p-8 flex flex-col;
      }

      .featured-meta {
        @apply flex items-center gap-3 text-sm text-secondary-600 mb-4;
      }

      .meta-date {
        @apply font-medium;
      }

      .meta-separator {
        @apply text-secondary-400;
      }

      .meta-reading-time {
        @apply bg-primary-green/10 text-primary-green px-2 py-1 rounded text-xs;
      }

      .featured-tags {
        @apply flex flex-wrap gap-2 mb-4;
      }

      .featured-title {
        @apply text-3xl font-bold text-primary-800 mb-4 leading-tight;
      }

      .featured-excerpt {
        @apply text-secondary-600 mb-6 leading-relaxed text-lg flex-grow;
      }

      .featured-cta {
        @apply self-start;
      }

      .cta-arrow {
        @apply w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1;
      }

      /* Articles Grid */
      .articles-section {
        @apply mt-16;
      }

      .articles-grid {
        @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;
      }

      .article-card {
        @apply h-full;
      }

      .article-card-content {
        @apply h-full flex flex-col cursor-pointer;
      }

      .article-image-wrapper {
        @apply h-48 overflow-hidden relative;
      }

      .article-image {
        @apply w-full h-full object-cover transition-transform duration-500 group-hover:scale-110;
      }

      .article-image-overlay {
        @apply absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent opacity-0 transition-opacity duration-300;
      }

      .article-card:hover .article-image-overlay {
        @apply opacity-100;
      }

      .article-meta-overlay {
        @apply absolute bottom-3 left-3 flex items-center gap-2 text-primary-white text-xs font-medium;
      }

      .overlay-date {
        @apply bg-primary-900/50 backdrop-blur-sm px-2 py-1 rounded;
      }

      .overlay-reading-time {
        @apply bg-primary-green/80 backdrop-blur-sm px-2 py-1 rounded;
      }

      .article-body {
        @apply p-6 flex flex-col flex-grow;
      }

      .article-tags {
        @apply flex flex-wrap gap-2 mb-4;
      }

      .tags-more {
        @apply text-xs text-secondary-500 bg-secondary-100 px-2 py-1 rounded;
      }

      .article-title {
        @apply text-xl font-bold text-primary-800 mb-3 line-clamp-2 group-hover:text-primary-green transition-colors duration-300;
      }

      .article-excerpt {
        @apply text-secondary-600 mb-6 flex-grow line-clamp-3 leading-relaxed;
      }

      .article-footer {
        @apply flex justify-between items-center mt-auto;
      }

      .article-date {
        @apply text-sm text-secondary-500;
      }

      .read-more-btn {
        @apply p-0 h-auto;
      }

      .read-more-arrow {
        @apply w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1;
      }

      /* Empty State */
      .empty-state {
        @apply mt-16;
      }

      .empty-state-card {
        @apply max-w-lg mx-auto;
      }

      .empty-state-content {
        @apply text-center py-12;
      }

      .empty-state-icon {
        @apply flex justify-center mb-6 text-secondary-400;
      }

      .empty-state-title {
        @apply text-2xl font-bold text-primary-800 mb-3;
      }

      .empty-state-description {
        @apply text-secondary-600 mb-8 leading-relaxed;
      }

      .empty-state-actions {
        @apply flex justify-center gap-4 flex-wrap;
      }

      /* Mobile Responsiveness */
      @media (max-width: 1024px) {
        .controls-grid {
          @apply grid-cols-1 gap-6;
        }

        .featured-article {
          @apply grid-cols-1;
        }

        .articles-grid {
          @apply grid-cols-1 md:grid-cols-2 gap-6;
        }

        .blog-stats {
          @apply gap-6;
        }

        .hero-title {
          @apply text-4xl;
        }
      }

      @media (max-width: 640px) {
        .blog-stats {
          @apply flex-col gap-4;
        }

        .filter-tags {
          @apply gap-2;
        }

        .empty-state-actions {
          @apply flex-col;
        }

        .articles-grid {
          @apply grid-cols-1;
        }

        .featured-meta {
          @apply flex-col items-start gap-2;
        }
      }
    `,
  ],
})
export default class IndexPage {
  private allContentFiles = injectContentFiles<BlogPost>()
  hoveredIndex = signal<string | number | null>(null)
  activeFilter = signal('all')
  searchQuery = signal('')
  allPosts = signal<BlogPost[]>([])
  featuredPost = signal<BlogPost | null>(null)
  uniqueTags = signal<string[]>([])
  filteredPosts = signal<BlogPost[]>([])

  constructor(private router: Router, private route: ActivatedRoute) {
    effect(() => {
      const posts = this.allContentFiles.map((file: ContentFile<BlogPost>) => ({
        title: file.attributes.title,
        date: file.attributes.date,
        excerpt: file.attributes.excerpt,
        slug: file.attributes.slug,
        url: file.attributes.url,
        cardImage: file.attributes.cardImage,
        tags: file.attributes.tags || [],
        content: file.content,
      }))
      this.allPosts.set(posts)
      this.featuredPost.set(posts.length > 0 ? posts[0] : null)
      this.uniqueTags.set(Array.from(new Set(posts.flatMap(post => post.tags || []))))

      // Handle query parameters for activeFilter
      this.route.queryParams.subscribe(params => {
        const filter = params['filter'] || 'all'
        this.activeFilter.set(filter)
        this.updateFilteredPosts()
      })
    })

    // Update filtered posts when search query or filter changes
    effect(() => {
      this.updateFilteredPosts()
    })
  }

  private updateFilteredPosts(): void {
    let posts = this.allPosts()
    const filter = this.activeFilter()
    const search = this.searchQuery().toLowerCase()

    // Apply tag filter
    if (filter !== 'all') {
      posts = posts.filter(post => post.tags?.includes(filter))
    }

    // Apply search filter
    if (search) {
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(search) ||
        post.excerpt?.toLowerCase().includes(search) ||
        post.tags?.some(tag => tag.toLowerCase().includes(search))
      )
    } else {
      // Only exclude featured post when not searching
      posts = posts.slice(1)
    }

    this.filteredPosts.set(posts)
  }

  setHoveredIndex(index: string | number | null): void {
    this.hoveredIndex.set(index)
  }

  setFilter(tag: string): void {
    this.activeFilter.set(tag)
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filter: tag },
      queryParamsHandling: 'merge',
    })
  }

  onSearchChange(query: string): void {
    this.searchQuery.set(query)
  }

  clearFilters(): void {
    this.searchQuery.set('')
    this.setFilter('all')
  }

  trackBySlug(index: number, post: BlogPost): string {
    return post.slug
  }

  getTotalReadingTime(): number {
    const totalWords = this.allPosts().reduce((total, post) => {
      const wordCount = (post.content || '').split(/\s+/).length
      return total + wordCount
    }, 0)
    return Math.ceil(totalWords / 200) // 200 words per minute
  }

  getTagCount(tag: string): number {
    return this.allPosts().filter(post => post.tags?.includes(tag)).length
  }

  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY < 100 && this.activeFilter() !== 'all') {
      this.activeFilter.set('all')
    }
  }
}
