import { Recipe } from './Recipe.types';

export interface UserProfile {    
    uid: string;
    name: string;
    email: string;
    bio: string;
    theme: string;
    zipCode: string;
    recipes: Recipe[];
    // Add any other fields as needed    
}