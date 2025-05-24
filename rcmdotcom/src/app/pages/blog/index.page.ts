import { Component } from '@angular/core'
import { AsyncPipe, NgFor } from '@angular/common'
import { injectContentFiles } from '@analogjs/content'
import { RouterLink } from '@angular/router'
import { BlogPost } from '../../BlogPost.types'

@Component({
    imports: [NgFor, RouterLink, AsyncPipe],
    template: `
    <h2>Recent Posts:</h2>
    <br />
    <ul>
      @for (post of posts; track post.slug) {
        <li>
          <a [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</a>
        </li>
      }
    </ul>
  `
})
export default class IndexPage {
  posts = injectContentFiles<BlogPost>()
}
