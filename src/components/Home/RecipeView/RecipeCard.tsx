import React, { useState } from 'react';
import { GrNotes } from 'react-icons/gr';
import { Recipe } from '../../../types/Recipe.types'; // Assuming you have a type definition for Recipe
import { deleteRecipe } from './utils/deleteRecipe'; // Assuming you have a function to delete a recipe
import { updateRecipe } from './utils/updateRecipe'; // Assuming you have a function to update a recipe

interface RecipeCardProps {
    index: number;
    recipe: Recipe;
    recipeCategories: string[]; // New prop for the categories
}

const RecipeCard: React.FC<RecipeCardProps> = ({ index, recipe, recipeCategories }) => {
    const [editingRecipe, setEditingRecipe] = useState(false); // Changed to boolean to toggle edit mode
    const [editedRecipe, setEditedRecipe] = useState(recipe); // State to hold edited recipe changes
    const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditedRecipe({ ...editedRecipe, [e.target.name]: e.target.value });
    };

    const saveEdits = () => {
        // Function to save edits to Firestore or local state
        setIsLoading(true);
        console.log('editedRecipe', editedRecipe)
        updateRecipe(editedRecipe); 
        setIsLoading(false);
        setEditingRecipe(false); // Exit editing mode
        // Add your update logic here
    };

    return ( <>
        <div key={index} className="flex flex-col items-center justify-center w-full p-4 gap-4 bg-primary text-primary-content border-2 border-black border-dashed rounded-xl">
            {editingRecipe ? (
                <>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={editedRecipe.name}
                        onChange={handleEditChange}
                        className="input input-bordered w-full max-w-xs"
                    />
                    <label htmlFor="recipeURL">Recipe&apos;s URL</label>
                    <input
                        type="text"
                        name="recipeURL"
                        value={editedRecipe.recipeURL}
                        onChange={handleEditChange}
                        className="input input-bordered w-full max-w-xs primary-content"
                    />
                    <label htmlFor="category">Select a Category</label>
                    <select
                        name="category"
                        value={editedRecipe.category}
                        onChange={handleEditChange}
                        className="select select-bordered w-full max-w-xs"
                    >
                        {recipeCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={editedRecipe.description}
                        onChange={handleEditChange}
                        className="textarea textarea-bordered w-full max-w-xs"
                    />

                    { isLoading ? <p>Uploading Recipe...</p> : <>
                        <button
                            className="btn btn-success mt-4"
                            onClick={saveEdits}
                            >Save Changes
                        </button>
                    </>}
                    <button
                        className="btn btn-error mt-4"
                        onClick={() => setEditingRecipe(false)}
                    >Cancel
                    </button>

                </>
            ) : (
                <>
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
                        onClick={() => setEditingRecipe(true)}
                    >Edit Recipe
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
                            onClick={() => deleteRecipe(recipe.ownerUID, recipe.id)}
                        >Confirm - permanently delete this recipe?
                        </button>
                    </>}
                </div>
                </>
            )}
            </div>
            </>
    );
}

export default RecipeCard;
