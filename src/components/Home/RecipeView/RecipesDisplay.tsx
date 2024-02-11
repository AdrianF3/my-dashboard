import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../../types/Recipe.types';
import AddRecipe from './AddRecipe';

interface RecipeCardProps {
    recipe: Recipe;
}

interface RecipesDisplayProps {
    recipes: Recipe[];    
}

const RecipesDisplay: React.FC<RecipesDisplayProps> = ({ recipes }) => {
    const recipeCategories = React.useMemo(() => ['Untried', 'Breakfast', 'Main Course', 'Desserts', 'Drinks', 'Sides/Misc.', 'Soups', 'Salads', 'Snacks', 'Breads'], []);
    const [currentCategory, setCurrentCategory] = useState('Untried');
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
    const [recipeCounts, setRecipeCounts] = useState<Record<string, number>>({});
    console.log('recipeCounts', recipeCounts)

    useEffect(() => {
        if (recipes) {
            const tempRecipeCounts: Record<string, number> = {};
            recipeCategories.forEach((category) => {
                tempRecipeCounts[category] = recipes.filter((recipe) => recipe.category === category).length;
            });
            setRecipeCounts(tempRecipeCounts);
        }
    }, [recipes, recipeCategories]);

    
    

    useEffect(() => {
            console.log('recipeData', recipes)
            if (recipes) {
                console.log('run')
                const tempFilteredRecipes = recipes.filter((recipe) => recipe.category === currentCategory);
            setFilteredRecipes(tempFilteredRecipes);
            } else {
                console.log('not run')
            }
        }, [currentCategory, recipes]);

        function closeModal() {
            (document.getElementById('my_modal_1') as HTMLDialogElement)?.close();
          }
          
    

    return (
        <>
        {/* // Display the categories */}
        <div className='bg-primary text-primary-content rounded-xl p-4'>
            {/*  */}
            <div className='flex flex-col justify-center text-center'>
                <h1 className='text-4xl'>Recipes</h1>
                <p className='py-4 text-xl'>Save pdfs of your favortie recipes</p>                            
            </div>
            <div className='flex sm:flex-col md:flex-row justify-center'>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <button className="btn btn-secondary" onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}>
                    Add New Recipe
                </button>
                <dialog id="my_modal_1" className="modal">
                <div className="modal-box">                    
                    <AddRecipe                        
                        category={currentCategory}                        
                        closeModal={closeModal}                        
                    />
                </div>
                </dialog>
            </div>

            {/* Category Selection */}
            <div className='m-2'>
                <h2 className=' text-2xl'>Categories</h2>
            </div>
            <ul>
                {recipeCategories.map((category, index) => (
                    <li 
                        key={index} 
                        onClick={() => setCurrentCategory(category)}
                        className={`${category === currentCategory ? 'bg-accent' : 'bg-secondary'} p-2 m-2 rounded-md cursor-pointer hover:bg-blue-300 transition duration-300 ease-in-out`}
                    >
                        {category} - <span className='font-bold'>{recipeCounts[category]}</span> recipes
                    </li>
                ))}
            </ul>
        </div>
        

        


        {/*  */}
        <div className="flex flex-col items-center justify-center w-full p-4 gap-4 bg-gray-100 rounded-xl">            
              {filteredRecipes
                ? filteredRecipes.map((recipe, index) => (
                    <RecipeCard
                      key={index}
                      index={index}
                      recipe={recipe}     
                      recipeCategories={recipeCategories}                 
                    />                  
                  ))
                : null}
            </div>
        </>
    );
};

export default RecipesDisplay;