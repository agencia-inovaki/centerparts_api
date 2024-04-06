export interface Instructions {
  step_number: number;
  step: string;
}

export interface Ingredients {
  name: string;
  unit: string;
  amount: number;
}

interface Image {
  key: string;
}

export interface ICreateRecipeRequestDTO {
  title: string;
  servings: number;
  ready_in_minutes: number;
  ingredients: Array<Ingredients>;
  instructions: Array<Instructions>;
  image: Image;
  author_id: string;
}
