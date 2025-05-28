import { injectContent } from '@analogjs/content'
import { CommonModule, NgIf } from '@angular/common'
import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, signal } from '@angular/core'

import { FormsModule } from '@angular/forms'
import { BlogPost } from '../../models/BlogPost.interface'

@Component({
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="blog-post-container" *ngIf="post()">
      <!-- Hero Section -->
      <div class="hero-section" [style.backgroundImage]="'url(' + post()?.cardImage + ')'">
        <div class="hero-overlay">
          <h1 class="hero-title">{{ post()?.title }}</h1>
          <p class="hero-date">{{ post()?.date | date : 'longDate' }}</p>
        </div>
      </div>

      <!-- Content Section -->
      <section class="blog-post-content">
        <analog-markdown [content]="post()?.content"></analog-markdown>
        <div class="media-gallery">
          <img *ngFor="let image of post()?.cardImage" [src]="image" alt="Media" class="media-item" />
        </div>
      </section>

      <!-- Comments Section -->
      <section class="comments-section">
        <h2>Comments</h2>
        <div class="comments-list">
          <div *ngFor="let comment of comments()">
            <p><strong>{{ comment.author }}</strong>: {{ comment.text }}</p>
          </div>
        </div>
        <form (submit)="addComment($event)">
          <input type="text" [(ngModel)]="newComment" placeholder="Add a comment..." />
          <button type="submit">Post</button>
        </form>
      </section>

      <!-- Footer -->
      <footer class="blog-post-footer">
        <p>Published on {{ post()?.date | date : 'longDate' }}</p>
        <p class="blog-post-share">
          Share this post:
          <a href="https://twitter.com/intent/tweet?text={{ post()?.title }}&url={{ post()?.slug }}" target="_blank" class="share-link">Twitter</a>
          |
          <a href="https://www.facebook.com/sharer/sharer.php?u={{ post()?.slug }}" target="_blank" class="share-link">Facebook</a>
        </p>
      </footer>
    </div>
  `,
  styles: [
    `
      .blog-post-container {
        font-family: 'Inter', Arial, sans-serif;
        color: #333;
      }

      /* Hero Section */
      .hero-section {
        height: 400px;
        background-size: cover;
        background-position: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hero-overlay {
        background: rgba(0, 0, 0, 0.5);
        padding: 2rem;
        text-align: center;
        border-radius: 8px;
      }

      .hero-title {
        font-size: 3rem;
        color: #fff;
        margin-bottom: 0.5rem;
      }

      .hero-date {
        font-size: 1.2rem;
        color: #ddd;
      }

      /* Content Section */
      .blog-post-content {
        max-width: 800px;
        margin: 2rem auto;
        line-height: 1.8;
        font-size: 1.2rem;
      }

      .media-gallery {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }

      .media-item {
        width: 100%;
        max-width: 300px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      /* Comments Section */
      .comments-section {
        max-width: 800px;
        margin: 2rem auto;
      }

      .comments-list {
        margin-bottom: 1rem;
      }

      .comments-list div {
        margin-bottom: 0.5rem;
      }

      .comments-section form {
        display: flex;
        gap: 0.5rem;
      }

      .comments-section input {
        flex: 1;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      .comments-section button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
      }

      /* Footer */
      .blog-post-footer {
        text-align: center;
        margin-top: 2rem;
        font-size: 1rem;
        color: #666;
      }

      .blog-post-share {
        margin-top: 1rem;
      }

      .share-link {
        color: #007bff;
        text-decoration: none;
      }

      .share-link:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export default class BlogPostPage {
  private content = injectContent<BlogPost>()
  post = signal<BlogPost | null>(null)
  comments = signal<{ author: string; text: string }[]>([])
  newComment = ''

  constructor() {
    effect(() => {
      this.content.subscribe({
        next: data => {
          if (data && 'attributes' in data) {
            this.post.set({
              title: data.attributes.title,
              date: data.attributes.date,
              content: data.content,
              cardImage: data.attributes.cardImage,
              excerpt: data.attributes.excerpt,
              slug: data.attributes.slug,
              url: data.attributes.url,
              tags: data.attributes.tags || [],
            })
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

  addComment(event: Event): void {
    event.preventDefault()
    if (this.newComment.trim()) {
      this.comments.update(comments => [...comments, { author: 'You', text: this.newComment }])
      this.newComment = ''
    }
  }
}
