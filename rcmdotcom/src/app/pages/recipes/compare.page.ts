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
          <h1 class="text-5xl font-bold text-primary-800 mb-3">Compare Recipes</h1>
          <div
            class="absolute -bottom-2 left-0 w-full h-3 bg-primary-green opacity-30 transform -rotate-1"
          ></div>
        </div>
        <p class="text-xl text-secondary-700 mt-4">Compare all lentil stew variations side by side</p>
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

      <!-- Comparison Table -->
      <div class="overflow-x-auto bg-primary-white rounded-xl shadow-lg">
        <table class="w-full">
          <thead>
            <tr class="border-b border-primary-alabaster">
              <th class="p-4 text-left text-sm font-semibold text-primary-800 w-1/4">Property</th>
              @for (recipe of recipes(); track recipe.id) {
              <th class="p-4 text-left text-sm font-semibold text-primary-800">
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
              @for (recipe of recipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.description }}</td>
              }
            </tr>

            <!-- Prep Time -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Prep Time</td>
              @for (recipe of recipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.prepTime }}</td>
              }
            </tr>

            <!-- Cook Time -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Cook Time</td>
              @for (recipe of recipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.cookTime }}</td>
              }
            </tr>

            <!-- Total Time -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Total Time</td>
              @for (recipe of recipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.totalTime }}</td>
              }
            </tr>

            <!-- Servings -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Base Servings</td>
              @for (recipe of recipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.baseServings }}</td>
              }
            </tr>

            <!-- Cuisine -->
            <tr class="border-b border-primary-alabaster hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Cuisine</td>
              @for (recipe of recipes(); track recipe.id) {
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
              @for (recipe of recipes(); track recipe.id) {
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
              @for (recipe of recipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.ingredients.length }} items</td>
              }
            </tr>

            <!-- Steps Count -->
            <tr class="hover:bg-primary-alabaster/30">
              <td class="p-4 font-medium text-secondary-700">Instructions</td>
              @for (recipe of recipes(); track recipe.id) {
              <td class="p-4 text-secondary-600">{{ recipe.instructions.length }} steps</td>
              }
            </tr>
          </tbody>
        </table>
      </div>

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
  recipes = signal<Recipe[]>(RECIPES)
}
