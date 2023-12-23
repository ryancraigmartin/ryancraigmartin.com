import { CommonModule, NgOptimizedImage, provideCloudinaryLoader } from '@angular/common'
import { Component } from '@angular/core'

@Component({
  selector: 'rcmdotcom-links',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  providers: [provideCloudinaryLoader('https://res.cloudinary.com/ryan-martin')],
})
export class LinksComponent {
  baseWhiteIconAssetUrl = 'https://res.cloudinary.com/ryan-martin/image/upload/icons/'
  profilePhoto = 'https://res.cloudinary.com/ryan-martin/image/upload/ryan-martin-profile-photo'
  links = [
    {
      url: 'https://www.linkedin.com/in/ryancraigmartin/',
      icon: this.baseWhiteIconAssetUrl + 'linkedin-icon-white.svg',
      text: 'LinkedIn',
    },
    {
      url: 'https://www.instagram.com/ryancraigmartin',
      icon: this.baseWhiteIconAssetUrl + 'instagram-icon-white.svg',
      text: 'Instagram',
    },
    {
      url: 'https://www.twitter.com/ryancraigmartin',
      // icon: this.baseWhiteIconAssetUrl + 'x-twitter-icon-white.svg',
      icon: 'https://res.cloudinary.com/ryan-martin/image/upload/v1703354823/icons/x-twitter-icon-white.svg',
      text: 'Twitter',
    },
    {
      url: 'https://github.com/ryancraigmartin',
      icon: this.baseWhiteIconAssetUrl + 'github-icon-white.svg',
      text: 'GitHub',
    },
    {
      url: 'https://open.spotify.com/playlist/1jzF8m0S75XQB5mPtq6Q7f?si=585cb45b69764772',
      icon: this.baseWhiteIconAssetUrl + 'headphones-icon-white.svg',
      text: 'Discover New Music',
    },
    {
      url: 'mailto:contact@ryanmartin.io',
      icon: this.baseWhiteIconAssetUrl + 'envelope-icon-white.svg',
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
