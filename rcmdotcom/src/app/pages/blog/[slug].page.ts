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
import { CalloutComponent } from '../../../components/ui/callout.component'
import { ActionModuleComponent } from '../../../components/ui/action-module.component'
import { TableOfContentsComponent } from '../../../components/ui/table-of-contents.component'
import { SectionNumberComponent } from '../../../components/ui/section-number.component'
import { StructuredDataService } from '../../services/structured-data.service'

@Component({
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule, DatePipe, RouterLink, ButtonComponent, CardComponent, BadgeComponent, CalloutComponent, ActionModuleComponent, TableOfContentsComponent, SectionNumberComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="blog-post-container" *ngIf="post()">
      <!-- Minimal Hero Section -->
      <div class="hero-section">
        <div class="container-main">
          <!-- Breadcrumb Navigation -->
          <nav class="breadcrumb-nav" aria-label="Breadcrumb">
            <ol class="breadcrumb-list">
              <li><a routerLink="/" class="breadcrumb-link">Home</a></li>
              <li><a routerLink="/blog" class="breadcrumb-link">Blog</a></li>
              <li class="breadcrumb-current">{{ post()?.title }}</li>
            </ol>
          </nav>

          <!-- Article Header -->
          <header class="article-header">
            <div class="article-meta">
              <time [dateTime]="post()?.date" class="article-date">
                {{ post()?.date | date : 'longDate' }}
              </time>
              <span class="reading-time">{{ readingTime() }} min read</span>
            </div>
            
            <h1 class="article-title">{{ post()?.title }}</h1>
            
            <div class="article-excerpt" *ngIf="post()?.excerpt">
              <p>{{ post()?.excerpt }}</p>
            </div>

            <div class="article-tags" *ngIf="post()?.tags?.length">
              <ui-badge 
                *ngFor="let tag of post()?.tags; track tag" 
                variant="default"
                size="sm"
              >
                {{ tag }}
              </ui-badge>
            </div>
          </header>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="main-content">
        <div class="container-main">
          <div class="content-grid">
            
            <!-- Article Content -->
            <main class="article-main">
              
              <!-- Introduction Callout -->
              <ui-callout variant="tip" title="What You'll Learn">
                This comprehensive guide covers the essential concepts and best practices 
                for the topic discussed. Each section builds upon the previous one, 
                providing you with actionable insights and practical knowledge.
              </ui-callout>

              <!-- Dynamic Content Sections -->
              <div class="content-sections">
                <analog-markdown [content]="post()?.content"></analog-markdown>
              </div>

              <!-- Key Takeaways Module -->
              <ui-action-module 
                variant="success" 
                [icon]="true"
                title="Key Takeaways"
                description="Here are the most important points to remember from this article:"
                class="mb-8"
              >
                <svg slot="icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                
                <ul class="takeaway-list">
                  <li>Modern architecture patterns enable scalable applications</li>
                  <li>Performance optimization should be considered from the start</li>
                  <li>Proper testing strategies reduce bugs and improve reliability</li>
                  <li>Continuous learning and adaptation are essential for success</li>
                </ul>
              </ui-action-module>

              <!-- Next Steps Action Module -->
              <ui-action-module 
                variant="primary" 
                [icon]="true"
                title="Ready to Get Started?"
                description="Take the next step in your journey with these recommended actions:"
                ctaText="Explore More Articles"
                (ctaClick)="navigateToRelatedPosts()"
                class="mb-8"
              >
                <svg slot="icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                
                <div class="next-steps-grid">
                  <div class="next-step">
                    <h4>Practice</h4>
                    <p>Apply these concepts in your own projects</p>
                  </div>
                  <div class="next-step">
                    <h4>Learn More</h4>
                    <p>Explore related topics and advanced techniques</p>
                  </div>
                  <div class="next-step">
                    <h4>Share</h4>
                    <p>Discuss your insights with the community</p>
                  </div>
                </div>
              </ui-action-module>

              <!-- Share Section -->
              <ui-action-module 
                variant="secondary" 
                [icon]="true"
                title="Share This Article"
                description="Found this helpful? Share it with others who might benefit too."
                class="mb-8"
              >
                <svg slot="icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                </svg>
                
                <div class="share-buttons">
                  <ui-button 
                    variant="ghost" 
                    size="sm"
                    (onClick)="shareToTwitter()"
                  >
                    <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                    Twitter
                  </ui-button>
                  <ui-button 
                    variant="ghost" 
                    size="sm"
                    (onClick)="shareToLinkedIn()"
                  >
                    <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                    LinkedIn
                  </ui-button>
                  <ui-button 
                    variant="ghost" 
                    size="sm"
                    (onClick)="copyToClipboard()"
                  >
                    <svg class="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
                    </svg>
                    Copy Link
                  </ui-button>
                </div>
              </ui-action-module>

              <!-- Comments Section -->
              <ui-card class="comments-section">
                <h3 class="comments-title">Join the Discussion</h3>
                <p class="comments-subtitle">Share your thoughts and connect with other readers</p>
                
                <!-- Comment Form -->
                <form (submit)="addComment($event)" class="comment-form">
                  <div class="form-grid">
                    <input
                      type="text"
                      [(ngModel)]="newComment.author"
                      name="author"
                      placeholder="Your name"
                      class="form-input"
                      required
                    />
                    <input
                      type="email"
                      [(ngModel)]="newComment.email"
                      name="email"
                      placeholder="Your email"
                      class="form-input"
                      required
                    />
                  </div>
                  <textarea
                    [(ngModel)]="newComment.text"
                    name="comment"
                    placeholder="Share your thoughts..."
                    rows="4"
                    class="form-textarea"
                    required
                  ></textarea>
                  <ui-button type="submit" variant="primary">
                    Post Comment
                  </ui-button>
                </form>

                <!-- Comments List -->
                <div class="comments-list" *ngIf="comments().length > 0">
                  <div *ngFor="let comment of comments(); track $index" class="comment">
                    <div class="comment-header">
                      <h4 class="comment-author">{{ comment.author }}</h4>
                      <time class="comment-date">{{ comment.timestamp | date : 'short' }}</time>
                    </div>
                    <p class="comment-text">{{ comment.text }}</p>
                  </div>
                </div>
                
                <div class="empty-comments" *ngIf="comments().length === 0">
                  <p>Be the first to share your thoughts on this article!</p>
                </div>
              </ui-card>
            </main>

            <!-- Enhanced Sidebar -->
            <aside class="article-sidebar">
              <!-- Table of Contents -->
              <ui-table-of-contents
                [items]="tableOfContents()"
                [estimatedReadTime]="readingTime()"
                title="Article Overview"
                (itemClick)="onTocItemClick($event)"
              ></ui-table-of-contents>

              <!-- Author Info Module -->
              <ui-action-module 
                variant="info" 
                [icon]="true"
                title="About the Author"
                size="compact"
                class="mb-6"
              >
                <svg slot="icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                
                <p class="text-sm text-secondary-600 mb-3">
                  Ryan Craig Martin is a software developer and writer sharing insights 
                  about modern web development and technology.
                </p>
                
                <div slot="footer">
                  <ui-button variant="ghost" size="sm" routerLink="/about">
                    View Profile
                  </ui-button>
                </div>
              </ui-action-module>

              <!-- Related Articles -->
              <ui-card class="related-articles">
                <h3 class="related-title">Related Articles</h3>
                <div class="related-list">
                  <a *ngFor="let related of getRelatedPosts(); track related.slug" 
                     [routerLink]="['/blog', related.slug]" 
                     class="related-item">
                    <h4 class="related-item-title">{{ related.title }}</h4>
                    <p class="related-item-excerpt">{{ related.excerpt }}</p>
                    <div class="related-item-tags">
                      <ui-badge 
                        *ngFor="let tag of related.tags?.slice(0, 2); track tag" 
                        variant="default" 
                        size="sm"
                      >
                        {{ tag }}
                      </ui-badge>
                    </div>
                  </a>
                </div>
                
                <ui-button variant="ghost" routerLink="/blog" class="mt-4">
                  View All Articles
                </ui-button>
              </ui-card>

              <!-- Newsletter Signup -->
              <ui-action-module 
                variant="primary" 
                [icon]="true"
                title="Stay Updated"
                description="Get notified about new articles and insights."
                ctaText="Subscribe"
                (ctaClick)="onNewsletterSignup()"
                size="compact"
              >
                <svg slot="icon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </ui-action-module>
            </aside>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* Enhanced animation effects */
      .blog-post-container {
        @apply min-h-screen bg-primary-white;
        animation: fadeIn 0.6s ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .content-sections :deep(.prose h2) {
        @apply text-3xl mt-12 mb-6 pb-3 border-b-2 border-primary-green/20;
        animation: slideInLeft 0.6s ease-out;
      }

      .content-sections :deep(.prose h2)::before {
        content: counter(section-counter);
        counter-increment: section-counter;
        @apply inline-flex items-center justify-center w-8 h-8 bg-primary-green text-primary-white rounded-full text-sm font-bold mr-4;
        animation: bounceIn 0.8s ease-out;
      }

      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
      }

      @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0.3); }
        50% { opacity: 1; transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
      }

      /* Staggered animation for action modules */
      ui-action-module {
        animation: slideUp 0.6s ease-out;
        animation-fill-mode: both;
      }

      ui-action-module:nth-child(1) { animation-delay: 0.1s; }
      ui-action-module:nth-child(2) { animation-delay: 0.2s; }
      ui-action-module:nth-child(3) { animation-delay: 0.3s; }

      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Hover effects for interactive elements */
      .takeaway-list li {
        @apply transition-all duration-200;
      }

      .takeaway-list li:hover {
        @apply transform translate-x-2 text-primary-green;
      }

      /* Hero Section */
      .hero-section {
        @apply bg-primary-cream border-b border-primary-300 py-8;
      }

      .breadcrumb-nav {
        @apply mb-6;
      }

      .breadcrumb-list {
        @apply flex items-center space-x-2 text-sm text-secondary-600;
      }

      .breadcrumb-link {
        @apply hover:text-primary-green transition-colors;
      }

      .breadcrumb-current {
        @apply text-primary-800 font-medium truncate;
      }

      .breadcrumb-list li:not(:last-child)::after {
        content: '→';
        @apply ml-2 text-secondary-400;
      }

      .article-header {
        @apply max-w-4xl;
      }

      .article-meta {
        @apply flex items-center gap-4 text-sm text-secondary-600 mb-4;
      }

      .article-date {
        @apply font-medium;
      }

      .reading-time {
        @apply bg-primary-green/10 text-primary-green px-3 py-1 rounded-full text-xs font-medium;
      }

      .article-title {
        @apply text-4xl md:text-5xl font-bold text-primary-800 mb-6 leading-tight max-w-4xl;
      }

      .article-excerpt {
        @apply text-xl text-secondary-700 mb-6 leading-relaxed max-w-3xl;
      }

      .article-tags {
        @apply flex flex-wrap gap-2;
      }

      /* Main Content */
      .main-content {
        @apply py-12;
      }

      .content-grid {
        @apply grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl mx-auto;
      }

      .article-main {
        @apply lg:col-span-3;
      }

      .article-sidebar {
        @apply lg:col-span-1 space-y-6;
      }

      .content-sections {
        @apply mb-12;
      }

      /* Enhanced Prose Styles */
      .content-sections :deep(.prose) {
        @apply max-w-none;
        color: #374151;
        line-height: 1.8;
      }

      .content-sections :deep(.prose h1),
      .content-sections :deep(.prose h2),
      .content-sections :deep(.prose h3),
      .content-sections :deep(.prose h4),
      .content-sections :deep(.prose h5),
      .content-sections :deep(.prose h6) {
        @apply text-primary-800 font-bold scroll-mt-24;
        position: relative;
      }

      .content-sections :deep(.prose h2) {
        @apply text-3xl mt-12 mb-6 pb-3 border-b-2 border-primary-green/20;
      }

      .content-sections :deep(.prose h2)::before {
        content: counter(section-counter);
        counter-increment: section-counter;
        @apply inline-flex items-center justify-center w-8 h-8 bg-primary-green text-primary-white rounded-full text-sm font-bold mr-4;
      }

      .content-sections :deep(.prose) {
        counter-reset: section-counter;
      }

      .content-sections :deep(.prose h3) {
        @apply text-2xl mt-10 mb-4;
      }

      .content-sections :deep(.prose h4) {
        @apply text-xl mt-8 mb-3;
      }

      .content-sections :deep(.prose p) {
        @apply text-lg leading-relaxed mb-6;
      }

      .content-sections :deep(.prose a) {
        @apply text-primary-green font-medium border-b border-primary-green/30 hover:border-primary-green transition-colors;
        text-decoration: none;
      }

      .content-sections :deep(.prose code) {
        @apply bg-primary-green/10 text-primary-green-dark px-2 py-1 rounded text-sm font-mono;
      }

      .content-sections :deep(.prose pre) {
        @apply bg-primary-800 text-primary-white p-6 rounded-xl overflow-x-auto my-8 shadow-medium;
        position: relative;
      }

      .content-sections :deep(.prose pre)::before {
        content: '💻';
        @apply absolute top-4 right-4 text-lg opacity-60;
      }

      .content-sections :deep(.prose pre code) {
        @apply bg-transparent text-inherit p-0;
      }

      .content-sections :deep(.prose blockquote) {
        @apply border-l-4 border-primary-green bg-primary-green/5 pl-6 py-4 my-8 text-lg italic rounded-r-lg;
        position: relative;
      }

      .content-sections :deep(.prose blockquote)::before {
        content: '"';
        @apply absolute -left-2 -top-2 text-4xl text-primary-green font-bold opacity-50;
      }

      .content-sections :deep(.prose ul),
      .content-sections :deep(.prose ol) {
        @apply my-6 pl-6;
      }

      .content-sections :deep(.prose li) {
        @apply mb-2 leading-relaxed;
      }

      .content-sections :deep(.prose ul li)::marker {
        content: '▸';
        color: #4ca179;
        font-weight: bold;
      }

      .content-sections :deep(.prose ol li)::marker {
        color: #4ca179;
        font-weight: bold;
      }

      .content-sections :deep(.prose img) {
        @apply rounded-xl shadow-medium my-8;
      }

      .content-sections :deep(.prose strong) {
        @apply text-primary-800 font-bold;
      }

      .content-sections :deep(.prose em) {
        @apply text-primary-green-dark;
      }

      /* Action Module Enhancements */
      .takeaway-list {
        @apply space-y-3;
      }

      .takeaway-list li {
        @apply flex items-start gap-3 text-sm;
      }

      .takeaway-list li::before {
        content: '✓';
        @apply text-success-500 font-bold flex-shrink-0 mt-0.5;
      }

      .next-steps-grid {
        @apply grid grid-cols-1 md:grid-cols-3 gap-4 mt-4;
      }

      .next-step {
        @apply text-center p-4 bg-primary-white/50 rounded-lg;
      }

      .next-step h4 {
        @apply font-semibold text-primary-800 mb-2;
      }

      .next-step p {
        @apply text-sm text-secondary-600;
      }

      .share-buttons {
        @apply flex gap-3 flex-wrap;
      }

      /* Comments */
      .comments-section {
        @apply mt-12;
      }

      .comments-title {
        @apply text-2xl font-bold text-primary-800 mb-2;
      }

      .comments-subtitle {
        @apply text-secondary-600 mb-8;
      }

      .comment-form {
        @apply mb-8 pb-8 border-b border-primary-200;
      }

      .form-grid {
        @apply grid grid-cols-1 md:grid-cols-2 gap-4 mb-4;
      }

      .form-input {
        @apply px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green focus:outline-none transition-colors;
      }

      .form-textarea {
        @apply w-full px-4 py-3 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-primary-green focus:outline-none mb-4 transition-colors;
      }

      .comments-list {
        @apply space-y-6;
      }

      .comment {
        @apply border-l-4 border-primary-green/30 pl-4 pb-4;
      }

      .comment-header {
        @apply flex items-start justify-between mb-3;
      }

      .comment-author {
        @apply font-semibold text-primary-800;
      }

      .comment-date {
        @apply text-sm text-secondary-500;
      }

      .comment-text {
        @apply text-secondary-700 leading-relaxed;
      }

      .empty-comments {
        @apply text-center py-12 text-secondary-500;
      }

      /* Sidebar */
      .related-articles {
        @apply mb-6;
      }

      .related-title {
        @apply text-lg font-bold text-primary-800 mb-4;
      }

      .related-list {
        @apply space-y-4 mb-4;
      }

      .related-item {
        @apply block p-4 border border-primary-200 rounded-lg hover:border-primary-green/50 hover:bg-primary-green/5 transition-all duration-200;
      }

      .related-item-title {
        @apply font-semibold text-primary-800 mb-2 text-sm line-clamp-2;
      }

      .related-item-excerpt {
        @apply text-xs text-secondary-600 mb-3 line-clamp-2;
      }

      .related-item-tags {
        @apply flex gap-1 flex-wrap;
      }

      /* Mobile Responsiveness */
      @media (max-width: 1024px) {
        .content-grid {
          @apply grid-cols-1 gap-8;
        }

        .article-sidebar {
          @apply order-first lg:order-last;
        }

        .article-title {
          @apply text-3xl;
        }

        .article-excerpt {
          @apply text-lg;
        }
      }

      @media (max-width: 640px) {
        .article-meta {
          @apply flex-col items-start gap-2;
        }

        .form-grid {
          @apply grid-cols-1;
        }

        .share-buttons {
          @apply flex-col;
        }

        .next-steps-grid {
          @apply grid-cols-1;
        }
      }
    `,
  ],
})
export default class BlogPostPage {
  private content = injectContent<BlogPost>()
  private meta = inject(Meta)
  private title = inject(Title)
  private structuredDataService = inject(StructuredDataService)
  
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

    // Add structured data
    this.structuredDataService.addBlogPostSchema({
      title: post.title,
      excerpt: post.excerpt || '',
      date: post.date,
      url: post.url || '',
      cardImage: post.cardImage,
      tags: post.tags
    })
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

  onTocItemClick(item: any): void {
    // Optional: Add analytics or other tracking
    console.log('TOC item clicked:', item)
  }

  navigateToRelatedPosts(): void {
    // Navigate to blog page or related posts
    window.location.href = '/blog'
  }

  onNewsletterSignup(): void {
    // Handle newsletter signup
    alert('Newsletter signup functionality would be implemented here!')
  }

  getRelatedPosts(): BlogPost[] {
    // Mock related posts - in real implementation, this would fetch related content
    return [
      {
        title: 'Advanced TypeScript Patterns',
        slug: 'advanced-typescript-patterns',
        excerpt: 'Learn advanced TypeScript patterns for better code organization and type safety.',
        url: '/blog/advanced-typescript-patterns',
        date: 'January 5, 2025',
        tags: ['typescript', 'development', 'patterns'],
        content: ''
      },
      {
        title: 'Modern CSS Grid Layouts',
        slug: 'modern-css-grid-layouts',
        excerpt: 'Master CSS Grid to create complex, responsive layouts with ease.',
        url: '/blog/modern-css-grid-layouts', 
        date: 'December 28, 2024',
        tags: ['css', 'frontend', 'layouts'],
        content: ''
      }
    ].slice(0, 3)
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
