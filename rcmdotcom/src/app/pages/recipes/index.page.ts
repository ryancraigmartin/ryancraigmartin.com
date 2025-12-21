import { Component, computed, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { RECIPES } from '../../data/recipes.data'
import { Recipe, RecipeIngredient } from '../../models/Recipe.interface'
import { filterRecipesByIngredients } from '../../utils/ingredient-categorization'
import { MIN_INGREDIENT_MATCH_THRESHOLD } from '../../constants/recipe.constants'

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <header class="text-center mb-12">
        <div class="inline-block relative">
          <h1 class="text-5xl font-bold text-primary-800 mb-3">Recipes</h1>
          <div
            class="absolute -bottom-2 left-0 w-full h-3 bg-primary-green opacity-30 transform -rotate-1"
          ></div>
        </div>
        <p class="text-xl text-secondary-700 mt-4">
          Delicious lentil-based and Thai recipes for every occasion
        </p>
      </header>

      <!-- Ingredient Search Section -->
      <div class="mb-8 bg-primary-white rounded-xl p-6 shadow-lg">
        <h2 class="text-2xl font-bold text-primary-800 mb-4">Find Recipes by Ingredients</h2>
        <p class="text-secondary-600 mb-4">
          Enter ingredients you have on hand (comma-separated) to find matching recipes
        </p>
        <div class="flex gap-3">
          <input
            type="text"
            [(ngModel)]="ingredientSearchInput"
            (input)="onIngredientSearchChange()"
            placeholder="e.g., chicken, rice, vegetables"
            class="flex-1 px-4 py-2 border-2 border-primary-green rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
            aria-label="Search by ingredients"
          />
          <button
            (click)="clearIngredientSearch()"
            class="px-6 py-2 bg-secondary-200 text-secondary-800 rounded-lg font-medium hover:bg-secondary-300 transition-colors"
          >
            Clear
          </button>
        </div>
        @if (searchIngredients().length > 0) {
        <div class="mt-4">
          <p class="text-sm font-semibold text-secondary-700 mb-2">Searching for:</p>
          <div class="flex flex-wrap gap-2">
            @for (ingredient of searchIngredients(); track ingredient) {
            <span
              class="px-3 py-1 bg-primary-green text-primary-white rounded-full text-sm font-medium"
            >
              {{ ingredient }}
            </span>
            }
          </div>
        </div>
        }
      </div>

      <!-- Navigation Tabs -->
      <div class="flex justify-center gap-4 mb-10">
        <button
          (click)="setActiveTab('recipes')"
          [class.bg-primary-green]="activeTab() === 'recipes'"
          [class.text-primary-white]="activeTab() === 'recipes'"
          [class.border-2]="activeTab() !== 'recipes'"
          [class.border-primary-green]="activeTab() !== 'recipes'"
          [class.text-primary-800]="activeTab() !== 'recipes'"
          class="px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary-green hover:text-primary-white transition-colors duration-300"
        >
          All Recipes
        </button>
        <button
          (click)="setActiveTab('shopping')"
          [class.bg-primary-green]="activeTab() === 'shopping'"
          [class.text-primary-white]="activeTab() === 'shopping'"
          [class.border-2]="activeTab() !== 'shopping'"
          [class.border-primary-green]="activeTab() !== 'shopping'"
          [class.text-primary-800]="activeTab() !== 'shopping'"
          class="px-6 py-3 rounded-lg text-sm font-medium hover:bg-primary-green hover:text-primary-white transition-colors duration-300"
        >
          Shopping List
        </button>
        <a
          routerLink="/recipes/compare"
          class="px-6 py-3 rounded-lg text-sm font-medium border-2 border-primary-green text-primary-800 hover:bg-primary-green hover:text-primary-white transition-colors duration-300"
        >
          Compare Recipes
        </a>
      </div>

      <!-- Recipe Cards Grid -->
      @if (activeTab() === 'recipes') {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        @for (recipe of filteredRecipes(); track recipe.id) {
        <article
          class="bg-primary-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex flex-col relative border-t-4"
          [class.border-amber-500]="recipe.meta.cuisine.includes('Thai')"
          [class.border-emerald-500]="!recipe.meta.cuisine.includes('Thai')"
        >
          <!-- Shopping List Badge (if selected) -->
          @if (selectedRecipes().has(recipe.id)) {
          <div class="absolute top-4 right-4 z-10">
            <span class="inline-flex items-center gap-1 bg-primary-green text-primary-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              </svg>
              In List
            </span>
          </div>
          }

          <!-- Cuisine Badge -->
          <div class="absolute top-4 left-4 z-10">
            @for (cuisine of recipe.meta.cuisine; track cuisine) {
            <span 
              class="inline-block px-3 py-1 rounded-full text-xs font-bold shadow-md"
              [class.bg-amber-100]="cuisine === 'Thai'"
              [class.text-amber-800]="cuisine === 'Thai'"
              [class.bg-emerald-100]="cuisine !== 'Thai'"
              [class.text-emerald-800]="cuisine !== 'Thai'"
            >
              {{ cuisine }}
            </span>
            }
          </div>

          <!-- Recipe Header (clickable) -->
          <div
            class="p-6 pt-12 border-b border-primary-alabaster flex-grow cursor-pointer hover:bg-primary-alabaster/20 transition-colors"
            [routerLink]="['/recipes', recipe.id]"
          >
            <h2 class="text-2xl font-bold text-primary-800 mb-2">{{ recipe.title }}</h2>
            <p class="text-secondary-600 mb-4">{{ recipe.description }}</p>

            <!-- Time Info -->
            <div class="flex flex-wrap gap-4 text-sm text-secondary-500">
              <span>⏱️ Prep: {{ recipe.prepTime }}</span>
              <span>🍳 Cook: {{ recipe.cookTime }}</span>
              <span>⏰ Total: {{ recipe.totalTime }}</span>
            </div>
          </div>

          <!-- Features Tags -->
          <div class="px-6 py-4 flex flex-wrap gap-2">
            @for (feature of recipe.meta.features.slice(0, 3); track feature) {
            <span
              class="px-3 py-1 text-xs font-medium bg-primary-alabaster rounded-full text-secondary-700"
            >
              {{ feature }}
            </span>
            }
          </div>

          <!-- Action Buttons -->
          <div class="px-6 pb-6 flex gap-3">
            <button
              (click)="toggleRecipe(recipe.id); $event.stopPropagation()"
              [class.bg-primary-green]="selectedRecipes().has(recipe.id)"
              [class.text-primary-white]="selectedRecipes().has(recipe.id)"
              [class.bg-primary-alabaster]="!selectedRecipes().has(recipe.id)"
              [class.text-primary-800]="!selectedRecipes().has(recipe.id)"
              class="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium hover:opacity-80 transition-all duration-300 border-2 border-transparent hover:border-primary-green"
              [attr.aria-label]="selectedRecipes().has(recipe.id) ? 'Remove from shopping list' : 'Add to shopping list'"
              type="button"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              </svg>
              @if (selectedRecipes().has(recipe.id)) {
                <span>In List</span>
              } @else {
                <span>Add to List</span>
              }
            </button>
            <button
              [routerLink]="['/recipes', recipe.id]"
              class="flex-1 bg-primary-green text-primary-white px-4 py-2 rounded-lg font-medium hover:bg-primary-800 transition-colors duration-300"
              type="button"
            >
              View Recipe →
            </button>
          </div>
        </article>
        }
        @if (filteredRecipes().length === 0 && searchIngredients().length > 0) {
        <div class="col-span-full text-center py-12 bg-primary-alabaster rounded-xl">
          <h3 class="text-2xl font-bold text-primary-800 mb-3">No matching recipes found</h3>
          <p class="text-secondary-600">
            Try searching with different ingredients or
            <button
              (click)="clearIngredientSearch()"
              class="text-primary-green font-semibold hover:underline"
            >
              clear the search
            </button>
            to see all recipes.
          </p>
        </div>
        }
      </div>
      }

      <!-- Shopping List Section -->
      @if (activeTab() === 'shopping') {
      <div class="bg-primary-white rounded-xl p-8 shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-3xl font-bold text-primary-800">Consolidated Shopping List</h2>
          <button
            (click)="clearShoppingList()"
            class="px-4 py-2 bg-secondary-200 text-secondary-800 rounded-lg text-sm font-medium hover:bg-secondary-300 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-semibold text-secondary-700 mb-2">
            Select Recipes to Include:
          </label>
          <div class="flex flex-wrap gap-3">
            @for (recipe of recipes(); track recipe.id) {
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                [checked]="selectedRecipes().has(recipe.id)"
                (change)="toggleRecipe(recipe.id)"
                class="w-5 h-5 rounded border-2 border-primary-green text-primary-green focus:ring-primary-green"
              />
              <span class="text-secondary-700">{{ recipe.title }}</span>
            </label>
            }
          </div>
        </div>

        @if (consolidatedIngredients().length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (category of categories(); track category) {
          <div>
            <h3 class="font-bold text-primary-green mb-3 text-lg border-b border-primary-green pb-2">
              {{ category }}
            </h3>
            <ul class="space-y-2">
              @for (item of getIngredientsByCategory(category); track item.name) {
              <li class="flex items-start gap-2">
                <input
                  type="checkbox"
                  [checked]="checkedShoppingItems().has(item.name)"
                  (change)="toggleShoppingItem(item.name)"
                  class="mt-1 w-4 h-4 rounded border-2 border-primary-green text-primary-green focus:ring-primary-green cursor-pointer"
                />
                <span
                  [class.line-through]="checkedShoppingItems().has(item.name)"
                  [class.text-secondary-400]="checkedShoppingItems().has(item.name)"
                  class="text-secondary-700 text-sm"
                >
                  {{ item.name }}
                </span>
              </li>
              }
            </ul>
          </div>
          }
        </div>
        } @else {
        <div class="text-center py-12 text-secondary-500">
          <p>Select recipes above to generate a shopping list.</p>
        </div>
        }
      </div>
      }
    </div>

    <!-- Persistent Shopping List Footer -->
    @if (selectedRecipes().size > 0 && activeTab() === 'recipes') {
    <div class="fixed bottom-0 left-0 right-0 bg-primary-green text-primary-white shadow-2xl z-50 animate-slide-up">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-4">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            <div>
              <div class="font-bold text-lg">{{ selectedRecipes().size }} {{ selectedRecipes().size === 1 ? 'Recipe' : 'Recipes' }} Selected</div>
              <div class="text-sm opacity-90">{{ consolidatedIngredients().length }} total ingredients</div>
            </div>
          </div>
          <div class="flex gap-3">
            <button
              (click)="setActiveTab('shopping')"
              class="px-6 py-3 bg-primary-white text-primary-green rounded-lg font-bold hover:bg-primary-alabaster transition-colors duration-300 shadow-lg"
              type="button"
            >
              View Shopping List →
            </button>
            <button
              (click)="clearAllSelections()"
              class="px-4 py-3 bg-transparent border-2 border-primary-white text-primary-white rounded-lg font-medium hover:bg-primary-800 transition-colors duration-300"
              type="button"
              aria-label="Clear all selections"
            >
              Clear All
            </button>
          </div>
        </div>
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
        padding-bottom: 100px; /* Space for fixed footer */
      }
      @keyframes slide-up {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }
      .animate-slide-up {
        animation: slide-up 0.3s ease-out;
      }
    `,
  ],
})
export default class RecipesIndexPage {
  recipes = signal<Recipe[]>(RECIPES)
  activeTab = signal<'recipes' | 'shopping'>('recipes')
  selectedRecipes = signal<Set<string>>(new Set())
  checkedShoppingItems = signal<Set<string>>(new Set())
  private shoppingListKey = 'recipe-shopping-list-selections'

  constructor() {
    // Load shopping list selections from localStorage on init
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.shoppingListKey)
        if (stored) {
          const selections = JSON.parse(stored) as string[]
          this.selectedRecipes.set(new Set(selections))
        }
      } catch (error) {
        console.error('Error loading shopping list:', error)
      }
    }
  }

  // Ingredient search
  ingredientSearchInput = ''
  searchIngredients = signal<string[]>([])
  filteredRecipes = computed(() => {
    const searchTerms = this.searchIngredients()
    if (searchTerms.length === 0) {
      return this.recipes()
    }

    const matches = filterRecipesByIngredients(this.recipes(), searchTerms, MIN_INGREDIENT_MATCH_THRESHOLD)
    return matches.map((m) => m.recipe)
  })

  // Consolidated ingredients from selected recipes
  consolidatedIngredients = computed(() => {
    const selected = this.selectedRecipes()
    if (selected.size === 0) return []

    const ingredientMap = new Map<string, RecipeIngredient>()

    this.recipes().forEach((recipe) => {
      if (selected.has(recipe.id)) {
        recipe.ingredients.forEach((ing) => {
          if (ing.section) return // Skip section headers
          const key = ing.name.toLowerCase()
          if (ingredientMap.has(key)) {
            const existing = ingredientMap.get(key)!
            // Combine amounts if same unit
            if (existing.unit === ing.unit) {
              existing.amount += ing.amount
            }
          } else {
            ingredientMap.set(key, { ...ing })
          }
        })
      }
    })

    return Array.from(ingredientMap.values())
  })

  // Categories for organizing shopping list
  categories = computed(() => {
    const ingredients = this.consolidatedIngredients()
    const cats = new Set<string>()

    ingredients.forEach((ing) => {
      const cat = this.categorizeIngredient(ing.name)
      cats.add(cat)
    })

    return Array.from(cats).sort()
  })

  setActiveTab(tab: 'recipes' | 'shopping') {
    this.activeTab.set(tab)
  }

  onIngredientSearchChange() {
    const ingredients = this.ingredientSearchInput
      .split(',')
      .map((i) => i.trim().toLowerCase())
      .filter((i) => i.length > 0)
    this.searchIngredients.set(ingredients)
  }

  clearIngredientSearch() {
    this.ingredientSearchInput = ''
    this.searchIngredients.set([])
  }

  toggleRecipe(recipeId: string) {
    this.selectedRecipes.update((selected) => {
      const newSelected = new Set(selected)
      if (newSelected.has(recipeId)) {
        newSelected.delete(recipeId)
      } else {
        newSelected.add(recipeId)
      }
      return newSelected
    })
    // Save to localStorage
    if (typeof window !== 'undefined') {
      try {
        const selections = Array.from(this.selectedRecipes())
        localStorage.setItem(this.shoppingListKey, JSON.stringify(selections))
      } catch (error) {
        console.error('Error saving shopping list:', error)
      }
    }
  }

  toggleShoppingItem(itemName: string) {
    this.checkedShoppingItems.update((checked) => {
      const newChecked = new Set(checked)
      if (newChecked.has(itemName)) {
        newChecked.delete(itemName)
      } else {
        newChecked.add(itemName)
      }
      return newChecked
    })
  }

  clearShoppingList() {
    this.checkedShoppingItems.set(new Set())
  }

  clearAllSelections() {
    this.selectedRecipes.set(new Set())
    this.checkedShoppingItems.set(new Set())
    // Clear from localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(this.shoppingListKey)
      } catch (error) {
        console.error('Error clearing shopping list:', error)
      }
    }
  }

  getIngredientsByCategory(category: string): RecipeIngredient[] {
    return this.consolidatedIngredients().filter(
      (ing) => this.categorizeIngredient(ing.name) === category,
    )
  }

  private categorizeIngredient(name: string): string {
    const lowerName = name.toLowerCase()

    if (
      lowerName.includes('pepper') ||
      lowerName.includes('onion') ||
      lowerName.includes('garlic') ||
      lowerName.includes('tomato') ||
      lowerName.includes('potato') ||
      lowerName.includes('greens') ||
      lowerName.includes('cilantro') ||
      lowerName.includes('parsley') ||
      lowerName.includes('lemon') ||
      lowerName.includes('lime')
    ) {
      return 'Produce'
    }

    if (
      lowerName.includes('cumin') ||
      lowerName.includes('turmeric') ||
      lowerName.includes('garam masala') ||
      lowerName.includes('paprika') ||
      lowerName.includes('chile') ||
      lowerName.includes('chili') ||
      lowerName.includes('cayenne') ||
      lowerName.includes('coriander') ||
      lowerName.includes('fennel') ||
      lowerName.includes('anise') ||
      lowerName.includes('peppercorn')
    ) {
      return 'Spices'
    }

    if (
      lowerName.includes('lentil') ||
      lowerName.includes('broth') ||
      lowerName.includes('water') ||
      lowerName.includes('bay') ||
      lowerName.includes('milk') ||
      lowerName.includes('paste')
    ) {
      return 'Pantry'
    }

    if (lowerName.includes('oil')) {
      return 'Oils & Condiments'
    }

    return 'Other'
  }
}
