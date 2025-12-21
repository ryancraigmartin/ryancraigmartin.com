import { Component, signal, computed } from '@angular/core'
import { RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { RECIPES } from '../../data/recipes.data'
import { Recipe } from '../../models/Recipe.interface'

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <header class="text-center mb-12">
        <div class="inline-block relative">
          <h1 class="text-5xl font-bold text-primary-800 mb-3">Compare Recipes</h1>
          <div
            class="absolute -bottom-2 left-0 w-full h-3 bg-primary-green opacity-30 transform -rotate-1"
          ></div>
        </div>
        <p class="text-xl text-secondary-700 mt-4">Compare selected recipes side by side</p>
      </header>

      <!-- Navigation Tabs -->
      <div class="flex justify-center gap-4 mb-10">
        <a
          routerLink="/recipes"
          class="px-6 py-3 rounded-lg text-sm font-medium border-2 border-primary-green text-primary-800 hover:bg-primary-green hover:text-primary-white transition-colors duration-300"
        >
          All Recipes
        </a>
        <a
          routerLink="/recipes/compare"
          class="px-6 py-3 rounded-lg text-sm font-medium bg-primary-green text-primary-white transition-colors duration-300"
        >
          Compare Recipes
        </a>
      </div>

      <!-- Recipe Selection -->
      <div class="bg-primary-white rounded-xl p-6 shadow-lg mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-primary-800">Select Recipes to Compare</h2>
          <div class="flex gap-3">
            <button
              (click)="selectLentilRecipes()"
              class="px-4 py-2 bg-primary-alabaster text-primary-800 rounded-lg text-sm font-medium hover:bg-primary-green hover:text-primary-white transition-colors"
              type="button"
            >
              Lentil Stews Only
            </button>
            <button
              (click)="clearSelections()"
              class="px-4 py-2 bg-secondary-200 text-secondary-800 rounded-lg text-sm font-medium hover:bg-secondary-300 transition-colors"
              type="button"
            >
              Clear All
            </button>
          </div>
        </div>

        <div class="mb-4">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="filterRecipes()"
            placeholder="Search recipes by name..."
            class="w-full px-4 py-2 border-2 border-primary-alabaster rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
          @for (recipe of filteredAvailableRecipes(); track recipe.id) {
          <label class="flex items-center gap-2 p-3 rounded-lg bg-primary-alabaster/30 hover:bg-primary-alabaster cursor-pointer transition-colors">
            <input
              type="checkbox"
              [checked]="selectedRecipeIds().has(recipe.id)"
              (change)="toggleRecipeSelection(recipe.id)"
              class="w-5 h-5 rounded border-2 border-primary-green text-primary-green focus:ring-primary-green"
            />
            <span class="text-sm text-secondary-700 flex-1">{{ recipe.title }}</span>
          </label>
          }
        </div>

        @if (selectedRecipeIds().size === 0) {
        <div class="text-center py-6 text-secondary-500">
          <p>Select at least one recipe to compare.</p>
        </div>
        } @else {
        <div class="mt-4 text-center text-primary-green font-semibold">
          {{ selectedRecipeIds().size }} {{ selectedRecipeIds().size === 1 ? 'recipe' : 'recipes' }} selected for comparison
        </div>
        }
      </div>

      <!-- Comparison Table -->
      @if (selectedRecipes().length > 0) {
      <div class="overflow-x-auto bg-primary-white rounded-xl shadow-lg">
        <table class="w-full">
          <thead>
            <tr class="border-b border-primary-alabaster">
              <th class="p-4 text-left text-sm font-semibold text-primary-800 sticky left-0 bg-primary-white z-10 min-w-[150px]">Property</th>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <th class="p-4 text-left text-sm font-semibold text-primary-800 min-w-[200px]">
                <a
                  [routerLink]="['/recipes', recipe.id]"
                  class="hover:text-primary-green transition-colors"
                >
                  {{ recipe.title }}
                </a>
              </th>
              }
            </tr>
          </thead>
          <tbody>
            <!-- Description -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Description</td>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.description }}</td>
              }
            </tr>

            <!-- Prep Time -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Prep Time</td>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.prepTime }}</td>
              }
            </tr>

            <!-- Cook Time -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Cook Time</td>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.cookTime }}</td>
              }
            </tr>

            <!-- Total Time -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Total Time</td>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.totalTime }}</td>
              }
            </tr>

            <!-- Servings -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Base Servings</td>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.baseServings }}</td>
              }
            </tr>

            <!-- Cuisine -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Cuisine</td>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <td class="p-4">
                <div class="flex flex-wrap gap-1">
                  @for (cuisine of recipe.meta.cuisine; track cuisine) {
                  <span
                    class="px-2 py-1 text-xs font-medium bg-primary-green/20 rounded text-primary-800"
                  >
                    {{ cuisine }}
                  </span>
                  }
                </div>
              </td>
              }
            </tr>

            <!-- Features -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Features</td>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <td class="p-4">
                <div class="flex flex-wrap gap-1">
                  @for (feature of recipe.meta.features; track feature) {
                  <span
                    class="px-2 py-1 text-xs font-medium bg-primary-alabaster rounded text-secondary-700"
                  >
                    {{ feature }}
                  </span>
                  }
                </div>
              </td>
              }
            </tr>

            <!-- Ingredients Count -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Ingredients</td>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.ingredients.length }} items</td>
              }
            </tr>

            <!-- Steps Count -->
            <tr class="hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Instructions</td>
              @for (recipe of selectedRecipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.instructions.length }} steps</td>
              }
            </tr>
          </tbody>
        </table>
      </div>
      } @else {
      <div class="bg-primary-white rounded-xl p-12 shadow-lg text-center">
        <svg class="w-16 h-16 mx-auto mb-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        <h3 class="text-2xl font-bold text-primary-800 mb-3">No Recipes Selected</h3>
        <p class="text-secondary-600 mb-6">Select recipes above to see a side-by-side comparison.</p>
      </div>
      }

      <!-- Back to All Recipes -->
      <div class="mt-10 text-center">
        <a
          routerLink="/recipes"
          class="inline-block bg-primary-green text-primary-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors duration-300"
        >
          ← Back to All Recipes
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
        background: #fffbef;
      }

      table {
        border-collapse: collapse;
      }

      @media (max-width: 768px) {
        table {
          font-size: 0.875rem;
        }

        th,
        td {
          padding: 0.75rem !important;
        }
      }
    `,
  ],
})
export default class RecipesComparePage {
  allRecipes = RECIPES
  selectedRecipeIds = signal<Set<string>>(new Set(['elevated-lentil-stew', 'mexican-inspired-stew', 'indian-spiced-curry']))
  searchTerm = ''
  filteredAvailableRecipes = signal<Recipe[]>(RECIPES)

  selectedRecipes = computed(() => {
    const selected = this.selectedRecipeIds()
    return this.allRecipes.filter(r => selected.has(r.id))
  })

  toggleRecipeSelection(recipeId: string) {
    this.selectedRecipeIds.update(selected => {
      const newSelected = new Set(selected)
      if (newSelected.has(recipeId)) {
        newSelected.delete(recipeId)
      } else {
        newSelected.add(recipeId)
      }
      return newSelected
    })
  }

  selectLentilRecipes() {
    this.selectedRecipeIds.set(new Set(['elevated-lentil-stew', 'mexican-inspired-stew', 'indian-spiced-curry']))
  }

  clearSelections() {
    this.selectedRecipeIds.set(new Set())
  }

  filterRecipes() {
    const term = this.searchTerm.toLowerCase().trim()
    if (!term) {
      this.filteredAvailableRecipes.set(this.allRecipes)
    } else {
      this.filteredAvailableRecipes.set(
        this.allRecipes.filter(r =>
          r.title.toLowerCase().includes(term) ||
          r.description.toLowerCase().includes(term)
        )
      )
    }
  }
}
