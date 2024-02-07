import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';

interface Recipe {
    id: number;
    title: string;
    description: string;
    // Add more properties as needed
}

interface RecipeCardProps {
    recipe: Recipe;
}

const RecipeList: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {recipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
};

export default RecipeList;