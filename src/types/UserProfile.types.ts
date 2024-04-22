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


// function to create a new user profile
export function createNewUserProfile(uid: string, email: string): UserProfile {
    const newUserProfile: UserProfile = {
        uid: uid,
        name: "Default Name",
        email: email,
        bio: "Default bio.",
        theme: "nord",
        zipCode: "80014",
        recipes: [],
        categories: []
    };

    return newUserProfile;
}