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

/**
 * Recipe category filters for quick comparison
 * Each entry contains a category name and associated recipe IDs
 */
export const RECIPE_CATEGORY_FILTERS = {
  lentils: ['elevated-lentil-stew', 'mexican-inspired-stew', 'indian-spiced-curry'],
  soups: ['tom-yum-goong', 'tom-yum-kai', 'kaeng-chud-pak-ruam', 'tom-yum-pla', 'tom-yum-talay'],
  salads: ['green-papaya-salad', 'yum-woon-sen', 'yum-neau', 'yum-talay', 'yum-pla-duk-fu'],
  beverages: ['thai-iced-coffee', 'thai-iced-tea'],
  appetizers: ['fish-patties', 'shrimp-rolls', 'crisp-noodles', 'stuffed-tofu', 'bangkok-stuffed-wings', 'summer-rolls', 'crispy-crab-claws', 'crispy-fried-shrimp', 'satay-on-skewers', 'son-in-law-eggs', 'vegetable-tempura'],
  curries: ['red-curry', 'green-curry', 'yellow-curry', 'massaman-curry', 'panang-curry', 'jungle-curry', 'penang-kai', 'kaeng-kari-kai'],
} as const;

