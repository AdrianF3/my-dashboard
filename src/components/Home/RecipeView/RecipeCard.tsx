import React, { useState } from 'react';
import { GrNotes } from 'react-icons/gr';
import { Recipe } from '../../../types/Recipe.types' // assuming you have a type definition for Recipe

interface RecipeCardProps {
    index: number;
    recipe: Recipe;    
}

const RecipeCard: React.FC<RecipeCardProps> = ({ index, recipe }) => {
    const [ editingRecipe, setEditingRecipe ] = useState<Recipe | null>(null);
    const [ deleteBtnStatus, setDeleteBtnStatus ] = useState(false);
    

    // function to delete the recipe
    const deleteRecipe = (recipe: Recipe) => {
        // delete the recipe
        // ... code to delete the recipe
        // setDeleteBtnStatus(false);
    }


    return (
        <div key={index} className="flex flex-col items-center justify-center w-full p-4 gap-4 bg-gray-100 border-2 border-black border-dashed rounded-xl">
            <h3 className="text-2xl font-bold text-center text-slate-700">{recipe.name}</h3>
            {/* Recipe PDF Link */}
            <a href={recipe.pdfRecipeURL} target="_blank" rel='noreferrer' className="font-bold text-lg text-center text-slate-700">
                <div className='flex justify-between items-center gap-4'>
                    {/* icon of recipe */}
                    <GrNotes />
                    <p>View PDF</p>
                </div>
            </a>
            {/* Recipe Description */}
            {recipe.description ? <>
                <div className='p-10 bg-slate-400/40 rounded-xl shadow-lg'>
                    <p className="text-lg font-bold text-center text-slate-700">{recipe.description}</p>
                </div>
            </> : null}
            {/* Original Recipe URL */}
            <a href={recipe.recipeURL} target="_blank" rel='noreferrer' className="font-bold text-center text-blue-800 italic">
                {recipe.recipeURL}
            </a>

            {/* Button to Edit the Recipe Notes */}
            <button
                className='w-full p-4 text-2xl font-bold text-center text-slate-700 bg-yellow-200/50 rounded-xl shadow-xl hover:bg-yellow-400/50 focus:bg-yellow-400/50 focus:outline-none'
                onClick={() => setEditingRecipe(recipe)}
            >Edit Recipe Notes
            </button>

            {/* Delete Button and Confirm Delete Button */}
            {!deleteBtnStatus ? <>
                <button
                    className='w-full p-4 text-2xl font-bold text-center text-slate-700 bg-red-200/50 rounded-xl shadow-xl hover:bg-red-400/50 focus:bg-red-400/50 focus:outline-none'
                    onClick={() => setDeleteBtnStatus(true)}
                >Delete Recipe
                </button>
            </> : <>
                <button
                    className='w-full p-4 text-2xl font-bold text-center text-slate-700 bg-red-400/50 rounded-xl shadow-xl hover:bg-red-600/50 focus:bg-red-600/50 focus:outline-none'
                    onClick={() => deleteRecipe(recipe)}
                >Confirm - permanently delete this recipe?
                </button>
            </>}
        </div>
    );
}

export default RecipeCard;
