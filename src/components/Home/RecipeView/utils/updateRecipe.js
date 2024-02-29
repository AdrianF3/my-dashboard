import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../../../../firebaseConfig";

export async function updateRecipe(updatedRecipe) {
    console.log('updatedRecipe', updatedRecipe)
    const userDocRef = doc(db, "userProfile", updatedRecipe.ownerUID);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const userProfile = userDocSnap.data();
        // Assuming userProfile.recipes is an array of recipe objects
        const updatedRecipes = userProfile.recipes.map(recipe => 
            recipe.id === updatedRecipe.id ? updatedRecipe : recipe
        );

        await updateDoc(userDocRef, {
            recipes: updatedRecipes
        });
    } else {
        console.error("No such document!");
    }
}
