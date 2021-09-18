export interface CreateRecipe {
  authorId: number;
  title: string;
  image: string;
  servingsCount: number;
  preparationMinutes: number;
  ingredients: Array<CreateRecipeIngredients>;
  instructions: Array<CreateRecipeInstructions>;
}

export interface CreateRecipeIngredients {
  name: string;
  unit: string;
  amount: number;
}

export interface CreateRecipeInstructions {
  stepNumber: number;
  step: string;
}
