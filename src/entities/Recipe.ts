import { uuid } from 'uuidv4';

export class Recipe {
  public readonly recipe_id: string;

  public title: string;
  public servings: number;
  public ready_in_minutes: number;

  public author_id: string;

  constructor(props: Omit<Recipe, 'recipe_id'>) {
    Object.assign(this, props);

    this.recipe_id = uuid();
  }
}

export class RecipeIngredients {
  public readonly ingredient_id: string;

  public name: string;
  public unit: string;
  public amount: number;

  public recipe_id: string;

  constructor(props: Omit<RecipeIngredients, 'ingredient_id'>) {
    Object.assign(this, props);

    this.ingredient_id = uuid();
  }
}

export class RecipeInstructions {
  public readonly instruction_id: string;

  public step_number: number;
  public step: string;

  public recipe_id: string;

  constructor(props: Omit<RecipeInstructions, 'instruction_id'>) {
    Object.assign(this, props);

    this.instruction_id = uuid();
  }
}

export class RecipeImage {
  public readonly image_id: string;

  public key: string;
  public path: string;

  public recipe_id: string;

  constructor(props: Omit<RecipeImage, 'image_id' | 'path'>) {
    Object.assign(this, props);

    this.image_id = uuid();
    this.path = `${process.env.APP_URL}/uploads/${this.key}`;
  }
}

export class RecipeRequest {
  public recipe_id: string;

  public title: string;
  public servings: number;
  public ready_in_minutes: number;

  public ingredients: Array<RecipeIngredients>;
  public instructions: Array<RecipeInstructions>;
  public image: RecipeImage;

  public author_id: string;

  constructor(props: RecipeRequest) {
    Object.assign(this, props);
  }
}
