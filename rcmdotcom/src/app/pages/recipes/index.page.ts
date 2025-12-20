import { Component, signal } from '@angular/core'
import { RouterLink } from '@angular/router'
import { RECIPES } from '../../data/recipes.data'
import { Recipe } from '../../models/Recipe.interface'

@Component({
  standalone: true,
  imports: [RouterLink],
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
          Delicious lentil-based recipes for every occasion
        </p>
      </header>

      <!-- Navigation Tabs -->
      <div class="flex justify-center gap-4 mb-10">
        <a
          routerLink="/recipes"
          class="px-6 py-3 rounded-lg text-sm font-medium bg-primary-green text-primary-white transition-colors duration-300"
        >
          All Recipes
        </a>
        <a
          routerLink="/recipes/compare"
          class="px-6 py-3 rounded-lg text-sm font-medium border-2 border-primary-green text-primary-800 hover:bg-primary-green hover:text-primary-white transition-colors duration-300"
        >
          Compare Recipes
        </a>
      </div>

      <!-- Recipe Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        @for (recipe of recipes(); track recipe.id) {
        <article
          class="bg-primary-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          [routerLink]="['/recipes', recipe.id]"
        >
          <!-- Recipe Header -->
          <div class="p-6 border-b border-primary-alabaster">
            <h2 class="text-2xl font-bold text-primary-800 mb-2">{{ recipe.title }}</h2>
            <p class="text-secondary-600 mb-4">{{ recipe.description }}</p>

            <!-- Time Info -->
            <div class="flex gap-4 text-sm text-secondary-500">
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

          <!-- View Recipe Button -->
          <div class="px-6 pb-6">
            <button
              class="w-full bg-primary-green text-primary-white px-4 py-2 rounded-lg font-medium hover:bg-primary-800 transition-colors duration-300"
            >
              View Recipe →
            </button>
          </div>
        </article>
        }
      </div>

      <!-- Shopping List Section -->
      <section class="bg-primary-white rounded-xl p-8 shadow-lg">
        <h2 class="text-3xl font-bold text-primary-800 mb-4">Shopping List</h2>
        <p class="text-secondary-600 mb-6">
          Click on a recipe to view its detailed ingredients and generate a shopping list.
        </p>
        <div class="text-center">
          <a
            routerLink="/recipes/compare"
            class="inline-block bg-primary-green text-primary-white px-6 py-3 rounded-lg font-medium hover:bg-primary-800 transition-colors duration-300"
          >
            Compare All Recipes
          </a>
        </div>
      </section>
    </div>
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
export default class RecipesIndexPage {
  recipes = signal<Recipe[]>(RECIPES)
}
