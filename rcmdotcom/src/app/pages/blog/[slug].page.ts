import { MarkdownComponent, injectContent } from '@analogjs/content'
import { AsyncPipe, NgIf } from '@angular/common'
import { Component } from '@angular/core'
import { BlogPost } from '../../post'

@Component({
  standalone: true,
  imports: [MarkdownComponent, NgIf, AsyncPipe],
  template: `
    <div *ngIf="post$ | async as post">
      <h1>{{ post.attributes.title }}</h1>
      <br>
      <analog-markdown [content]="post.content" />
    </div>
  `,
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>()
}
