export interface RecipeIngredient {
  section?: string // Optional section header (e.g., "Spice Blend")
  name: string // Ingredient name
  amount: number // Base amount
  unit: string // Unit of measurement
}

export interface RecipeInstruction {
  title: string // Step title
  description: string // Detailed instructions
  timer?: number // Optional timer in seconds
}

export interface RecipeMeta {
  cuisine: string[] // Cuisine types for filtering
  features: string[] // Special features (quick, freezer-friendly, etc.)
}

export interface Recipe {
  id: string // URL-safe slug (e.g., 'elevated-lentil-stew')
  title: string // Display title
  description: string // Short description for cards/SEO
  prepTime: string // Formatted time (e.g., "15 min")
  cookTime: string // Formatted time (e.g., "30 min")
  totalTime: string // Formatted time (e.g., "45 min")
  baseServings: number // Default serving count
  ingredients: RecipeIngredient[]
  instructions: RecipeInstruction[]
  toppings: string[] // Recommended toppings/additions
  notes: string[] // Chef's notes and tips
  meta: RecipeMeta
}
