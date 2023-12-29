import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsReducer';
import constructorIngredientsReducer from './constructorIngredientsReducer';
import orderReducer from './orderReducer';
import ingredientDetailsReducer from './ingredientDetailsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer,
    user: userReducer
});

export default configureStore({
    reducer: rootReducer
});