import React, { useState, ChangeEvent } from 'react';
import { GrNotes, GrLink } from 'react-icons/gr';
import { Recipe } from '../../../types/Recipe.types';
import { updateRecipe } from './utils/updateRecipe'; // Simplified imports assuming these functions are exported from the utils/index.ts
import { deleteRecipe } from './utils/deleteRecipe'; // Simplified imports assuming these functions are exported from the utils/index.ts

interface RecipeCardProps {
  index: number;
  recipe: Recipe;
  recipeCategories: string[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ index, recipe, recipeCategories }) => {
  const [editingRecipe, setEditingRecipe] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedRecipe(prev => ({ ...prev, [name]: value }));
  };

  const saveEdits = async () => {
    setIsLoading(true);
    try {
      await updateRecipe(editedRecipe);
      // Optionally, handle any post-update actions here
    } catch (error) {
      console.error('Failed to update recipe:', error);
      // Handle update error (e.g., show a notification to the user)
    } finally {
      setIsLoading(false);
      setEditingRecipe(false);
    }
  };

  React.useEffect(() => {
    setEditedRecipe(recipe);
  }, [recipe]);
  console.log('recipe', recipe)
  console.log('editedRecipe', editedRecipe)
  
  return (
    <div key={index} className="flex flex-col items-center justify-center w-full p-4 gap-4 bg-primary text-primary-content border-2 border-black border-dashed rounded-xl">
      {editingRecipe ? (
        // Edit form
        <>
          <h3 className="text-2xl font-bold text-center text-slate-700">Edit Recipe</h3>
          <div className='flex flex-row justify-around'>
            <label htmlFor="name" className="label">Name</label>
            <input type="text" name="name" value={editedRecipe.name} onChange={handleEditChange} className="input input-bordered w-full max-w-xs" />
          </div>
          <div className='flex flex-row justify-around'>
            <label htmlFor="recipeURL" className="label">Recipe URL</label>
            <input type="text" name="recipeURL" value={editedRecipe.recipeURL} onChange={handleEditChange} className="input input-bordered w-full max-w-xs" />
          </div>
          <div className='flex flex-row justify-around'>
            <label htmlFor="category" className="label">Category</label>
            <select name="category" value={editedRecipe.category} onChange={handleEditChange} className="select select-bordered w-full max-w-xs">
              {recipeCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className='flex flex-row justify-around'>
            <label htmlFor="description" className="label">Description</label>
            <textarea name="description" value={editedRecipe.description} onChange={handleEditChange} className="textarea textarea-bordered w-full max-w-xs" />
          </div>
          {isLoading ? <p>Updating Recipe...</p> : <button onClick={saveEdits} className="btn btn-success mt-4">Save Changes</button>}
          <button onClick={() => setEditingRecipe(false)} className="btn btn-error mt-4">Cancel</button>
        </>
      ) : (
        // Display recipe
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
                    {/* Original Recipe URL */}
                    <a href={recipe.recipeURL} target="_blank" rel='noreferrer' className="font-bold text-lg text-center text-slate-700">
                      <div className='flex justify-between items-center gap-4'>
                        {/* {recipe.recipeURL} */}
                        <GrLink />
                        <p>View Original Source</p>
                      </div>
                    </a>

                    {/* Recipe Description */}
                    {recipe.description ? <>
                        <div className='p-4 w-full h-full bg-slate-400/40 rounded-xl shadow-lg'>
                            <p className="text-lg font-bold text-center text-slate-700">{recipe.description}</p>
                        </div>
                    </> : null}

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
    );
}

export default RecipeCard;
