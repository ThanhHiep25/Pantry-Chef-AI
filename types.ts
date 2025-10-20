export interface RecipeVariation {
  title: string;
  description: string;
}

export interface RecipeIngredient {
  quantity: string;
  name: string;
}

export interface Recipe {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  yield: string;
  ingredientsList: RecipeIngredient[];
  instructions: string[];
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
  imageBase64?: string;
  variations: RecipeVariation[];
  savedAt?: string;
}