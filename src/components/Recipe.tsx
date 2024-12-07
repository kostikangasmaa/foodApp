// src/components/Recipe.tsx
import { Typography } from '@mui/material';
import React from 'react';

interface Meal {
    strMeal: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    [key: string]: string; // Index signature to allow dynamic property access
}

interface RecipeProps {
    meal: Meal;
}

const Recipe: React.FC<RecipeProps> = ({ meal }) => {
    const getIngredients = () => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push(`${ingredient} - ${measure}`);
            }
        }
        return ingredients;
    };

    const ingredients = getIngredients();

    return (
        <div>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
        />
        <Typography variant="h6">Area: {meal.strArea}</Typography>
        <Typography variant="h6">Category: {meal.strCategory}</Typography>
        <Typography variant="body1">
          {meal.strInstructions}
        </Typography>
        <Typography variant="h6">Ingredients:</Typography>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    );
};

export default Recipe;