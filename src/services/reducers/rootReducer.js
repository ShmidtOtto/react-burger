import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsReducer';
import constructorIngredientsReducer from './constructorIngredientsReducer';
import orderReducer from './orderReducer';
import ingredientDetailsReducer from './ingredientDetailsReducer';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer
});

export default configureStore({
    reducer: rootReducer
});