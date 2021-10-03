// send as response
export interface DataResponse {
  recipe_id: string;
  title: string;
  servings: number;
  ready_in_minutes: number;
  author_id: string;
  ingredients?: Array<IngredientsResponse>;
  instructions?: Array<InstructionsResponse>;
  image?: ImageResponse;
}

interface IngredientsResponse {
  name: string;
  unit: string;
  amount: number;
}

interface InstructionsResponse {
  step_number: number;
  step: string;
}

interface ImageResponse {
  url: string;
  key: string;
}

// from query
export interface RecipeIngredients {
  recipe_id: string;
  name: string;
  unit: string;
  amount: number;
}

export interface RecipeInstructions {
  recipe_id: string;
  step_number: number;
  step: string;
}

export interface RecipeImage {
  recipe_id: string;
  path: string;
  key: string;
}

interface DataQuery {
  recipe_id: string;
  title: string;
  servings: number;
  ready_in_minutes: number;
  author_id: string;
}

export interface IRecipesQuery {
  recipes: DataQuery;
  recipe_ingredients: RecipeIngredients;
  recipe_instructions: RecipeInstructions;
  recipe_image: RecipeImage;
}
