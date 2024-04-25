import { Recipe } from './Recipe.types';
import { BookmarkCategory } from './BookmarkCategory.types';

export interface UserProfile {    
    uid: string;
    name: string;
    email: string;
    bio: string;
    theme: string;
    locationData:
    {
        city: string;
        state: string;
        timezoneAbr: string;
        isDst: boolean;
    };
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
        locationData: {
            city: "Denver",
            state: "CO",
            timezoneAbr: "MDT",
            isDst: false
        },
        zipCode: "80112",
        recipes: [],
        categories: []
    };

    return newUserProfile;
}


export function resetDemoUserContent(): UserProfile {
    const newUserProfile: UserProfile = {
        uid: 'E2eVDaRt1lUPaPO2pTClHUTHhT13',
        name: "Dash Demo Account",
        email: 'Demo@dash.afwebdev.com',
        bio: "Default bio goes here.",
        theme: "nord",
        locationData: {
            city: "Denver",
            state: "CO",
            timezoneAbr: "MDT",
            isDst: false
        },
        zipCode: "80112",
        recipes: [
            {
                category: 'Main Course',
                description: 'Remember to skim the fat!',
                id: 'b08e5359-6b97-477b-863d-80d84907578b',
                name: 'Chili Verde Pork',
                ownerUID: 'E2eVDaRt1lUPaPO2pTClHUTHhT13',
                pdfRecipeURL: 'https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/Recipes%2FE2eVDaRt1lUPaPO2pTClHUTHhT13%2FChile-Verde-Recipe-Isabel-Eats.pdf?alt=media&token=74381e2f-5b6e-4b3e-a37d-e14dbae713cd',
                recipeURL: 'https://www.isabeleats.com/mexican-pork-chile-verde/'
            },
            {
                category: 'Breads',
                description: '',
                id: 'a4ac98c5-110c-4872-b625-2659710199ae',
                name: 'No Knead Dutch Oven Bread',
                ownerUID: 'E2eVDaRt1lUPaPO2pTClHUTHhT13',
                pdfRecipeURL: 'https://firebasestorage.googleapis.com/v0/b/dash-organizer-73422.appspot.com/o/Recipes%2FE2eVDaRt1lUPaPO2pTClHUTHhT13%2FNo%20Knead%20Dutch%20Oven%20Bread.pdf?alt=media&token=0ab98fda-fa11-43c4-8f8f-875c5ed6e4c3',
                recipeURL: 'https://redstaryeast.com/recipes/no-knead-dutch-oven-bread/'
            }
        ],
        categories: [
            {
                bookmarks: [
                    {
                        description: "Apple",
                        url: 'http://Apple.com'
                    },
                    {
                        description: "Google",
                        url: "http://google.com"
                    },
                    {
                        description: "Youtube",
                        url: 'http://youtube.com'
                    }
                ],
                isPrivate: false,
                name: 'General', 
                position: 0
            },
            {
                bookmarks: [
                    {
                        description: "Yelp",
                        url: 'http://yelp.com'
                    },
                    {
                        description: "Sallys's Baking Addiction",
                        url: "https://sallysbakingaddiction.com/"
                    },
                    {
                        description: "America's Test Kitchen",
                        url: 'https://www.americastestkitchen.com/'
                    }
                ],
                isPrivate: false,
                name: 'Food', 
                position: 1
            },
            {
                bookmarks: [
                    {
                        description: "BOA",
                        url: 'https://www.bankofamerica.com/'
                    },
                    {
                        description: "Capital One",
                        url: "https://www.capitalone.com/"
                    },
                    {
                        description: "Wells Fargo",
                        url: 'https://www.wellsfargo.com/'
                    }
                ],
                isPrivate: false,
                name: 'Finance', 
                position: 2
            },
        ]
    };

    return newUserProfile;
}