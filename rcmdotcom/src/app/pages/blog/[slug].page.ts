import { MarkdownComponent, injectContent } from '@analogjs/content'
import { AsyncPipe, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { BlogPost } from '../../BlogPost.types'
import { Router } from '@angular/router'
import './blog.css'

@Component({
  standalone: true,
  imports: [MarkdownComponent, NgIf, AsyncPipe],
  template: `
    <div class="blog-container" *ngIf="post$ | async as post">
      <button (click)="goBack()" class="back-button">Back to Blog</button>
      <h1>{{ post.attributes.title }}</h1>
      <br />
      <analog-markdown [content]="post.content" />
    </div>
  `,
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>()

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/blog'])
  }
}
