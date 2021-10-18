import { User } from './src/models/Users';
import { UsersFriends } from './src/models/UsersFriends';
import { FriendRequests } from './src/models/FriendRequests';
import { ProfileImage } from './src/models/ProfileImage';
import { Recipes } from './src/models/Recipes';
import { RecipeIngredients } from './src/models/RecipeIngredients';
import { RecipeInstructions } from './src/models/RecipeInstructions';
import { RecipeImage } from './src/models/RecipeImage';

declare global {
  namespace Express {
    interface Request {
      customData: {};
    }
  }
}

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    users_friends: UsersFriends;
    friend_requests: FriendRequests;
    profile_image: ProfileImage;
    recipes: Recipes;
    recipe_ingredients: RecipeIngredients;
    recipe_instructions: RecipeInstructions;
    recipe_image: RecipeImage;
  }
}
