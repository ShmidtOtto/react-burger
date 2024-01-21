import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@reducers/hooks';
import { useParams } from 'react-router-dom'
import IngredientDetails from '@components/modals/ingredient-details/ingredient-details';

import { addIngredient } from '@reducers/ingredientDetailsReducer';

export default function Ingredient (): React.JSX.Element {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { ingredients } = useAppSelector(state => state.ingredients);
    const ingredientDetails = useAppSelector(state => state.ingredientDetails);

    useEffect(() => {
        if (ingredients.length) {
            // @ts-ignore
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