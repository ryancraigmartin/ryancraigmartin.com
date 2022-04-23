import { Injectable } from '@angular/core'
import { CustomClickEvent } from './analytics.types'

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor() {}

  sendGA4Event(event: CustomClickEvent): void {
    const event_name = event.event_name
    delete event.event_name
    gtag('event', event_name, {
      ...event,
    })
  }
}
