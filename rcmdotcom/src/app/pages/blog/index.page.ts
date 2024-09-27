import { Component } from '@angular/core'
import { AsyncPipe, NgFor } from '@angular/common'
import { injectContentFiles } from '@analogjs/content'
import { RouterLink } from '@angular/router'
import { BlogPost } from '../../BlogPost.types'
import './blog.css'

@Component({
  standalone: true,
  imports: [NgFor, RouterLink, AsyncPipe],
  template: `
    <div class="blog-container">
      <h2>Recent Posts:</h2>
      <br />
      <ul>
        <li *ngFor="let post of posts">
          <a [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</a>
        </li>
      </ul>
    </div>
  `,
})
export default class IndexPage {
  posts = injectContentFiles<BlogPost>()
}