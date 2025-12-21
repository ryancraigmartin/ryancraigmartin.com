/**
 * Recipe application constants
 * Centralized configuration for recipe-related features
 */

/**
 * Default recipe IDs for comparison view
 * These recipes are selected by default when loading the comparison page
 */
export const DEFAULT_COMPARISON_RECIPES = [
  'elevated-lentil-stew',
  'mexican-inspired-stew',
  'indian-spiced-curry',
] as const;

/**
 * Minimum ingredient match threshold for recipe search
 * Recipes with less than this percentage match will be filtered out
 * Value: 0.2 = 20% minimum match required
 */
export const MIN_INGREDIENT_MATCH_THRESHOLD = 0.2;
