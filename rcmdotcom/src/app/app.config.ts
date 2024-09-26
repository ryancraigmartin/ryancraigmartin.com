import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideClientHydration } from '@angular/platform-browser'
import { provideFileRouter } from '@analogjs/router'
import { provideContent, withMarkdownRenderer } from '@analogjs/content'
import { inject } from '@vercel/analytics'

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideContent(withMarkdownRenderer()),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        inject({ mode: isDevMode() ? 'development' : 'production' })
      },
    },
  ],
}
