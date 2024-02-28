import { Recipe } from './Recipe.types';
import { BookmarkCategory } from './BookmarkCategory.types';

export interface UserProfile {    
    uid: string;
    name: string;
    email: string;
    bio: string;
    theme: string;
    zipCode: string;
    recipes: Recipe[];
    categories: BookmarkCategory[];
    // Add any other fields as needed    
}