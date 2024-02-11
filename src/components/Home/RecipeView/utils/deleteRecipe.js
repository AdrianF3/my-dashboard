import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import { db } from "../../../../firebaseConfig";

export async function deleteRecipe(userId, recipeId) {
    const userDocRef = doc(db, "userProfile", userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const userProfile = userDocSnap.data();
        const updatedRecipes = userProfile.recipes.filter(recipe => recipe.id !== recipeId);

        await updateDoc(userDocRef, {
            recipes: updatedRecipes
        });
    } else {
        console.log("No such document!");
    }
}
