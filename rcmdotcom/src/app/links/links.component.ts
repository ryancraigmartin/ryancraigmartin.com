import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'rcmdotcom-links',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent {
  profilePhoto =
    'https://res.cloudinary.com/ryan-martin/image/upload/f_auto/q_auto/ryan-martin-profile-photo.webp'
  links = [
    {
      url: 'https://www.linkedin.com/in/ryancraigmartin/',
      icon: 'fab fa-linkedin',
      text: 'LinkedIn',
    },
    {
      url: 'https://www.instagram.com/ryancraigmartin',
      icon: 'fab fa-instagram',
      text: 'Instagram',
    },
    {
      url: 'https://www.twitter.com/ryancraigmartin',
      icon: 'fab fa-twitter',
      text: 'Twitter',
    },
    {
      url: 'https://github.com/ryancraigmartin',
      icon: 'fab fa-github',
      text: 'GitHub',
    },
    {
      url: 'https://open.spotify.com/playlist/1jzF8m0S75XQB5mPtq6Q7f?si=585cb45b69764772',
      icon: 'fas fa-headphones-alt',
      text: 'Discover New Music',
    },
    {
      url: 'mailto:contact@ryanmartin.io',
      icon: 'far fa-envelope',
      text: 'Email Me',
    },
    // {
    //   url: 'https://ryanmartin-resume.netlify.app',
    //   icon: 'far fa-file',
    //   text: 'Resume',
    // },
    // {
    //   url: 'https://open.spotify.com/user/1230181600?si=224fb6f0b902456f',
    //   icon: 'fab fa-spotify',
    //   text: 'Spotify',
    // },
    // {
    //   url: 'https://namecheap.pxf.io/ryancraigmartin',
    //   icon: 'far fa-address-card',
    //   text: 'Get your own .COM',
    // },
    // {
    //   url: 'https://www.youtube.com/channel/UCvV0JZfZDxo_o-tz9VZz2hw',
    //   icon: 'fab fa-youtube',
    //   text: 'Subscribe on YouTube',
    // },
  ]
}
