export class Recipe {
  public author_id: string;
  public title: string;
  public image: string;
  public servings_count: number;
  public preparation_minutes: number;
  public ingredients: Array<RecipeIngredients>;
  public instructions: Array<RecipeInstructions>;

  constructor(props: Recipe) {
    Object.assign(this, props);
  }
}

export class RecipeIngredients {
  public name: string;
  public unit: string;
  public amount: number;

  constructor(props: RecipeIngredients) {
    Object.assign(this, props);
  }
}

export class RecipeInstructions {
  public step_number: number;
  public step: string;

  constructor(props: RecipeInstructions) {
    Object.assign(this, props);
  }
}
