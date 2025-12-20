import { Recipe } from '../models/Recipe.interface'

export const RECIPES: Recipe[] = [
  {
    id: 'elevated-lentil-stew',
    title: 'Elevated Lentil Stew',
    description:
      'A masterclass in building depth. Toasting whole spices releases essential oils, while lemon zest and smoked paprika create a sophisticated finish.',
    prepTime: '15 min',
    cookTime: '30 min',
    totalTime: '45 min',
    baseServings: 4,
    ingredients: [
      { name: 'dry green lentils (French/Puy)', amount: 1, unit: 'cup' },
      { name: 'medium onion, diced', amount: 1, unit: 'unit' },
      { name: 'green bell pepper, diced', amount: 1, unit: 'unit' },
      { name: 'red bell pepper, diced', amount: 1, unit: 'unit' },
      { name: 'yellow bell pepper, diced', amount: 1, unit: 'unit' },
      { name: 'garlic cloves, sliced', amount: 6, unit: 'cloves' },
      { name: 'olive oil', amount: 2, unit: 'tbsp' },
      { name: 'medium potato, diced', amount: 1, unit: 'unit' },
      { name: 'crushed tomatoes (no salt)', amount: 14.5, unit: 'oz' },
      { name: 'water or veg broth', amount: 5.5, unit: 'cups' },
      { name: 'bay leaves', amount: 2, unit: 'leaves' },
      { section: 'Spice Blend', name: 'coriander seeds', amount: 1, unit: 'tbsp' },
      { section: 'Spice Blend', name: 'fennel seeds', amount: 1, unit: 'tbsp' },
      { section: 'Spice Blend', name: 'anise seeds', amount: 0.75, unit: 'tsp' },
      { section: 'Spice Blend', name: 'white peppercorns', amount: 1, unit: 'tsp' },
      { section: 'Spice Blend', name: 'red chili flakes', amount: 1, unit: 'pinch' },
      { section: 'Finishing', name: 'lemon (zest + juice)', amount: 1, unit: 'unit' },
      { section: 'Finishing', name: 'smoked paprika', amount: 1, unit: 'tbsp' },
      { section: 'Finishing', name: 'tomato paste', amount: 2.5, unit: 'tbsp' },
      { section: 'Finishing', name: 'collard greens, chopped', amount: 1, unit: 'cup' },
      { section: 'Finishing', name: 'fresh parsley', amount: 0.25, unit: 'cup' },
    ],
    instructions: [
      {
        title: 'Toast Spices',
        description:
          'In a dry skillet, toast coriander, fennel, anise, peppercorns, and chili flakes for 1-2 minutes until fragrant. Grind coarsely in mortar and pestle.',
        timer: 120,
      },
      {
        title: 'Prep',
        description:
          'Rinse lentils. Dice all peppers, onion, and potato. Slice garlic. Zest and juice the lemon.',
      },
      {
        title: 'Sauté Base',
        description:
          'Heat olive oil in large pot. Add onion and peppers. Sauté 5-7 minutes until soft. Add garlic and spice blend; cook 1-2 mins.',
        timer: 420,
      },
      {
        title: 'Tomato Paste',
        description:
          'Stir in tomato paste. Cook 1-2 minutes until it darkens. Deglaze with a splash of broth.',
        timer: 120,
      },
      {
        title: 'Simmer',
        description:
          'Add lentils, potato, bay leaves, tomatoes, lemon zest, and water/broth. Boil, then reduce heat. Simmer 20-25 minutes.',
        timer: 1500,
      },
      {
        title: 'Finish',
        description:
          'Stir in lemon juice, smoked paprika, and collard greens. Simmer 5 mins. Garnish with parsley.',
        timer: 300,
      },
    ],
    toppings: ['Extra firm tofu', 'Beyond Sausage', 'Feta cheese', 'Diced red onion'],
    notes: ['Tastes better the next day.', 'Freeze base for up to 3 months.'],
    meta: {
      cuisine: ['French', 'European'],
      features: ['Layered', 'Aromatic', 'Vegetarian', 'Freezer-friendly'],
      mainIngredients: ['lentils', 'bell peppers', 'onion', 'garlic', 'tomatoes', 'potato'],
    },
  },
  {
    id: 'mexican-inspired-stew',
    title: 'Mexican-Inspired Stew',
    description:
      'Warmth and smokiness through cumin and ancho chile, balanced by bright lime and fire-roasted tomatoes.',
    prepTime: '10 min',
    cookTime: '25 min',
    totalTime: '35 min',
    baseServings: 4,
    ingredients: [
      { name: 'dry green/red lentils', amount: 1, unit: 'cup' },
      { name: 'medium onion, diced', amount: 1, unit: 'unit' },
      { name: 'bell peppers, diced', amount: 2, unit: 'unit' },
      { name: 'garlic cloves, minced', amount: 6, unit: 'cloves' },
      { name: 'olive oil', amount: 2, unit: 'tbsp' },
      { name: 'fire-roasted tomatoes', amount: 14.5, unit: 'oz' },
      { name: 'vegetable broth', amount: 2, unit: 'cups' },
      { name: 'water', amount: 3, unit: 'cups' },
      { section: 'Spice Blend', name: 'ground cumin', amount: 1, unit: 'tsp' },
      { section: 'Spice Blend', name: 'ancho chile powder', amount: 0.5, unit: 'tsp' },
      { section: 'Spice Blend', name: 'turmeric', amount: 0.5, unit: 'tsp' },
      { section: 'Finishing', name: 'lime juice', amount: 0.25, unit: 'cup' },
      { section: 'Finishing', name: 'fresh cilantro', amount: 0.25, unit: 'cup' },
    ],
    instructions: [
      {
        title: 'Prep',
        description: 'Rinse lentils. Dice onion and peppers. Mince garlic. Juice limes.',
      },
      {
        title: 'Sauté',
        description:
          'Heat oil. Sauté onion and peppers 3-5 mins. Add garlic, cook 1 min.',
        timer: 300,
      },
      {
        title: 'Bloom Spices',
        description: 'Stir in cumin, ancho chile, and turmeric. Cook 30 seconds.',
        timer: 30,
      },
      {
        title: 'Simmer',
        description:
          'Add lentils, tomatoes, broth, and water. Boil, then simmer 20-25 minutes until tender.',
        timer: 1320,
      },
      {
        title: 'Finish',
        description: 'Stir in lime juice and cilantro. Season with salt/pepper.',
      },
    ],
    toppings: ['Sour cream', 'Avocado', 'Tortilla chips', 'Lime wedges'],
    notes: ['Add jalapeno for heat.', 'Use regular chili powder if ancho unavailable.'],
    meta: {
      cuisine: ['Mexican', 'Latin American'],
      features: ['Smoky', 'Bright', 'Quick', 'Vegan'],
      mainIngredients: ['lentils', 'bell peppers', 'onion', 'garlic', 'tomatoes'],
    },
  },
  {
    id: 'indian-spiced-curry',
    title: 'Indian-Spiced Curry',
    description:
      'Layers of aromatic spices—toasted cumin, warm turmeric, and garam masala—mellowed by creamy coconut milk.',
    prepTime: '10 min',
    cookTime: '25 min',
    totalTime: '35 min',
    baseServings: 4,
    ingredients: [
      { name: 'dry lentils', amount: 1, unit: 'cup' },
      { name: 'medium onion, diced', amount: 1, unit: 'unit' },
      { name: 'bell peppers, diced', amount: 2, unit: 'unit' },
      { name: 'garlic cloves, minced', amount: 6, unit: 'cloves' },
      { name: 'olive oil', amount: 2, unit: 'tbsp' },
      { name: 'vegetable broth', amount: 2, unit: 'cups' },
      { name: 'water', amount: 3, unit: 'cups' },
      { section: 'Spice Blend', name: 'cumin seeds (or ground)', amount: 1, unit: 'tsp' },
      { section: 'Spice Blend', name: 'turmeric', amount: 1, unit: 'tsp' },
      { section: 'Spice Blend', name: 'garam masala', amount: 1, unit: 'tsp' },
      { section: 'Spice Blend', name: 'cayenne pepper', amount: 0.5, unit: 'tsp' },
      { section: 'Finishing', name: 'coconut milk (full fat)', amount: 14, unit: 'oz' },
      { section: 'Finishing', name: 'fresh cilantro', amount: 0.25, unit: 'cup' },
    ],
    instructions: [
      {
        title: 'Prep',
        description: 'Rinse lentils. Dice vegetables. Mince garlic.',
      },
      {
        title: 'Toast Cumin',
        description:
          'Heat oil. Toast cumin seeds for 30-45 seconds. (Skip if using ground).',
        timer: 45,
      },
      {
        title: 'Sauté',
        description: 'Add onion and peppers. Sauté 3-5 mins. Add garlic, cook 1 min.',
        timer: 240,
      },
      {
        title: 'Bloom Spices',
        description: 'Stir in turmeric, garam masala, and cayenne. Cook 30 seconds.',
        timer: 30,
      },
      {
        title: 'Simmer',
        description: 'Add lentils, broth, and water. Boil, then simmer 20-25 minutes.',
        timer: 1320,
      },
      {
        title: 'Finish',
        description: 'Stir in coconut milk and cilantro. Heat through gently.',
      },
    ],
    toppings: ['Naan bread', 'Pickled red onions', 'Mango chutney'],
    notes: [
      'Use heavy cream instead of coconut milk for non-vegan version.',
      'Reduce cayenne for milder curry.',
    ],
    meta: {
      cuisine: ['Indian', 'South Asian'],
      features: ['Aromatic', 'Creamy', 'Complex', 'Vegan'],
      mainIngredients: ['lentils', 'bell peppers', 'onion', 'garlic', 'coconut milk'],
    },
  },
  // Thai Recipes
  {
    id: 'fish-patties',
    title: 'Fish Patties (Tod Mun Pla)',
    description:
      'Firm white fish minced with string beans and Thai spices, deep-fried and served with cucumber sauce.',
    prepTime: '15 min',
    cookTime: '25 min',
    totalTime: '40 min',
    baseServings: 4,
    ingredients: [
      { name: 'firm white fish fillet', amount: 0.5, unit: 'pound' },
      { name: 'fresh string beans (finely chopped)', amount: 3, unit: 'ounces' },
      { name: 'onion (finely chopped)', amount: 1, unit: 'whole' },
      { name: 'fresh lemongrass (finely chopped)', amount: 1, unit: 'stalk' },
      { name: 'Chinese parsley (finely chopped)', amount: 1, unit: 'tablespoon' },
      { name: 'red chile peppers (seeded and finely chopped)', amount: 1, unit: 'teaspoon' },
      { name: 'fish sauce', amount: 1, unit: 'tablespoon' },
      { name: 'egg', amount: 1, unit: 'whole' },
      { name: 'cornstarch', amount: 2, unit: 'tablespoons' },
      { name: 'sugar', amount: 0.25, unit: 'teaspoon' },
      { name: 'vegetable oil (for deep-frying)', amount: 5, unit: 'cups' },
    ],
    instructions: [
      {
        title: 'Prep and Mix',
        description:
          'Mince fish fillet in food processor. Combine with beans, onion, lemongrass, parsley, chiles, fish sauce, egg, cornstarch, and sugar.',
      },
      {
        title: 'Shape Patties',
        description: 'Shape mixture into patties 2 inches in diameter and 1/4 inch thick.',
      },
      {
        title: 'Deep Fry',
        description: 'Deep-fry in medium heat oil for 10-15 minutes or until golden brown.',
        timer: 900,
      },
    ],
    toppings: ['Cucumber sauce', 'Sweet chili sauce'],
    notes: ['Serve with Cucumber Sauce.', 'Can be made ahead and reheated in the oven.'],
    meta: {
      cuisine: ['Thai', 'Southeast Asian'],
      features: ['Appetizer', 'Crispy', 'Spicy'],
      mainIngredients: ['fish', 'string beans', 'lemongrass', 'fish sauce'],
    },
  },
  {
    id: 'steamed-clams-ginger',
    title: 'Steamed Clams with Fresh Ginger',
    description: 'Fresh clams steamed with ginger, garlic, and yellow bean sauce.',
    prepTime: '10 min',
    cookTime: '15 min',
    totalTime: '25 min',
    baseServings: 4,
    ingredients: [
      { name: 'fresh clams', amount: 2, unit: 'pounds' },
      { name: 'garlic (chopped)', amount: 2, unit: 'cloves' },
      { name: 'onion (thinly sliced)', amount: 0.5, unit: 'whole' },
      { name: 'fresh ginger (thinly slivered)', amount: 2, unit: 'tablespoons' },
      { name: 'yellow bean sauce', amount: 1, unit: 'tablespoon' },
      { name: 'oyster sauce', amount: 1, unit: 'tablespoon' },
    ],
    instructions: [
      {
        title: 'Prepare Sauce',
        description: 'Rinse clams thoroughly. Combine garlic, onion, ginger, bean sauce, and oyster sauce.',
      },
      {
        title: 'Steam',
        description: 'Pour sauce over clams in a steamer. Steam for 15 minutes until clams open.',
        timer: 900,
      },
    ],
    toppings: ['Fresh cilantro', 'Lime wedges'],
    notes: [
      'Yellow bean sauce from Thailand is saltier than Chinese versions.',
      'Discard any clams that do not open after steaming.',
    ],
    meta: {
      cuisine: ['Thai', 'Southeast Asian'],
      features: ['Quick', 'Seafood', 'Steamed'],
      mainIngredients: ['clams', 'ginger', 'garlic', 'yellow bean sauce'],
    },
  },
  {
    id: 'string-beans-ginger',
    title: 'String Beans with Fresh Ginger (Pad Puk King)',
    description:
      'Spicy hot vegetarian dish made with fresh string beans, lemongrass, and coconut milk.',
    prepTime: '10 min',
    cookTime: '10 min',
    totalTime: '20 min',
    baseServings: 3,
    ingredients: [
      { name: 'fresh string beans (cut into 2-inch strips)', amount: 0.5, unit: 'pound' },
      { name: 'fresh lemongrass (finely chopped)', amount: 1, unit: 'stalk' },
      { name: 'common ginger (shredded)', amount: 1, unit: 'tablespoon' },
      { name: 'red chile peppers (seeded and finely chopped)', amount: 1, unit: 'whole' },
      { name: 'coconut milk', amount: 0.5, unit: 'cup' },
      { name: 'salt', amount: 0.25, unit: 'teaspoon' },
      { name: 'vegetable oil', amount: 2, unit: 'tablespoons' },
    ],
    instructions: [
      {
        title: 'Toast Aromatics',
        description:
          'Heat oil over medium-high heat. Add lemongrass, ginger, and chiles. Cook until bubbling and fragrant.',
        timer: 120,
      },
      {
        title: 'Cook Beans',
        description:
          'Stir in coconut milk, string beans, and salt. Cook on high heat for 3 minutes until beans are tender-crisp.',
        timer: 180,
      },
    ],
    toppings: ['Chopped cabbage bed', 'Crushed peanuts'],
    notes: ['Serve on a bed of chopped cabbage.', 'Adjust chiles for desired heat level.'],
    meta: {
      cuisine: ['Thai', 'Southeast Asian'],
      features: ['Quick', 'Vegetarian', 'Spicy', 'Vegan'],
      mainIngredients: ['string beans', 'lemongrass', 'ginger', 'coconut milk'],
    },
  },
  {
    id: 'thai-iced-coffee',
    title: 'Thai Iced Coffee',
    description: 'Strong coffee sweetened with condensed milk and served over ice.',
    prepTime: '5 min',
    cookTime: '0 min',
    totalTime: '5 min',
    baseServings: 2,
    ingredients: [
      { name: 'strong French roasted coffee (brewed)', amount: 0.25, unit: 'cup' },
      { name: 'boiling water', amount: 0.5, unit: 'cup' },
      { name: 'sweetened condensed milk', amount: 2, unit: 'teaspoons' },
      { name: 'ice cubes', amount: 1, unit: 'cup' },
    ],
    instructions: [
      {
        title: 'Mix Coffee',
        description:
          'Combine hot brewed coffee, boiling water, and condensed milk. Stir until well blended.',
      },
      {
        title: 'Serve Cold',
        description: 'Fill tall glasses with ice cubes. Pour coffee mixture over ice.',
      },
    ],
    toppings: ['Extra condensed milk drizzle', 'Coffee beans for garnish'],
    notes: [
      'Use dark roast coffee for authentic flavor.',
      'Can also be made with Thai coffee mix for traditional taste.',
    ],
    meta: {
      cuisine: ['Thai', 'Southeast Asian'],
      features: ['Quick', 'Beverage', 'Sweet', 'Cold'],
      mainIngredients: ['coffee', 'condensed milk', 'ice'],
    },
  },
  {
    id: 'asparagus-shrimp-mushrooms',
    title: 'Asparagus with Shrimp and Black Mushrooms',
    description: 'Asparagus and shrimp stir-fried with savory Chinese black mushrooms.',
    prepTime: '20 min',
    cookTime: '10 min',
    totalTime: '30 min',
    baseServings: 3,
    ingredients: [
      { name: 'shrimp (peeled and deveined)', amount: 0.5, unit: 'pound' },
      { name: 'fresh asparagus (cut into 2-inch pieces)', amount: 1, unit: 'pound' },
      { name: 'dried Chinese black mushrooms', amount: 1, unit: 'ounce' },
      { name: 'vegetable oil', amount: 2, unit: 'tablespoons' },
      { name: 'garlic (minced)', amount: 2, unit: 'cloves' },
      { name: 'oyster sauce', amount: 3, unit: 'tablespoons' },
      { name: 'red chile peppers (optional)', amount: 2, unit: 'whole' },
    ],
    instructions: [
      {
        title: 'Prep Mushrooms',
        description:
          'Soak dried mushrooms in warm water for 15 minutes until softened. Drain and slice.',
        timer: 900,
      },
      {
        title: 'Stir Fry',
        description:
          'Heat oil in wok. Fry garlic until brown. Add mushrooms and cook 1 minute. Add shrimp, asparagus, and oyster sauce. Stir-fry for 3 minutes.',
        timer: 240,
      },
    ],
    toppings: ['Sesame seeds', 'Green onions'],
    notes: [
      'Can also be prepared by steaming.',
      'Add chiles for extra heat.',
      'Use shiitake mushrooms if black mushrooms unavailable.',
    ],
    meta: {
      cuisine: ['Thai', 'Southeast Asian'],
      features: ['Quick', 'Seafood', 'Stir-fry', 'High-protein'],
      mainIngredients: ['shrimp', 'asparagus', 'mushrooms', 'oyster sauce'],
    },
  },
]
