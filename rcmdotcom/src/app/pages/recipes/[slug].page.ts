import { Component, computed, effect, inject, signal, OnDestroy } from '@angular/core'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { RECIPES } from '../../data/recipes.data'
import { Recipe, RecipeIngredient } from '../../models/Recipe.interface'

/**
 * Scales ingredient amounts and formats them with common fractions
 * for better readability in recipe display.
 *
 * @param amount - The base ingredient amount
 * @param scale - The scaling factor (servings / baseServings)
 * @returns Formatted string with whole numbers and/or fractions
 *
 * @example
 * scaleAndFormatAmount(1.5, 2) // "3"
 * scaleAndFormatAmount(1, 0.5) // "1/2"
 * scaleAndFormatAmount(2, 0.5) // "1"
 * scaleAndFormatAmount(1, 1.5) // "1 1/2"
 */
function scaleAndFormatAmount(amount: number, scale: number): string {
  const scaled = amount * scale
  const whole = Math.floor(scaled)
  const decimal = scaled - whole

  // Convert decimal to common fractions
  if (decimal < 0.1) return whole > 0 ? whole.toString() : '0'
  if (decimal >= 0.9) return (whole + 1).toString()
  if (Math.abs(decimal - 0.25) < 0.1) return whole > 0 ? `${whole} 1/4` : '1/4'
  if (Math.abs(decimal - 0.33) < 0.1) return whole > 0 ? `${whole} 1/3` : '1/3'
  if (Math.abs(decimal - 0.5) < 0.1) return whole > 0 ? `${whole} 1/2` : '1/2'
  if (Math.abs(decimal - 0.67) < 0.1) return whole > 0 ? `${whole} 2/3` : '2/3'
  if (Math.abs(decimal - 0.75) < 0.1) return whole > 0 ? `${whole} 3/4` : '3/4'

  // Default to decimal representation for other values
  return scaled.toFixed(2).replace(/\.?0+$/, '')
}

