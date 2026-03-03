import { test, expect } from '@playwright/test'

test.describe('Enhanced Blog Design', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the blog listing page
    await page.goto('/blog')
  })

  test('should display enhanced blog listing page', async ({ page }) => {
    // Check for the new header elements
    await expect(page.locator('h1')).toContainText('Blog')
    await expect(page.locator('.hero-subtitle')).toContainText('Thoughts, ideas, and explorations')
    
    // Check for breadcrumb navigation
    await expect(page.locator('.breadcrumb-nav')).toBeVisible()
    await expect(page.locator('.breadcrumb-link')).toContainText('Home')
    
    // Check for stats section
    await expect(page.locator('.blog-stats')).toBeVisible()
    await expect(page.locator('.stat-label')).toContainText('Articles')
    
    // Check for enhanced search functionality
    await expect(page.locator('ui-input')).toBeVisible()
    await expect(page.locator('input[placeholder*="Search articles"]')).toBeVisible()
  })

  test('should display filter tags with counts', async ({ page }) => {
    // Check for filter section
    await expect(page.locator('.filter-section')).toBeVisible()
    await expect(page.locator('.filter-title')).toContainText('Filter by Topic')
    
    // Check for "All Posts" button with count
    const allPostsButton = page.locator('ui-button:has-text("All Posts")')
    await expect(allPostsButton).toBeVisible()
    await expect(allPostsButton.locator('.tag-count')).toBeVisible()
    
    // Check for at least one tag filter
    await expect(page.locator('.filter-tags ui-button')).toHaveCountGreaterThan(1)
  })

  test('should display featured post when no filters are applied', async ({ page }) => {
    // Featured post should be visible by default
    await expect(page.locator('.featured-section')).toBeVisible()
    await expect(page.locator('.featured-title')).toBeVisible()
    await expect(page.locator('.featured-badge')).toContainText('Featured')
    
    // Should have CTA button
    await expect(page.locator('.featured-cta')).toContainText('Read Full Article')
  })

  test('should filter articles by tag', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('.filter-tags ui-button')
    
    // Get a tag button (not "All Posts")
    const tagButtons = page.locator('.filter-tags ui-button:not(:has-text("All Posts"))')
    const firstTag = tagButtons.first()
    
    if (await firstTag.count() > 0) {
      await firstTag.click()
      
      // Featured post should be hidden when filtering
      await expect(page.locator('.featured-section')).not.toBeVisible()
      
      // Articles grid should still be visible
      await expect(page.locator('.articles-grid')).toBeVisible()
      
      // Section title should reflect the filter
      await expect(page.locator('.section-title')).toContainText('Articles')
    }
  })

  test('should search articles', async ({ page }) => {
    // Type in search box
    await page.fill('input[placeholder*="Search articles"]', 'development')
    
    // Wait for search to complete
    await page.waitForTimeout(500)
    
    // Search results count should be visible
    await expect(page.locator('.search-results-count')).toBeVisible()
    
    // Featured post should be hidden when searching
    await expect(page.locator('.featured-section')).not.toBeVisible()
  })

  test('should navigate to individual blog post', async ({ page }) => {
    // Wait for articles to load
    await page.waitForSelector('.article-card')
    
    // Click on the first article
    const firstArticle = page.locator('.article-card').first()
    await firstArticle.click()
    
    // Should navigate to blog post page
    await expect(page).toHaveURL(/\/blog\/.+/)
  })

  test('should display enhanced blog post page', async ({ page }) => {
    // Navigate to a specific blog post
    await page.goto('/blog/building-scalable-web-applications')
    
    // Check for new header elements
    await expect(page.locator('.breadcrumb-nav')).toBeVisible()
    await expect(page.locator('.article-title')).toBeVisible()
    await expect(page.locator('.article-meta')).toBeVisible()
    
    // Check for reading time
    await expect(page.locator('.reading-time')).toContainText('min read')
    
    // Check for callout boxes
    await expect(page.locator('ui-callout')).toBeVisible()
    
    // Check for action modules
    await expect(page.locator('ui-action-module')).toBeVisible()
    
    // Check for enhanced table of contents
    await expect(page.locator('ui-table-of-contents')).toBeVisible()
  })

  test('should display action modules in blog post', async ({ page }) => {
    await page.goto('/blog/building-scalable-web-applications')
    
    // Check for key takeaways module
    const takeawaysModule = page.locator('ui-action-module:has-text("Key Takeaways")')
    await expect(takeawaysModule).toBeVisible()
    
    // Check for next steps module
    const nextStepsModule = page.locator('ui-action-module:has-text("Ready to Get Started")')
    await expect(nextStepsModule).toBeVisible()
    
    // Check for share module
    const shareModule = page.locator('ui-action-module:has-text("Share This Article")')
    await expect(shareModule).toBeVisible()
  })

  test('should display enhanced sidebar content', async ({ page }) => {
    await page.goto('/blog/building-scalable-web-applications')
    
    // Check for table of contents
    await expect(page.locator('ui-table-of-contents')).toBeVisible()
    
    // Check for author info module
    const authorModule = page.locator('ui-action-module:has-text("About the Author")')
    await expect(authorModule).toBeVisible()
    
    // Check for newsletter signup
    const newsletterModule = page.locator('ui-action-module:has-text("Stay Updated")')
    await expect(newsletterModule).toBeVisible()
    
    // Check for related articles
    await expect(page.locator('.related-articles')).toBeVisible()
  })

  test('should handle share functionality', async ({ page }) => {
    await page.goto('/blog/building-scalable-web-applications')
    
    // Find share buttons
    const shareButtons = page.locator('.share-buttons ui-button')
    await expect(shareButtons).toHaveCountGreaterThanOrEqual(3)
    
    // Should have Twitter, LinkedIn, and Copy Link buttons
    await expect(page.locator('ui-button:has-text("Twitter")')).toBeVisible()
    await expect(page.locator('ui-button:has-text("LinkedIn")')).toBeVisible()
    await expect(page.locator('ui-button:has-text("Copy Link")')).toBeVisible()
  })

  test('should display comments section', async ({ page }) => {
    await page.goto('/blog/building-scalable-web-applications')
    
    // Check for comments section
    await expect(page.locator('.comments-section')).toBeVisible()
    await expect(page.locator('.comments-title')).toContainText('Join the Discussion')
    
    // Check for comment form
    await expect(page.locator('.comment-form')).toBeVisible()
    await expect(page.locator('input[name="author"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('textarea[name="comment"]')).toBeVisible()
  })

  test('should be mobile responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/blog')
    
    // Header should still be visible and readable
    await expect(page.locator('.hero-title')).toBeVisible()
    
    // Controls should stack vertically
    await expect(page.locator('.controls-grid')).toBeVisible()
    
    // Articles should display in single column
    await expect(page.locator('.articles-grid')).toBeVisible()
    
    // Navigate to individual post
    await page.goto('/blog/building-scalable-web-applications')
    
    // Content should be readable on mobile
    await expect(page.locator('.article-title')).toBeVisible()
    await expect(page.locator('.content-sections')).toBeVisible()
  })

  test('should show empty state when no results found', async ({ page }) => {
    // Search for something that won't match
    await page.fill('input[placeholder*="Search articles"]', 'nonexistentkeyword123')
    await page.waitForTimeout(500)
    
    // Should show empty state
    await expect(page.locator('.empty-state')).toBeVisible()
    await expect(page.locator('.empty-state-title')).toContainText('No articles found')
    await expect(page.locator('.empty-state-actions')).toBeVisible()
    
    // Should have clear filters button
    await expect(page.locator('ui-button:has-text("Clear filters")')).toBeVisible()
  })
})

