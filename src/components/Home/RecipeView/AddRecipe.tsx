import React, { useState, useRef, ChangeEvent } from 'react';
import { db, storage, auth } from '../../../firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { Recipe } from '../../../types/Recipe.types';
import { v4 as uuidv4 } from 'uuid';

// Props type definition
interface AddRecipeProps {
  currentRecipes: Recipe[];
  category: string;
  setIsLoading: (isLoading: boolean) => void;
}

export default function AddRecipe({ currentRecipes, category, setIsLoading }: AddRecipeProps) {
  const [name, setName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [recipeURL, setRecipeURL] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const saveRecipe = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files?.[0];

    if (!file) {
      setIsLoading(false);
      return; // No file selected
    }

    const storageRef = ref(storage, `Recipes/${auth.currentUser?.uid}/${file.name}`);
    
    try {
      // Upload the file to storage
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      const newRecipe: Recipe = {
        id: uuidv4(),
        name,
        recipeURL,
        description: note,
        category,
        pdfRecipeURL: downloadUrl,
        ownerUID: auth.currentUser?.uid || '',
      };

    // Get the user's UID
    const uid = auth.currentUser?.uid;

    // Check if the user's UID exists
    if (uid) {
        // Get the user's document reference
        const userDocRef = doc(db, 'userProfiles', uid);

        try {
            // Get the user's document data
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                // Get the current recipes array
                const currentRecipes = userDocSnap.data()?.recipes || [];

                // Add the new recipe to the current recipes array
                const updatedRecipes = [...currentRecipes, newRecipe];

                // Update the user's document with the updated recipes array
                await updateDoc(userDocRef, {
                    recipes: updatedRecipes,
                });
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
            setIsLoading(false);
        }
    }
      // Update Firestore with the newRecipe
      const docRef = doc(db, 'recipeData', 'bgkIgbYG78vAPtCLDkUB');
      await updateDoc(docRef, {
        recipes: [...currentRecipes, newRecipe],
      });

      // Clear the input fields
      setName('');
      setNote('');
      setRecipeURL('');      
      setIsLoading(false);
    } catch (error) {
      console.error('Error uploading file and updating Firestore:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-center text-slate-700">Save A New Recipe</h2>
        <p className="text-center text-slate-700 text-lg">recipes will be saved to the current category that is selected</p>
        <div className="flex flex-col items-center justify-center p-4 gap-4 bg-gray-100 rounded-xl">
          <input
            className="w-full p-4 text-2xl font-bold text-center text-slate-700 bg-green-200/50 rounded-xl shadow-xl hover:bg-green-400/50 focus:bg-green-400/50 focus:outline-none"
            type="text"
            placeholder="Recipe Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full p-4 text-2xl font-bold text-center text-slate-700 bg-green-200/50 rounded-xl shadow-xl hover:bg-green-400/50 focus:bg-green-400/50 focus:outline-none"
            type="text"
            placeholder="Recipe URL"
            value={recipeURL}
            onChange={(e) => setRecipeURL(e.target.value)}
          />
        <textarea
            className="w-full p-4 text-2xl font-bold text-center text-slate-700 bg-green-200/50 rounded-xl shadow-xl hover:bg-green-400/50 focus:bg-green-400/50 focus:outline-none"
            placeholder="My Personal Notes"
            value={note}
            onChange={(e) => setNote(e.target.value)}
        />

          <input
            type="file"
            id="file"
            ref={fileInputRef}
            className="hidden"
            onChange={saveRecipe}
          />

          <button
            className="w-full p-4 text-2xl font-bold text-center text-slate-700 bg-sky-200/50 rounded-xl shadow-xl hover:bg-sky-400/50 focus:bg-sky-400/50 focus:outline-none"
            onClick={handleFileUpload}
          >
            Select a PDF to upload
          </button>
        </div>
      </div>
    </>
  );
}
