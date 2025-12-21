import { Recipe } from '../models/Recipe.interface'
import { LENTIL_RECIPES } from './lentil-recipes.data'
import { THAI_RECIPES } from './thai-recipes.data'

// Combine lentil recipes with Thai recipes
export const RECIPES: Recipe[] = [...LENTIL_RECIPES, ...THAI_RECIPES]

