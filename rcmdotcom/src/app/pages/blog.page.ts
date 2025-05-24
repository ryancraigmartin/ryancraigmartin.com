import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
    imports: [RouterOutlet],
    template: `
    <h1><b>Blog</b></h1>
    <br />
    <router-outlet />
  `
})
export default class BlogPage {}
