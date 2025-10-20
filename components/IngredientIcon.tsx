import React from 'react';
import {
  CubeIcon, // Generic fallback
  LeafIcon, // Vegetables, herbs
  LemonIcon, // Fruits
  MeatIcon, // Meats
  FishIcon, // Fish
  CheeseIcon, // Dairy, cheese
  GrainIcon, // Grains, flour, bread
  DropletIcon, // Liquids, oils, sauces
  SparklesIcon, // Spices, seasonings
} from './icons';

interface IngredientIconProps extends React.SVGProps<SVGSVGElement> {
  ingredient: string;
}

// Keyword mapping for icons. Order matters: more specific checks should come first.
const iconMap = [
  { keywords: ['chicken', 'beef', 'pork', 'lamb', 'meat', 'bacon', 'sausage', 'steak', 'turkey', 'ham'], Icon: MeatIcon },
  { keywords: ['fish', 'salmon', 'tuna', 'shrimp', 'prawns', 'seafood', 'cod', 'haddock'], Icon: FishIcon },
  { keywords: ['cheese', 'milk', 'butter', 'yogurt', 'cream', 'dairy'], Icon: CheeseIcon },
  { keywords: ['apple', 'banana', 'orange', 'lemon', 'lime', 'berry', 'berries', 'fruit', 'grape', 'avocado'], Icon: LemonIcon },
  { keywords: ['flour', 'bread', 'rice', 'pasta', 'oats', 'grain', 'quinoa', 'cereal'], Icon: GrainIcon },
  { keywords: ['oil', 'water', 'vinegar', 'sauce', 'broth', 'stock', 'juice', 'wine', 'soy'], Icon: DropletIcon },
  { keywords: ['salt', 'pepper', 'spice', 'herbs', 'cumin', 'paprika', 'oregano', 'basil', 'sugar', 'cinnamon', 'turmeric', 'chili'], Icon: SparklesIcon },
  // Vegetable keywords are broad and should be checked last.
  { keywords: ['tomato', 'onion', 'garlic', 'potato', 'carrot', 'peppers', 'broccoli', 'spinach', 'lettuce', 'cucumber', 'vegetable', 'greens', 'leaf', 'zucchini', 'mushroom', 'eggplant', 'cabbage'], Icon: LeafIcon },
];

const getIconForIngredient = (ingredientName: string): React.FC<React.SVGProps<SVGSVGElement>> => {
  const lowerCaseName = ingredientName.toLowerCase();
  
  for (const { keywords, Icon } of iconMap) {
    if (keywords.some(keyword => lowerCaseName.includes(keyword))) {
      return Icon;
    }
  }

  return CubeIcon; // Default icon if no match is found
};


const IngredientIcon: React.FC<IngredientIconProps> = ({ ingredient, ...props }) => {
  const IconComponent = getIconForIngredient(ingredient);
  return <IconComponent {...props} />;
};

export default IngredientIcon;
