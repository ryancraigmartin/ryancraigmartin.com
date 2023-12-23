import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1><b>Blog</b></h1>
    <br />
    <router-outlet />
  `,
})
export default class BlogPage {}
