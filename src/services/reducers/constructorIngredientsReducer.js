import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

const initialState = { constructorIngredients: [], totalPrice: 0, buns: [] };
const getTotalPrice = (state) => {
    const [ topBun, bottomBun] = state.buns;
    return state.constructorIngredients.reduce((total, current) => total + current.price, 0) + (topBun ? topBun.price : 0) + (bottomBun ? bottomBun.price : 0);
} 
const constructorIngredientsReducer = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            const ingredient = { ...action.payload };
            ingredient.uuid = v4();
            state.constructorIngredients = [ ...state.constructorIngredients, ingredient];
            state.totalPrice = getTotalPrice(state);
        },
        removeIngredient: (state, action) => {
            state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient.uuid !== action.payload);
            state.totalPrice = getTotalPrice(state);
        },
        addBun: (state, action) => {
            const bun = { ...action.payload };
            bun.uuid = v4();
            state.buns = [action.payload, bun];
            state.totalPrice = getTotalPrice(state);
        },
        removeBun: (state) => {
            state.buns = [];
            state.totalPrice = getTotalPrice(state);
        },
        moveIngredients: (state, action) => {
            let { dragIndex, hoverIndex } = action.payload;
            let dragIngredient = state.constructorIngredients.find((ingredient) => ingredient.uuid === dragIndex);
            state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient.uuid !== dragIndex);
            let hoverIngredientIndex = state.constructorIngredients.findIndex((ingredient) => ingredient.uuid === hoverIndex);
            state.constructorIngredients.splice(hoverIngredientIndex, 0, dragIngredient);
        }
    }
});


export default constructorIngredientsReducer.reducer;
export const { addIngredient, removeIngredient, addBun, removeBun, moveIngredients } = constructorIngredientsReducer.actions;