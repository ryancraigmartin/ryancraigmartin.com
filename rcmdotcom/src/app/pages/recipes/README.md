# Recipe Application

A comprehensive recipe management system for lentil-based recipes, featuring interactive cooking tools and shopping list generation.

## Features

### Recipe Browsing
- **Overview Page** (`/recipes`): Browse all available recipes with quick stats
- **Recipe Detail Pages** (`/recipes/[slug]`): Full recipe view with interactive features
- **Comparison View** (`/recipes/compare`): Side-by-side comparison of all recipes

### Interactive Cooking Tools

#### Servings Adjustment
- Real-time ingredient scaling based on serving size
- Fractional amount display (e.g., 1 1/2, 2 3/4)
- Range: 1-20 servings
- Persisted via localStorage per recipe

#### Ingredient Checklist
- Check off ingredients as you add them
- Line-through styling for completed items
- State persisted via localStorage per recipe
- Keyboard accessible with proper ARIA labels

#### Cooking Timers
- Start timers directly from instruction steps
- Multiple concurrent timers supported
- Persistent timer overlay with countdown display
- Browser notifications when timers complete
- Visual feedback for active timers

#### Shopping List
- Consolidate ingredients from multiple recipes
- Automatic ingredient grouping by category:
  - Produce
  - Spices
  - Pantry
  - Oils & Condiments
- Checkable items to track shopping progress
- Select which recipes to include

### Ingredient-Based Search
- Search for recipes by ingredients you have on hand
- Enter comma-separated ingredients
- Recipes ranked by match percentage
- Minimum 20% match threshold
- Visual ingredient pills display
- Clear search functionality

## Recipes

### Lentil Stews

#### 1. Elevated Lentil Stew (French-Inspired)
- **Prep Time**: 15 min
- **Cook Time**: 30 min
- **Servings**: 4
- **Features**: Layered, Aromatic, Vegetarian, Freezer-friendly
- **Key Spices**: Fennel, Anise, Smoked Paprika

#### 2. Mexican-Inspired Stew
- **Prep Time**: 10 min
- **Cook Time**: 25 min
- **Servings**: 4
- **Features**: Smoky, Bright, Quick, Vegan
- **Key Spices**: Cumin, Ancho Chile, Turmeric

#### 3. Indian-Spiced Curry
- **Prep Time**: 10 min
- **Cook Time**: 25 min
- **Servings**: 4
- **Features**: Aromatic, Creamy, Complex, Vegan
- **Key Spices**: Garam Masala, Cumin, Turmeric

### Thai Cuisine

#### 4. Fish Patties (Tod Mun Pla)
- **Prep Time**: 15 min
- **Cook Time**: 25 min
- **Servings**: 4
- **Features**: Appetizer, Crispy, Spicy
- **Key Ingredients**: Fish, String Beans, Lemongrass, Fish Sauce

#### 5. Steamed Clams with Fresh Ginger
- **Prep Time**: 10 min
- **Cook Time**: 15 min
- **Servings**: 4
- **Features**: Quick, Seafood, Steamed
- **Key Ingredients**: Clams, Ginger, Yellow Bean Sauce

#### 6. String Beans with Fresh Ginger (Pad Puk King)
- **Prep Time**: 10 min
- **Cook Time**: 10 min
- **Servings**: 3
- **Features**: Quick, Vegetarian, Spicy, Vegan
- **Key Ingredients**: String Beans, Lemongrass, Coconut Milk

#### 7. Thai Iced Coffee
- **Prep Time**: 5 min
- **Cook Time**: 0 min
- **Servings**: 2
- **Features**: Quick, Beverage, Sweet, Cold
- **Key Ingredients**: Coffee, Condensed Milk, Ice

#### 8. Asparagus with Shrimp and Black Mushrooms
- **Prep Time**: 20 min
- **Cook Time**: 10 min
- **Servings**: 3
- **Features**: Quick, Seafood, Stir-fry, High-protein
- **Key Ingredients**: Shrimp, Asparagus, Mushrooms, Oyster Sauce

## Technical Implementation

### Architecture
- **Framework**: Angular 19 with Analog.js for file-based routing
- **Routing**: `/recipes`, `/recipes/compare`, `/recipes/[slug]`
- **State Management**: Angular signals with computed values
- **Persistence**: localStorage for user preferences
- **Styling**: Tailwind CSS matching existing application theme

### Data Model
```typescript
interface Recipe {
  id: string              // URL-safe slug
  title: string           // Display name
  description: string     // Brief description
  prepTime: string        // Formatted time
  cookTime: string        // Formatted time
  totalTime: string       // Formatted time
  baseServings: number    // Default serving count
  ingredients: RecipeIngredient[]
  instructions: RecipeInstruction[]
  toppings: string[]      // Recommended additions
  notes: string[]         // Chef's tips
  meta: RecipeMeta        // Cuisine and features
}
```

### Key Components

#### RecipesIndexPage (`/recipes/index.page.ts`)
- Recipe cards grid
- Shopping list with ingredient consolidation
- Tab navigation between views

#### RecipeDetailPage (`/recipes/[slug].page.ts`)
- Servings adjustment with real-time scaling
- Checkable ingredient list
- Step-by-step instructions with timers
- Timer management and notifications
- localStorage persistence

#### RecipesComparePage (`/recipes/compare.page.ts`)
- Responsive comparison table
- All recipe variations side-by-side

### Utility Functions

#### `scaleAndFormatAmount(amount, scale)`
Scales ingredient amounts and converts decimals to common fractions:
- 0.25 → "1/4"
- 0.33 → "1/3"
- 0.5 → "1/2"
- 0.67 → "2/3"
- 0.75 → "3/4"

#### Ingredient Categorization System (`ingredient-categorization.ts`)
Provides ingredient-based recipe search and filtering:

**`categorizeIngredient(name: string): IngredientCategory`**
- Categorizes ingredients into 13 types: protein, vegetable, grain, legume, dairy, spice, herb, sauce, oil, nut, fruit, pantry, other
- Used for shopping list organization and search

**`extractRecipeIngredients(recipe: Recipe): string[]`**
- Extracts normalized ingredient names from recipes
- Removes preparation notes in parentheses
- Converts to lowercase for matching

**`calculateIngredientMatch(recipeIngredients, availableIngredients): number`**
- Returns match score (0-1) representing percentage of matching ingredients
- Supports partial matching (e.g., "chicken" matches "chicken breast")

**`filterRecipesByIngredients(recipes, availableIngredients, minThreshold): Array`**
- Filters recipes based on available ingredients
- Returns recipes sorted by match score (highest first)
- Default minimum threshold: 30%
- Includes list of missing ingredients per recipe

#### Timer System
- Multiple concurrent timers
- Browser Notification API integration
- Persistent overlay display
- Automatic cleanup on component destroy

## Accessibility

- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard support with focus indicators
- **Live Regions**: Servings display and timer updates announced to screen readers
- **Semantic HTML**: Proper use of `<nav>`, `<article>`, `<section>`, lists
- **Focus Management**: Visible focus states on all controls
- **WCAG 2.1 AA Compliance**: Color contrast ratios meet requirements

## Browser Support

- Modern browsers with ES2020 support
- localStorage API required for persistence
- Notification API optional (graceful degradation)

## Future Enhancements

- API-ready architecture for backend integration
- User authentication for personal recipe collections
- Advanced search and filtering by cuisine/dietary needs
- Offline support with service workers
- Print stylesheets for recipes and shopping lists
- Dark mode support
- Recipe sharing functionality
- Nutritional information
- Meal planning calendar
