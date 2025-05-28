import { ContentFile, injectContentFiles } from '@analogjs/content'
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations'
import { DatePipe } from '@angular/common'
import { ChangeDetectionStrategy, Component, effect, HostListener, signal } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'

import { BlogPost } from '../../models/BlogPost.interface'

@Component({
  standalone: true,
  imports: [RouterLink, DatePipe],
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
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative bg-dot-grid">
      <header class="text-center mb-12 relative">
        <div class="inline-block relative">
          <h1 class="text-5xl font-bold text-primary-800 mb-3 relative z-10">Blog</h1>
          <div
            class="absolute -bottom-2 left-0 w-full h-3 bg-primary-green opacity-30 transform -rotate-1"
          ></div>
        </div>
        <p class="text-xl text-secondary-700 mt-4">Thoughts, ideas, and explorations</p>
      </header>

      <!-- Filter Tags -->
      <div class="flex flex-wrap justify-center gap-3 mb-10">
        <button
          class="px-4 py-2 rounded-full text-sm font-medium border-2 border-primary-green text-primary-800 hover:bg-primary-green hover:text-primary-white transition-colors duration-300"
          [class.bg-primary-green]="activeFilter() === 'all'"
          [class.text-primary-white]="activeFilter() === 'all'"
          (click)="setFilter('all')"
        >
          All Posts
        </button>
        @for (tag of uniqueTags(); track tag) {
        <button
          class="px-4 py-2 rounded-full text-sm font-medium border-2 border-primary-green text-primary-800 hover:bg-primary-green hover:text-primary-white transition-colors duration-300"
          [class.bg-primary-green]="activeFilter() === tag"
          [class.text-primary-white]="activeFilter() === tag"
          (click)="setFilter(tag)"
        >
          {{ tag }}
        </button>
        }
      </div>

      <!-- Featured Post -->
      @if(featuredPost() && activeFilter() === 'all'){
      <div class="mb-12">
        <article
          class="relative grid md:grid-cols-5 bg-primary-white rounded-xl overflow-hidden shadow-lg border-l-4 border-primary-green cursor-pointer"
          [routerLink]="['/blog', featuredPost()?.slug]"
          [@cardHover]="hoveredIndex() === -1 ? 'active' : 'inactive'"
          (mouseenter)="setHoveredIndex(-1)"
          (mouseleave)="setHoveredIndex(null)"
        >
          <div class="md:col-span-2 h-64 md:h-full overflow-hidden">
            <img
              [src]="featuredPost()?.cardImage || 'https://picsum.photos/200/300'"
              [alt]="featuredPost()?.title"
              class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div
              class="absolute top-0 left-0 bg-primary-green text-primary-white px-4 py-2 rounded-br-lg font-bold"
            >
              Featured
            </div>
          </div>
          <div class="md:col-span-3 p-8 flex flex-col">
            @if (featuredPost()?.tags?.length) {
            <div class="flex flex-wrap gap-2 mb-4">
              @for(tag of featuredPost()?.tags?.slice(0, 3); track tag) {

              <span
                class="px-3 py-1 text-xs font-medium bg-primary-alabaster rounded-full text-secondary-700"
              >
                {{ tag }}
              </span>
              }
            </div>
            <h2 class="text-3xl font-bold text-primary-800 mb-3">
              {{ featuredPost()?.title }}
            </h2>
            <p class="text-secondary-600 mb-4">
              {{ featuredPost()?.excerpt || 'No excerpt available for this post.' }}
            </p>
            <div class="mt-auto flex justify-between items-center">
              <span class="text-secondary-500">{{
                featuredPost()?.date | date : 'mediumDate'
              }}</span>
              <a
                [routerLink]="['/blog', featuredPost()?.slug]"
                class="group inline-flex items-center bg-primary-green text-primary-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-primary-800"
              >
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
              </a>
            </div>
            }
          </div>
        </article>
      </div>
      }

      <!-- Main Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr" @cardAnimation>
        @for(post of filteredPosts(); track post.slug) {

        <article
          class="bg-primary-white rounded-xl overflow-hidden flex flex-col h-full relative group cursor-pointer"
          [routerLink]="['/blog', post.slug]"
          [@cardHover]="hoveredIndex() === post.slug ? 'active' : 'inactive'"
          (mouseenter)="setHoveredIndex(post.slug)"
          (mouseleave)="setHoveredIndex(null)"
        >
          <div class="h-48 overflow-hidden relative">
            <img
              [src]="post.cardImage || 'assets/images/placeholder.jpg'"
              [alt]="post.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div
              class="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-900 to-transparent opacity-70"
            ></div>
            <div
              class="absolute bottom-2 left-3 text-primary-white font-medium text-sm px-2 py-1 rounded backdrop-blur-sm bg-primary-900/30"
            >
              {{ post.date | date : 'mediumDate' }}
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            @if(post.tags?.length){
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                *ngFor="let tag of post.tags.slice(0, 3)"
                class="px-2 py-1 text-xs font-medium bg-primary-alabaster rounded-full text-secondary-700 transition-all duration-300 hover:bg-primary-green hover:text-primary-white"
              >
                {{ tag }}
              </span>
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

            <a
              [routerLink]="['/blog', post.slug]"
              class="group inline-flex items-center text-primary-green font-medium mt-auto hover:text-primary-800 transition-colors duration-300"
            >
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
            </a>
          </div>
        </article>
        }
      </div>

      <!-- Empty state -->
      @if (filteredPosts().length === 0) {
      <div class="text-center py-12 bg-primary-alabaster rounded-xl">
        <h3 class="text-2xl font-bold text-primary-800 mb-3">No posts found</h3>
        <p class="text-secondary-600">Try selecting a different tag or view all posts.</p>
      </div>
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
        this.filteredPosts.set(
          filter === 'all' ? posts.slice(1) : posts.filter(post => post.tags?.includes(filter)),
        )
      })
    })
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
