import { Injectable, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

interface StructuredDataSchema {
  '@context': string
  '@type': string
  [key: string]: any
}

@Injectable({
  providedIn: 'root'
})
export class StructuredDataService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  addStructuredData(schema: StructuredDataSchema): void {
    const script = this.document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(schema)
    
    // Remove any existing structured data
    this.removeStructuredData()
    
    // Add new structured data
    this.document.head.appendChild(script)
  }

  removeStructuredData(): void {
    const existingScripts = this.document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => script.remove())
  }

  addBlogPostSchema(post: {
    title: string
    excerpt: string
    date: string
    url: string
    cardImage?: string
    tags?: string[]
  }): void {
    const schema: StructuredDataSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: new Date(post.date).toISOString(),
      dateModified: new Date(post.date).toISOString(),
      author: {
        '@type': 'Person',
        name: 'Ryan Craig Martin',
        url: 'https://ryancraigmartin.com'
      },
      publisher: {
        '@type': 'Person',
        name: 'Ryan Craig Martin',
        url: 'https://ryancraigmartin.com'
      },
      url: post.url,
      image: post.cardImage || 'https://ryancraigmartin.com/assets/images/default-blog.jpg',
      keywords: post.tags?.join(', ') || '',
      articleSection: 'Technology',
      inLanguage: 'en-US'
    }

    this.addStructuredData(schema)
  }

  addWebsiteSchema(): void {
    const schema: StructuredDataSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Ryan Craig Martin',
      url: 'https://ryancraigmartin.com',
      description: 'Engineering Program Manager and Audio Engineer sharing insights on technology, development, and productivity.',
      author: {
        '@type': 'Person',
        name: 'Ryan Craig Martin',
        jobTitle: 'Engineering Program Manager',
        url: 'https://ryancraigmartin.com',
        sameAs: [
          'https://linkedin.com/in/ryancraigmartin',
          'https://github.com/ryancraigmartin',
          'https://twitter.com/ryancraigmartin'
        ]
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://ryancraigmartin.com/blog?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }

    this.addStructuredData(schema)
  }

  addPersonSchema(): void {
    const schema: StructuredDataSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ryan Craig Martin',
      jobTitle: 'Engineering Program Manager',
      description: 'Engineering Program Manager and Audio Engineer passionate about building scalable software solutions and creating engaging audio experiences.',
      url: 'https://ryancraigmartin.com',
      image: 'https://ryancraigmartin.com/assets/images/profile.jpg',
      sameAs: [
        'https://linkedin.com/in/ryancraigmartin',
        'https://github.com/ryancraigmartin',
        'https://twitter.com/ryancraigmartin',
        'https://instagram.com/ryancraigmartin'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Sommsation',
        url: 'https://sommsation.com'
      },
      knowsAbout: [
        'Software Engineering',
        'Program Management',
        'Audio Engineering',
        'Web Development',
        'Angular',
        'TypeScript',
        'Project Management'
      ]
    }

    this.addStructuredData(schema)
  }
}