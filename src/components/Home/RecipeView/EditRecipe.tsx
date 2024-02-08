import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../../firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore';

// Assuming the shape of a recipe for TypeScript typing. Adjust according to your actual data structure.
interface Recipe {
  name: string;
  recipeURL: string;
  description: string;
  category: string;
  pdfRecipeURL: string;
}

// Props type definition
interface EditRecipeProps {
  currentRecipes: Recipe[];
  category: string;
  fetchRecipeData: () => void;
  setIsLoading: (isLoading: boolean) => void;
  editingRecipe: Recipe | null;
  setEditingRecipe: (recipe: Recipe | false) => void;
  deleteRecipe: (recipe: Recipe) => Promise<void>;
}

export default function EditRecipe({
  currentRecipes,
  category,
  fetchRecipeData,
  setIsLoading,
  editingRecipe,
  setEditingRecipe,
  deleteRecipe,
}: EditRecipeProps) {
  const [name, setName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [recipeURL, setRecipeURL] = useState<string>('');

  useEffect(() => {
    if (editingRecipe) {
      setName(editingRecipe.name);
      setNote(editingRecipe.description);
      setRecipeURL(editingRecipe.recipeURL);
    }
  }, [editingRecipe]);

  const saveRecipe = async () => {
    setIsLoading(true);

    if (!editingRecipe) return; // Guard clause in case editingRecipe is null

    try {
      await deleteRecipe(editingRecipe);

      const filteredRecipes = currentRecipes.filter((recipe) => recipe.name !== editingRecipe.name);

      const newRecipe = {
        name,
        recipeURL,
        description: note,
        category,
        pdfRecipeUrl: editingRecipe.pdfRecipeUrl,
      };

      // Update Firestore with the newRecipe
      const docRef = doc(projectFirestore, 'recipeData', 'bgkIgbYG78vAPtCLDkUB');
      await updateDoc(docRef, {
        recipes: [...filteredRecipes, newRecipe],
      });

      // Reset states
      setName('');
      setNote('');
      setRecipeURL('');
      fetchRecipeData();
      setEditingRecipe(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error updating Firestore:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-center text-slate-700">Editing A Recipe</h2>
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

          

          <button
            className="w-full p-4 text-2xl font-bold text-center text-slate-700 bg-sky-200/50 rounded-xl shadow-xl hover:bg-sky-400/50 focus:bg-sky-400/50 focus:outline-none"
            onClick={() => saveRecipe()}
          >
            Save Changes To Recipe
          </button>

          {/* Button to undo editing recipe */}
            <button
                className="w-full p-4 text-2xl font-bold text-center text-slate-700 bg-red-200/50 rounded-xl shadow-xl hover:bg-red-400/50 focus:bg-red-400/50 focus:outline-none"
                onClick={() => setEditingRecipe(false)}
            >
                Cancel Editing Recipe
            </button>
            
        </div>
      </div>
    </>
  );
}