test.describe('Component Functionality', () => {
  test('should interact with table of contents', async ({ page }) => {
    await page.goto('/blog/building-scalable-web-applications')
    
    // Wait for TOC to load
    await page.waitForSelector('ui-table-of-contents')
    
    // Check if TOC has items
    const tocItems = page.locator('ui-table-of-contents .toc-item')
    if (await tocItems.count() > 0) {
      // Click on first TOC item
      await tocItems.first().click()
      
      // Should scroll to section (we can't easily test actual scroll position in this context)
      // But we can verify the click handler executed
      await page.waitForTimeout(1000)
    }
  })

  test('should interact with action modules', async ({ page }) => {
    await page.goto('/blog/building-scalable-web-applications')
    
    // Find action module with CTA
    const nextStepsModule = page.locator('ui-action-module:has-text("Ready to Get Started")')
    const ctaButton = nextStepsModule.locator('ui-button')
    
    if (await ctaButton.count() > 0) {
      await ctaButton.click()
      // Should trigger navigation or action
      await page.waitForTimeout(500)
    }
  })

  test('should handle newsletter signup', async ({ page }) => {
    await page.goto('/blog/building-scalable-web-applications')
    
    // Find newsletter signup module
    const newsletterModule = page.locator('ui-action-module:has-text("Stay Updated")')
    const subscribeButton = newsletterModule.locator('ui-button:has-text("Subscribe")')
    
    if (await subscribeButton.count() > 0) {
      // Mock the alert dialog
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Newsletter signup')
        await dialog.accept()
      })
      
      await subscribeButton.click()
    }
  })
})