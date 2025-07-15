import { injectContent } from '@analogjs/content'
import { CommonModule, NgIf, DatePipe } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, signal, inject } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'
import { RouterLink } from '@angular/router'

import { FormsModule } from '@angular/forms'
import { BlogPost } from '../../models/BlogPost.interface'
import { ButtonComponent } from '../../../components/ui/button.component'
import { CardComponent } from '../../../components/ui/card.component'
import { BadgeComponent } from '../../../components/ui/badge.component'

@Component({
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule, DatePipe, RouterLink, ButtonComponent, CardComponent, BadgeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="min-h-screen bg-gradient-primary" *ngIf="post()">
      <!-- Hero Section -->
      <div class="relative h-96 overflow-hidden">
        <img 
          [src]="post()?.cardImage || 'https://picsum.photos/1200/400'" 
          [alt]="post()?.title"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
        <div class="absolute inset-0 flex items-end">
          <div class="container-main pb-12">
            <div class="flex flex-wrap gap-2 mb-4">
              @for(tag of post()?.tags?.slice(0, 3); track tag) {
              <ui-badge variant="primary">
                {{ tag }}
              </ui-badge>
              }
            </div>
            <h1 class="text-4xl md:text-5xl font-bold text-primary-white mb-4 text-balance">
              {{ post()?.title }}
            </h1>
            <div class="flex items-center gap-4 text-primary-white/80">
              <span>{{ post()?.date | date : 'longDate' }}</span>
              <span>•</span>
              <span>{{ readingTime() }} min read</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="container-main py-12">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <!-- Main Content -->
            <article class="lg:col-span-3">
              <ui-card [padding]="false" class="overflow-visible">
                <div class="prose prose-lg max-w-none p-8">
                  <analog-markdown [content]="post()?.content"></analog-markdown>
                </div>
              </ui-card>

              <!-- Share Section -->
              <div class="mt-8">
                <ui-card>
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-primary-800">Share this post</h3>
                    <div class="flex gap-3">
                      <ui-button 
                        variant="ghost" 
                        size="sm"
                        (onClick)="shareToTwitter()"
                      >
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                        </svg>
                        Twitter
                      </ui-button>
                      <ui-button 
                        variant="ghost" 
                        size="sm"
                        (onClick)="shareToLinkedIn()"
                      >
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                        </svg>
                        LinkedIn
                      </ui-button>
                      <ui-button 
                        variant="ghost" 
                        size="sm"
                        (onClick)="copyToClipboard()"
                      >
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                        </svg>
                        Copy Link
                      </ui-button>
                    </div>
                  </div>
                </ui-card>
              </div>

              <!-- Comments Section -->
              <div class="mt-8">
                <ui-card>
                  <h3 class="text-xl font-semibold text-primary-800 mb-6">Comments</h3>
                  
                  <!-- Comment Form -->
                  <form (submit)="addComment($event)" class="mb-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        [(ngModel)]="newComment.author"
                        name="author"
                        placeholder="Your name"
                        class="px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green focus:outline-none"
                        required
                      />
                      <input
                        type="email"
                        [(ngModel)]="newComment.email"
                        name="email"
                        placeholder="Your email"
                        class="px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green focus:outline-none"
                        required
                      />
                    </div>
                    <textarea
                      [(ngModel)]="newComment.text"
                      name="comment"
                      placeholder="Share your thoughts..."
                      rows="4"
                      class="w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green focus:outline-none mb-4"
                      required
                    ></textarea>
                    <ui-button type="submit" variant="primary">
                      Post Comment
                    </ui-button>
                  </form>

                  <!-- Comments List -->
                  <div class="space-y-6">
                    @for(comment of comments(); track $index) {
                    <div class="border-l-4 border-primary-green pl-4">
                      <div class="flex items-start justify-between mb-2">
                        <h4 class="font-semibold text-primary-800">{{ comment.author }}</h4>
                        <span class="text-sm text-secondary-500">{{ comment.timestamp | date : 'short' }}</span>
                      </div>
                      <p class="text-secondary-700">{{ comment.text }}</p>
                    </div>
                    }
                    @if(comments().length === 0) {
                    <p class="text-center text-secondary-500 py-8">
                      Be the first to share your thoughts on this post!
                    </p>
                    }
                  </div>
                </ui-card>
              </div>
            </article>

            <!-- Sidebar -->
            <aside class="lg:col-span-1">
              <div class="sticky top-8 space-y-6">
                <!-- Navigation -->
                <ui-card>
                  <h3 class="font-semibold text-primary-800 mb-4">Navigation</h3>
                  <nav class="space-y-2">
                    <a routerLink="/blog" class="block text-primary-green hover:text-primary-green-dark transition-colors">
                      ← Back to Blog
                    </a>
                    <a routerLink="/" class="block text-primary-green hover:text-primary-green-dark transition-colors">
                      Home
                    </a>
                  </nav>
                </ui-card>

                <!-- Table of Contents (if available) -->
                @if(tableOfContents().length > 0) {
                <ui-card>
                  <h3 class="font-semibold text-primary-800 mb-4">Table of Contents</h3>
                  <nav class="space-y-1">
                    @for(heading of tableOfContents(); track heading.id) {
                    <a 
                      [href]="'#' + heading.id" 
                      class="block text-sm text-secondary-600 hover:text-primary-green transition-colors"
                      [class.pl-4]="heading.level === 3"
                      [class.pl-6]="heading.level === 4"
                    >
                      {{ heading.text }}
                    </a>
                    }
                  </nav>
                </ui-card>
                }
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .prose {
        color: #424242;
      }

      .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
        color: #212121;
        font-weight: 700;
        margin-top: 2rem;
        margin-bottom: 1rem;
      }

      .prose h2 {
        font-size: 1.875rem;
        border-bottom: 2px solid #E8E4D9;
        padding-bottom: 0.5rem;
      }

      .prose h3 {
        font-size: 1.5rem;
      }

      .prose a {
        color: #4ca179;
        text-decoration: none;
        border-bottom: 1px solid transparent;
        transition: border-color 0.3s ease;
      }

      .prose a:hover {
        border-bottom-color: #4ca179;
      }

      .prose code {
        background-color: #f5f5f5;
        color: #e11d48;
        padding: 0.125rem 0.25rem;
        border-radius: 0.25rem;
        font-size: 0.875em;
      }

      .prose pre {
        background-color: #1a1a1a;
        color: #e5e5e5;
        padding: 1.5rem;
        border-radius: 0.75rem;
        overflow-x: auto;
        line-height: 1.7;
      }

      .prose pre code {
        background: none;
        color: inherit;
        padding: 0;
      }

      .prose blockquote {
        border-left: 4px solid #4ca179;
        padding-left: 1.5rem;
        margin: 2rem 0;
        font-style: italic;
        color: #546E7A;
      }

      .prose ul, .prose ol {
        margin: 1rem 0;
        padding-left: 1.5rem;
      }

      .prose li {
        margin: 0.5rem 0;
      }
    `,
  ],
})
export default class BlogPostPage {
  private content = injectContent<BlogPost>()
  private meta = inject(Meta)
  private title = inject(Title)
  
  post = signal<BlogPost | null>(null)
  comments = signal<{ author: string; email: string; text: string; timestamp: Date }[]>([])
  tableOfContents = signal<{ id: string; text: string; level: number }[]>([])
  readingTime = signal<number>(0)
  
  newComment = {
    author: '',
    email: '',
    text: ''
  }

  constructor() {
    effect(() => {
      this.content.subscribe({
        next: data => {
          if (data && 'attributes' in data) {
            const blogPost: BlogPost = {
              title: data.attributes.title,
              date: data.attributes.date,
              content: data.content,
              cardImage: data.attributes.cardImage,
              excerpt: data.attributes.excerpt,
              slug: data.attributes.slug,
              url: data.attributes.url,
              tags: data.attributes.tags || [],
            }
            this.post.set(blogPost)
            this.updateSEO(blogPost)
            this.calculateReadingTime(data.content)
            this.extractTableOfContents(data.content)
          } else {
            this.post.set(null)
          }
        },
        error: error => {
          console.error('Error fetching blog post:', error)
          this.post.set(null)
        },
      })
    })
  }

  private updateSEO(post: BlogPost): void {
    // Update page title
    this.title.setTitle(`${post.title} | Ryan Craig Martin`)

    // Update meta description
    this.meta.updateTag({ name: 'description', content: post.excerpt || `Read "${post.title}" on Ryan Craig Martin's blog.` })

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: post.title })
    this.meta.updateTag({ property: 'og:description', content: post.excerpt || '' })
    this.meta.updateTag({ property: 'og:image', content: post.cardImage || '' })
    this.meta.updateTag({ property: 'og:url', content: post.url || '' })
    this.meta.updateTag({ property: 'og:type', content: 'article' })

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' })
    this.meta.updateTag({ name: 'twitter:title', content: post.title })
    this.meta.updateTag({ name: 'twitter:description', content: post.excerpt || '' })
    this.meta.updateTag({ name: 'twitter:image', content: post.cardImage || '' })

    // Article specific tags
    this.meta.updateTag({ property: 'article:published_time', content: new Date(post.date).toISOString() })
    this.meta.updateTag({ property: 'article:author', content: 'Ryan Craig Martin' })
    
    // Tags as keywords
    if (post.tags?.length) {
      this.meta.updateTag({ name: 'keywords', content: post.tags.join(', ') })
      post.tags.forEach(tag => {
        this.meta.updateTag({ property: 'article:tag', content: tag })
      })
    }

    // Canonical URL
    this.meta.updateTag({ rel: 'canonical', href: post.url || '' })
  }

  private calculateReadingTime(content: string | object): void {
    const wordsPerMinute = 200
    const contentString = typeof content === 'string' ? content : ''
    const wordCount = contentString.split(/\s+/).length
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute)
    this.readingTime.set(readingTimeMinutes)
  }

  private extractTableOfContents(content: string | object): void {
    const contentString = typeof content === 'string' ? content : ''
    const headingRegex = /^(#{2,4})\s+(.+)$/gm
    const headings: { id: string; text: string; level: number }[] = []
    let match

    while ((match = headingRegex.exec(contentString)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      
      headings.push({ id, text, level })
    }

    this.tableOfContents.set(headings)
  }

  addComment(event: Event): void {
    event.preventDefault()
    if (this.newComment.author.trim() && this.newComment.email.trim() && this.newComment.text.trim()) {
      this.comments.update(comments => [...comments, {
        author: this.newComment.author,
        email: this.newComment.email,
        text: this.newComment.text,
        timestamp: new Date()
      }])
      
      // Reset form
      this.newComment = { author: '', email: '', text: '' }
    }
  }

  shareToTwitter(): void {
    const post = this.post()
    if (post) {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(post.url || window.location.href)}`
      window.open(url, '_blank')
    }
  }

  shareToLinkedIn(): void {
    const post = this.post()
    if (post) {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.url || window.location.href)}`
      window.open(url, '_blank')
    }
  }

  async copyToClipboard(): Promise<void> {
    const post = this.post()
    if (post) {
      try {
        await navigator.clipboard.writeText(post.url || window.location.href)
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy link:', err)
      }
    }
  }
}
