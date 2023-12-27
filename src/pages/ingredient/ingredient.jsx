import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/modals/ingredient-details/ingredient-details';

import { addIngredient } from '../../services/reducers/ingredientDetailsReducer';

export default function Ingredient () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { ingredients } = useSelector(state => state.ingredients);
    const ingredientDetails = useSelector(state => state.ingredientDetails);

    useEffect(() => {
        if (ingredients.length) {
            dispatch(addIngredient(ingredients.find(ingredient => ingredient._id === id)));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ingredients, id]);

    return (
        <div className='mt-30'>
            {ingredientDetails.name && <IngredientDetails />}
        </div>
    )
}