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
    },
  },
]
