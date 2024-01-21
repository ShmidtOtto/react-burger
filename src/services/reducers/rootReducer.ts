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

const store = configureStore({ reducer: rootReducer });

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch