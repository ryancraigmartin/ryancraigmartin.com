import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { LinksComponent } from './links.component'

@NgModule({
  declarations: [LinksComponent],
  imports: [CommonModule],
  exports: [LinksComponent],
})
export class LinksModule {}
