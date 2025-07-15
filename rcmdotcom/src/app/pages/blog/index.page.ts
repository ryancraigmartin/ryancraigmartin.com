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
    <div class="container-main py-12 relative bg-dot-grid">
      <!-- Header -->
      <header class="text-center mb-12 relative">
        <div class="inline-block relative">
          <h1 class="text-5xl font-bold text-primary-800 mb-3 relative z-10">Blog</h1>
          <div
            class="absolute -bottom-2 left-0 w-full h-3 bg-primary-green opacity-30 transform -rotate-1"
          ></div>
        </div>
        <p class="text-xl text-secondary-700 mt-4 text-balance">Thoughts, ideas, and explorations</p>
      </header>

      <!-- Search Bar -->
      <div class="max-w-md mx-auto mb-10">
        <ui-input
          [(ngModel)]="searchQuery"
          placeholder="Search posts..."
          [icon]="true"
          (inputChange)="onSearchChange($event)"
        >
          <svg slot="icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </ui-input>
      </div>

      <!-- Filter Tags -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <ui-button
          variant="primary"
          size="sm"
          [class.!bg-primary-green]="activeFilter() === 'all'"
          [class.!text-primary-white]="activeFilter() === 'all'"
          [class.!bg-primary-white]="activeFilter() !== 'all'"
          [class.!text-primary-green]="activeFilter() !== 'all'"
          [class.!border-2]="activeFilter() !== 'all'"
          [class.!border-primary-green]="activeFilter() !== 'all'"
          (onClick)="setFilter('all')"
        >
          All Posts
        </ui-button>
        @for (tag of uniqueTags(); track tag) {
        <ui-button
          variant="secondary"
          size="sm"
          [class.!bg-primary-green]="activeFilter() === tag"
          [class.!text-primary-white]="activeFilter() === tag"
          (onClick)="setFilter(tag)"
        >
          {{ tag }}
        </ui-button>
        }
      </div>

      <!-- Featured Post -->
      @if(featuredPost() && activeFilter() === 'all' && !searchQuery()){
      <div class="mb-12">
        <ui-card [hover]="true" [padding]="false">
          <article
            class="relative grid md:grid-cols-5 cursor-pointer"
            [routerLink]="['/blog', featuredPost()?.slug]"
            [@cardHover]="hoveredIndex() === -1 ? 'active' : 'inactive'"
            (mouseenter)="setHoveredIndex(-1)"
            (mouseleave)="setHoveredIndex(null)"
          >
            <div class="md:col-span-2 h-64 md:h-full overflow-hidden relative">
              <img
                [src]="featuredPost()?.cardImage || 'https://picsum.photos/400/300'"
                [alt]="featuredPost()?.title"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <ui-badge
                variant="primary"
                class="absolute top-4 left-4"
              >
                Featured
              </ui-badge>
            </div>
            <div class="md:col-span-3 p-8 flex flex-col">
              @if (featuredPost()?.tags?.length) {
              <div class="flex flex-wrap gap-2 mb-4">
                @for(tag of featuredPost()?.tags?.slice(0, 3); track tag) {
                <ui-badge variant="default">
                  {{ tag }}
                </ui-badge>
                }
              </div>
              }
              <h2 class="text-3xl font-bold text-primary-800 mb-3">
                {{ featuredPost()?.title }}
              </h2>
              <p class="text-secondary-600 mb-4 line-clamp-3">
                {{ featuredPost()?.excerpt || 'No excerpt available for this post.' }}
              </p>
              <div class="mt-auto flex justify-between items-center">
                <span class="text-secondary-500">{{
                  featuredPost()?.date | date : 'mediumDate'
                }}</span>
                <ui-button variant="primary">
                  Read Article
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </ui-button>
              </div>
            </div>
          </article>
        </ui-card>
      </div>
      }

      <!-- Main Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr" @cardAnimation>
        @for(post of filteredPosts(); track post.slug) {
        <ui-card [hover]="true" [padding]="false">
          <article
            class="h-full flex flex-col cursor-pointer"
            [routerLink]="['/blog', post.slug]"
            [@cardHover]="hoveredIndex() === post.slug ? 'active' : 'inactive'"
            (mouseenter)="setHoveredIndex(post.slug)"
            (mouseleave)="setHoveredIndex(null)"
          >
            <div class="h-48 overflow-hidden relative">
              <img
                [src]="post.cardImage || 'https://picsum.photos/400/300'"
                [alt]="post.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div
                class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-900 to-transparent opacity-70"
              ></div>
              <ui-badge
                variant="default"
                class="absolute bottom-2 left-3 backdrop-blur-sm bg-primary-900/30 border-none text-primary-white"
              >
                {{ post.date | date : 'mediumDate' }}
              </ui-badge>
            </div>

            <div class="p-6 flex flex-col flex-grow">
              @if(post.tags?.length){
              <div class="flex flex-wrap gap-2 mb-4">
                @for(tag of post.tags.slice(0, 3); track tag) {
                <ui-badge variant="default" size="sm">
                  {{ tag }}
                </ui-badge>
                }
              </div>
              }
              <h2
                class="text-xl font-bold text-primary-800 mb-3 line-clamp-2 group-hover:text-primary-green transition-colors duration-300"
              >
                {{ post.title }}
              </h2>

              <p class="text-secondary-600 mb-6 flex-grow line-clamp-3">
                {{ post.excerpt || 'No excerpt available for this post.' }}
              </p>

              <ui-button variant="ghost" class="mt-auto justify-start p-0">
                Read more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </ui-button>
            </div>
          </article>
        </ui-card>
        }
      </div>

      <!-- Empty state -->
      @if (filteredPosts().length === 0) {
      <ui-card class="text-center py-12">
        <h3 class="text-2xl font-bold text-primary-800 mb-3">No posts found</h3>
        <p class="text-secondary-600 mb-4">
          @if (searchQuery()) {
            No posts match your search for "{{ searchQuery() }}".
          } @else {
            Try selecting a different tag or view all posts.
          }
        </p>
        @if (searchQuery() || activeFilter() !== 'all') {
        <ui-button variant="secondary" (onClick)="clearFilters()">
          Clear filters
        </ui-button>
        }
      </ui-card>
      }
    </div>
  `,
  styles: [
    `
      .bg-dot-grid {
        background-image: radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        background-size: 20px 20px;
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY < 100 && this.activeFilter() !== 'all') {
      this.activeFilter.set('all')
    }
  }
}
