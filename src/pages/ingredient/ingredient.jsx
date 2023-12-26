import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/modals/ingredient-details/ingredient-details';

import { getIngredients } from '../../services/reducers/ingredientsReducer';

import { addIngredient } from '../../services/reducers/ingredientDetailsReducer';

export default function Ingredient ({ ingredientsUrl }) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { ingredients } = useSelector(state => state.ingredients);

    useEffect(() => {
        if (ingredients.length) {
            dispatch(addIngredient(ingredients.find(ingredient => ingredient._id === id)));
        } else {
            dispatch(getIngredients(ingredientsUrl));
        }
    }, [ingredientsUrl, ingredients]);

    return (
        <div className='mt-30'>
            <IngredientDetails />
        </div>
    )
}