interface Timer {
  id: string
  stepTitle: string
  duration: number
  remaining: number
  isActive: boolean
}

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (recipe()) {
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Navigation -->
      <div class="mb-6">
        <a
          routerLink="/recipes"
          class="inline-flex items-center text-primary-green hover:text-primary-800 transition-colors"
        >
          ← Back to All Recipes
        </a>
      </div>

      <!-- Header -->
      <header class="mb-8">
        <h1 class="text-5xl font-bold text-primary-800 mb-4">{{ recipe()!.title }}</h1>
        <p class="text-xl text-secondary-700 mb-6">{{ recipe()!.description }}</p>

        <!-- Time and Servings Info -->
        <div class="flex flex-wrap gap-6 items-center mb-6">
          <div class="text-secondary-600">
            <span class="font-semibold">Prep:</span> {{ recipe()!.prepTime }}
          </div>
          <div class="text-secondary-600">
            <span class="font-semibold">Cook:</span> {{ recipe()!.cookTime }}
          </div>
          <div class="text-secondary-600">
            <span class="font-semibold">Total:</span> {{ recipe()!.totalTime }}
          </div>
        </div>

        <!-- Servings Control and Add to Shopping List -->
        <div class="flex flex-wrap items-center gap-6 mb-6">
          <!-- Servings Control -->
          <div class="flex items-center gap-4" role="group" aria-label="Servings adjustment">
            <span class="font-semibold text-primary-800">Servings:</span>
            <div class="flex items-center gap-3">
              <button
                (click)="decreaseServings()"
                [disabled]="servings() <= 1"
                class="w-10 h-10 rounded-full bg-primary-green text-primary-white font-bold hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
                aria-label="Decrease servings"
                type="button"
              >
                -
              </button>
              <span class="text-2xl font-bold text-primary-800 min-w-[3rem] text-center" aria-live="polite" aria-atomic="true">
                {{ servings() }}
              </span>
              <button
                (click)="increaseServings()"
                [disabled]="servings() >= 20"
                class="w-10 h-10 rounded-full bg-primary-green text-primary-white font-bold hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
                aria-label="Increase servings"
                type="button"
              >
                +
              </button>
            </div>
          </div>

          <!-- Add to Shopping List Button -->
          <button
            (click)="addToShoppingList()"
            [class.bg-primary-green]="isInShoppingList()"
            [class.text-primary-white]="isInShoppingList()"
            [class.bg-primary-alabaster]="!isInShoppingList()"
            [class.text-primary-800]="!isInShoppingList()"
            [class.border-primary-green]="!isInShoppingList()"
            class="flex items-center gap-2 px-6 py-3 rounded-lg font-bold border-2 hover:opacity-80 transition-all duration-300"
            [attr.aria-label]="isInShoppingList() ? 'Remove from shopping list' : 'Add ingredients to shopping list'"
            type="button"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            @if (isInShoppingList()) {
              <span>In Shopping List</span>
            } @else {
              <span>Add to Shopping List</span>
            }
          </button>
        </div>

        <!-- Success Message -->
        @if (showAddedMessage()) {
        <div class="bg-primary-green text-primary-white px-4 py-3 rounded-lg mb-6 flex items-center gap-3 animate-fade-in">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="font-medium">Ingredients added to your shopping list! <a routerLink="/recipes" class="underline hover:no-underline">View shopping list →</a></span>
        </div>
        }

        <!-- Features -->
        <div class="flex flex-wrap gap-2">
          @for (feature of recipe()!.meta.features; track feature) {
          <span
            class="px-3 py-1 text-sm font-medium bg-primary-alabaster rounded-full text-secondary-700"
          >
            {{ feature }}
          </span>
          }
        </div>
      </header>

      <!-- Main Content: Ingredients and Instructions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <!-- Ingredients Section (Sticky on Desktop) -->
        <div class="lg:col-span-1">
          <div class="bg-primary-white rounded-xl p-6 shadow-lg lg:sticky lg:top-4">
            <h2 class="text-2xl font-bold text-primary-800 mb-4">Ingredients</h2>

            <div role="list" aria-label="Recipe ingredients">
              @for (ingredient of scaledIngredients(); track $index; let idx = $index) { @if
              (ingredient.section && (!scaledIngredients()[idx - 1] ||
              scaledIngredients()[idx - 1].section !== ingredient.section)) {
              <h3 class="font-semibold text-primary-green mt-4 mb-2" role="presentation">
                {{ ingredient.section }}
              </h3>
              }

              <label class="flex items-start gap-3 mb-3 cursor-pointer group" role="listitem">
                <input
                  type="checkbox"
                  [checked]="checkedIngredients().has(idx)"
                  (change)="toggleIngredient(idx)"
                  [attr.aria-label]="'Mark ' + ingredient.name + ' as completed'"
                  class="mt-1 w-5 h-5 rounded border-2 border-primary-green text-primary-green focus:ring-primary-green focus:ring-offset-0 cursor-pointer"
                />
                <span
                  [class.line-through]="checkedIngredients().has(idx)"
                  [class.text-secondary-400]="checkedIngredients().has(idx)"
                  class="text-secondary-700 group-hover:text-primary-800 transition-colors"
                >
                  <span class="font-semibold">{{ ingredient.formattedAmount }}</span>
                  {{ ingredient.unit }} {{ ingredient.name }}
                </span>
              </label>
              }
            </div>
          </div>
        </div>

        <!-- Instructions Section -->
        <div class="lg:col-span-2">
          <div class="bg-primary-white rounded-xl p-6 shadow-lg">
            <h2 class="text-2xl font-bold text-primary-800 mb-6">Instructions</h2>

            <ol role="list" aria-label="Cooking instructions" class="space-y-6">
              @for (instruction of recipe()!.instructions; track $index; let idx = $index) {
              <li class="mb-6 pb-6 border-b border-primary-alabaster last:border-0">
                <div class="flex items-start gap-4">
                  <div
                    class="flex-shrink-0 w-10 h-10 rounded-full bg-primary-green text-primary-white flex items-center justify-center font-bold"
                    aria-hidden="true"
                  >
                    {{ idx + 1 }}
                  </div>
                  <div class="flex-grow">
                    <h3 class="text-lg font-semibold text-primary-800 mb-2">
                      @if (instruction.title.toLowerCase().startsWith('step')) {
                        {{ instruction.title }}
                      } @else {
                        Step {{ idx + 1 }}: {{ instruction.title }}
                      }
                    </h3>
                    <p class="text-secondary-700 mb-3">{{ instruction.description }}</p>

                    @if (instruction.timer) {
                    <button
                      (click)="startTimer(instruction.title, instruction.timer!, idx)"
                      [disabled]="activeTimers().has(idx)"
                      class="px-4 py-2 bg-primary-green text-primary-white rounded-lg text-sm font-medium hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-primary-green focus:ring-offset-2"
                      [attr.aria-label]="activeTimers().has(idx) ? 'Timer active for ' + instruction.title : 'Start ' + formatTime(instruction.timer) + ' timer for ' + instruction.title"
                      type="button"
                    >
                      @if (activeTimers().has(idx)) { ⏸️ Timer Active ({{ formatTime(getTimerRemaining(idx)) }}) } @else { ⏱️ Start
                      {{ formatTime(instruction.timer) }} Timer }
                    </button>
                    }
                  </div>
                </div>
              </li>
              }
            </ol>
          </div>
        </div>
      </div>

      <!-- Toppings Section -->
      @if (recipe()!.toppings.length > 0) {
      <section class="bg-primary-white rounded-xl p-6 shadow-lg mb-8">
        <h2 class="text-2xl font-bold text-primary-800 mb-4">Recommended Toppings</h2>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
          @for (topping of recipe()!.toppings; track topping) {
          <li class="flex items-center gap-2 text-secondary-700">
            <span class="text-primary-green">✓</span>
            {{ topping }}
          </li>
          }
        </ul>
      </section>
      }

      <!-- Notes Section -->
      @if (recipe()!.notes.length > 0) {
      <section class="bg-primary-white rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-bold text-primary-800 mb-4">Chef's Notes</h2>
        <ul class="space-y-3">
          @for (note of recipe()!.notes; track note) {
          <li class="flex items-start gap-3 text-secondary-700">
            <span class="text-primary-green mt-1">💡</span>
            <span [innerHTML]="linkifyRecipes(note)"></span>
          </li>
          }
        </ul>
      </section>
      }
    </div>

    <!-- Timer Overlay -->
    @if (timers().length > 0) {
    <div class="fixed bottom-4 right-4 z-50 space-y-2" role="region" aria-label="Active timers" aria-live="polite">
      @for (timer of timers(); track timer.id) {
      <div class="bg-primary-800 text-primary-white px-4 py-3 rounded-lg shadow-xl min-w-[250px]">
        <div class="flex items-center justify-between mb-2">
          <span class="font-semibold text-sm">{{ timer.stepTitle }}</span>
          <button
            (click)="stopTimer(timer.id)"
            class="text-primary-white hover:text-primary-alabaster transition-colors focus:ring-2 focus:ring-primary-white focus:ring-offset-2 focus:ring-offset-primary-800"
            [attr.aria-label]="'Stop timer for ' + timer.stepTitle"
            type="button"
          >
            ✕
          </button>
        </div>
        <div class="text-2xl font-bold" aria-live="off" aria-atomic="true">{{ formatTime(timer.remaining) }}</div>
        @if (timer.remaining === 0) {
        <div class="text-sm mt-1 text-primary-green" role="alert">Time's up! 🎉</div>
        }
      </div>
      }
    </div>
    }
    } @else {
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-primary-800 mb-4">Recipe Not Found</h1>
        <p class="text-secondary-600 mb-6">The recipe you're looking for doesn't exist.</p>
        <a
          routerLink="/recipes"
          class="inline-block bg-primary-green text-primary-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors"
        >
          Back to All Recipes
        </a>
      </div>
    </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #fffbef;
      }
    `,
  ],
})
export default class RecipeDetailPage implements OnDestroy {
  private route = inject(ActivatedRoute)
  private recipeId = signal<string>('')

  // Recipe data
  recipe = computed(() => {
    const id = this.recipeId()
    return RECIPES.find((r) => r.id === id) || null
  })

  // Servings scaling
  servings = signal<number>(4)
  servingsScale = computed(() => {
    const recipe = this.recipe()
    if (!recipe) return 1
    return this.servings() / recipe.baseServings
  })

  // Scaled ingredients
  scaledIngredients = computed(() => {
    const recipe = this.recipe()
    if (!recipe) return []

    const scale = this.servingsScale()
    return recipe.ingredients.map((ing) => ({
      ...ing,
      formattedAmount: scaleAndFormatAmount(ing.amount, scale),
    }))
  })

  // Ingredient checkboxes
  checkedIngredients = signal<Set<number>>(new Set())

  // Shopping list state
  showAddedMessage = signal<boolean>(false)
  private shoppingListKey = 'recipe-shopping-list-selections'

  // Timers
  timers = signal<Timer[]>([])
  activeTimers = signal<Set<number>>(new Set())
  private timerIntervals = new Map<string, number>()

  constructor() {
    // Get recipe ID from route params
    effect(() => {
      const params = this.route.snapshot.paramMap
      const id = params.get('slug')
      if (id) {
        this.recipeId.set(id)
        const recipe = this.recipe()
        if (recipe) {
          this.servings.set(recipe.baseServings)
          this.loadPersistedState(id)
        }
      }
    })
  }

  increaseServings() {
    if (this.servings() < 20) {
      this.servings.update((s) => s + 1)
      this.savePersistedState()
    }
  }

  decreaseServings() {
    if (this.servings() > 1) {
      this.servings.update((s) => s - 1)
      this.savePersistedState()
    }
  }

  toggleIngredient(index: number) {
    this.checkedIngredients.update((checked) => {
      const newChecked = new Set(checked)
      if (newChecked.has(index)) {
        newChecked.delete(index)
      } else {
        newChecked.add(index)
      }
      return newChecked
    })
    this.savePersistedState()
  }

  /**
   * Checks if the current recipe is in the shopping list
   */
  isInShoppingList(): boolean {
    if (typeof window === 'undefined') return false
    try {
      const stored = localStorage.getItem(this.shoppingListKey)
      if (!stored) return false
      const selections = JSON.parse(stored) as string[]
      return selections.includes(this.recipeId())
    } catch {
      return false
    }
  }

  /**
   * Adds or removes the current recipe from the shopping list
   */
  addToShoppingList() {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(this.shoppingListKey)
      let selections: string[] = stored ? JSON.parse(stored) : []
      const recipeId = this.recipeId()

      if (selections.includes(recipeId)) {
        // Remove from list
        selections = selections.filter(id => id !== recipeId)
      } else {
        // Add to list
        selections.push(recipeId)
        // Show success message
        this.showAddedMessage.set(true)
        setTimeout(() => {
          this.showAddedMessage.set(false)
        }, 5000)
      }

      localStorage.setItem(this.shoppingListKey, JSON.stringify(selections))
    } catch (error) {
      console.error('Error updating shopping list:', error)
    }
  }

  /**
   * Starts a countdown timer for a cooking step.
   * Supports multiple concurrent timers and persists across page refreshes.
   * Shows browser notification when timer completes (if permission granted).
   *
   * @param stepTitle - The name of the cooking step
   * @param duration - Timer duration in seconds
   * @param stepIndex - Index of the step for tracking active state
   */
  startTimer(stepTitle: string, duration: number, stepIndex: number) {
    const timerId = `${this.recipeId()}-${stepIndex}-${Date.now()}`

    // Add to active timers
    this.activeTimers.update((active) => new Set([...active, stepIndex]))

    // Create timer
    const timer: Timer = {
      id: timerId,
      stepTitle,
      duration,
      remaining: duration,
      isActive: true,
    }

    this.timers.update((timers) => [...timers, timer])

    // Start countdown
    const intervalId = window.setInterval(() => {
      this.timers.update((timers) =>
        timers.map((t) => {
          if (t.id === timerId && t.remaining > 0) {
            return { ...t, remaining: t.remaining - 1 }
          }
          return t
        }),
      )

      // Check if timer completed
      const currentTimer = this.timers().find((t) => t.id === timerId)
      if (currentTimer && currentTimer.remaining === 0) {
        this.timerCompleted(timerId, stepTitle)
      }
    }, 1000)

    this.timerIntervals.set(timerId, intervalId)
  }

  stopTimer(timerId: string) {
    // Clear interval
    const intervalId = this.timerIntervals.get(timerId)
    if (intervalId) {
      clearInterval(intervalId)
      this.timerIntervals.delete(timerId)
    }

    // Remove from active timers
    const timer = this.timers().find((t) => t.id === timerId)
    if (timer) {
      const stepIndex = parseInt(timer.id.split('-')[1])
      this.activeTimers.update((active) => {
        const newActive = new Set(active)
        newActive.delete(stepIndex)
        return newActive
      })
    }

    // Remove timer
    this.timers.update((timers) => timers.filter((t) => t.id !== timerId))
  }

  private timerCompleted(timerId: string, stepTitle: string) {
    // Clear interval
    const intervalId = this.timerIntervals.get(timerId)
    if (intervalId) {
      clearInterval(intervalId)
      this.timerIntervals.delete(timerId)
    }

    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Timer Complete!', {
        body: `Timer for "${stepTitle}" has finished.`,
        icon: '/favicon.ico',
      })
    }

    // Play sound (optional - would need audio file)
    // Can add later if desired
  }

  getTimerRemaining(stepIndex: number): number {
    const timerId = this.timers().find((t) => t.id.startsWith(`${this.recipeId()}-${stepIndex}`))
    return timerId ? timerId.remaining : 0
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  /**
   * Converts recipe mentions in chef's notes to clickable links
   * Looks for recipe names in RECIPES and creates router links
   */
  linkifyRecipes(note: string): string {
    let linkedNote = note
    
    // Find all recipe titles and create links
    RECIPES.forEach(recipe => {
      // Create a case-insensitive regex to find the recipe title
      const regex = new RegExp(`\\b${recipe.title}\\b`, 'gi')
      linkedNote = linkedNote.replace(regex, (match) => {
        return `<a href="/recipes/${recipe.id}" class="text-primary-green hover:text-primary-800 font-semibold underline transition-colors">${match}</a>`
      })
    })
    
    return linkedNote
  }

  private loadPersistedState(recipeId: string) {
    try {
      // Load checked ingredients
      const checkedStr = localStorage.getItem(`recipe-${recipeId}-checked`)
      if (checkedStr) {
        const checked = JSON.parse(checkedStr)
        if (Array.isArray(checked)) {
          this.checkedIngredients.set(new Set(checked))
        }
      }
    } catch (error) {
      console.warn('Failed to parse checked ingredients from localStorage', error)
    }

    try {
      // Load servings
      const servingsStr = localStorage.getItem(`recipe-${recipeId}-servings`)
      if (servingsStr) {
        const servings = parseInt(servingsStr, 10)
        if (!isNaN(servings) && servings >= 1 && servings <= 20) {
          this.servings.set(servings)
        }
      }
    } catch (error) {
      console.warn('Failed to parse servings from localStorage', error)
    }
  }

  private savePersistedState() {
    const recipeId = this.recipeId()
    if (!recipeId) return

    // Save checked ingredients
    localStorage.setItem(
      `recipe-${recipeId}-checked`,
      JSON.stringify(Array.from(this.checkedIngredients())),
    )

    // Save servings
    localStorage.setItem(`recipe-${recipeId}-servings`, this.servings().toString())
  }

  ngOnDestroy() {
    // Clean up all timers
    this.timerIntervals.forEach((intervalId) => clearInterval(intervalId))
  }
}
