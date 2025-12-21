/**
 * Utility functions for categorizing and searching recipe ingredients.
 * Supports ingredient-based recipe search for pantry/fridge matching.
 */

import { MIN_INGREDIENT_MATCH_THRESHOLD } from '../constants/recipe.constants'

export type IngredientCategory =
  | 'protein'
  | 'vegetable'
  | 'grain'
  | 'legume'
  | 'dairy'
  | 'spice'
  | 'herb'
  | 'sauce'
  | 'oil'
  | 'nut'
  | 'fruit'
  | 'pantry'
  | 'other'

/**
 * Categorizes an ingredient based on its name.
 * Used for ingredient-based recipe search and filtering.
 */
export function categorizeIngredient(ingredientName: string): IngredientCategory {
  const name = ingredientName.toLowerCase()

  // Proteins
  if (
    name.includes('chicken') ||
    name.includes('beef') ||
    name.includes('pork') ||
    name.includes('fish') ||
    name.includes('shrimp') ||
    name.includes('tofu') ||
    name.includes('egg') ||
    name.includes('sausage')
  ) {
    return 'protein'
  }

  // Legumes
  if (
    name.includes('lentil') ||
    name.includes('bean') ||
    name.includes('chickpea') ||
    name.includes('pea')
  ) {
    return 'legume'
  }

  // Vegetables
  if (
    name.includes('pepper') ||
    name.includes('onion') ||
    name.includes('garlic') ||
    name.includes('tomato') ||
    name.includes('potato') ||
    name.includes('carrot') ||
    name.includes('celery') ||
    name.includes('greens') ||
    name.includes('spinach') ||
    name.includes('kale') ||
    name.includes('collard') ||
    name.includes('cabbage') ||
    name.includes('broccoli') ||
    name.includes('mushroom')
  ) {
    return 'vegetable'
  }

  // Grains
  if (
    name.includes('rice') ||
    name.includes('pasta') ||
    name.includes('noodle') ||
    name.includes('quinoa') ||
    name.includes('couscous') ||
    name.includes('bread')
  ) {
    return 'grain'
  }

  // Dairy
  if (
    name.includes('milk') ||
    name.includes('cream') ||
    name.includes('cheese') ||
    name.includes('yogurt') ||
    name.includes('butter')
  ) {
    return 'dairy'
  }

  // Spices
  if (
    name.includes('cumin') ||
    name.includes('turmeric') ||
    name.includes('garam masala') ||
    name.includes('paprika') ||
    name.includes('chile') ||
    name.includes('chili') ||
    name.includes('cayenne') ||
    name.includes('coriander') ||
    name.includes('fennel') ||
    name.includes('anise') ||
    name.includes('peppercorn') ||
    name.includes('pepper') ||
    name.includes('cinnamon') ||
    name.includes('cardamom') ||
    name.includes('clove')
  ) {
    return 'spice'
  }

  // Herbs
  if (
    name.includes('cilantro') ||
    name.includes('parsley') ||
    name.includes('basil') ||
    name.includes('thyme') ||
    name.includes('rosemary') ||
    name.includes('oregano') ||
    name.includes('bay')
  ) {
    return 'herb'
  }

  // Sauces and pastes
  if (
    name.includes('sauce') ||
    name.includes('paste') ||
    name.includes('curry') ||
    name.includes('soy') ||
    name.includes('fish sauce')
  ) {
    return 'sauce'
  }

  // Oils
  if (name.includes('oil') || name.includes('ghee')) {
    return 'oil'
  }

  // Nuts and seeds
  if (name.includes('nut') || name.includes('seed') || name.includes('sesame')) {
    return 'nut'
  }

  // Fruits and citrus
  if (
    name.includes('lemon') ||
    name.includes('lime') ||
    name.includes('orange') ||
    name.includes('mango') ||
    name.includes('coconut')
  ) {
    return 'fruit'
  }

  // Pantry staples
  if (
    name.includes('broth') ||
    name.includes('stock') ||
    name.includes('water') ||
    name.includes('vinegar') ||
    name.includes('salt') ||
    name.includes('sugar')
  ) {
    return 'pantry'
  }

  return 'other'
}

/**
 * Extracts all unique ingredients from a recipe, normalized to lowercase.
 * Useful for ingredient-based search and matching.
 */
export function extractRecipeIngredients(recipe: any): string[] {
  const ingredients = new Set<string>()

  recipe.ingredients?.forEach((ing: any) => {
    if (ing.name && !ing.section) {
      // Extract base ingredient name (remove preparation details in parentheses)
      const baseName = ing.name
        .toLowerCase()
        .replace(/\([^)]*\)/g, '') // Remove text in parentheses
        .replace(/,.*/, '') // Remove text after comma
        .trim()
      ingredients.add(baseName)
    }
  })

  return Array.from(ingredients)
}

/**
 * Calculates how many ingredients from the user's pantry/fridge
 * are present in the recipe.
 *
 * @param recipeIngredients - List of ingredients in the recipe
 * @param availableIngredients - List of ingredients user has
 * @returns Match score (0-1) representing percentage of matching ingredients
 */
export function calculateIngredientMatch(
  recipeIngredients: string[],
  availableIngredients: string[],
): number {
  if (recipeIngredients.length === 0) return 0

  const available = new Set(availableIngredients.map((i) => i.toLowerCase()))
  let matches = 0

  recipeIngredients.forEach((ingredient) => {
    const ingredientLower = ingredient.toLowerCase()
    // Check for exact match or partial match
    if (
      available.has(ingredientLower) ||
      Array.from(available).some((avail) => ingredientLower.includes(avail) || avail.includes(ingredientLower))
    ) {
      matches++
    }
  })

  return matches / recipeIngredients.length
}

/**
 * Filters recipes based on available ingredients.
 * Returns recipes sorted by match percentage (highest first).
 *
 * @param recipes - List of all recipes
 * @param availableIngredients - Ingredients the user has
 * @param minMatchThreshold - Minimum match percentage (0-1) to include recipe, defaults to 20%
 */
export function filterRecipesByIngredients(
  recipes: any[],
  availableIngredients: string[],
  minMatchThreshold: number = MIN_INGREDIENT_MATCH_THRESHOLD,
): Array<{ recipe: any; matchScore: number; missingIngredients: string[] }> {
  return recipes
    .map((recipe) => {
      const recipeIngredients = extractRecipeIngredients(recipe)
      const matchScore = calculateIngredientMatch(recipeIngredients, availableIngredients)

      const missingIngredients = recipeIngredients.filter((ingredient) => {
        const ingredientLower = ingredient.toLowerCase()
        const available = availableIngredients.map((i) => i.toLowerCase())
        return !available.some(
          (avail) => ingredientLower.includes(avail) || avail.includes(ingredientLower),
        )
      })

      return { recipe, matchScore, missingIngredients }
    })
    .filter((item) => item.matchScore >= minMatchThreshold)
    .sort((a, b) => b.matchScore - a.matchScore)
}
