import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AnalyticsService } from './analytics.service'

@NgModule({
  imports: [CommonModule],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
