import { CommonModule, NgOptimizedImage } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
    selector: 'rcmdotcom-footer',
    imports: [CommonModule, NgOptimizedImage, RouterLink],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
  angularLogo =
    'https://res.cloudinary.com/ryan-martin/image/upload/q_auto/icons/angular-logo-full.svg'
}
