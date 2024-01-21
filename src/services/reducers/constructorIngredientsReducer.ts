import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIngredient } from '@interfaces/index';

interface IConstructorIngredientsState {
    constructorIngredients: IIngredient[];
    totalPrice: number;
    buns: IIngredient[];
}
const initialState: IConstructorIngredientsState = { constructorIngredients: [], totalPrice: 0, buns: [] };
const getTotalPrice = (state: IConstructorIngredientsState) => {
    const [ topBun, bottomBun] = state.buns;
    return state.constructorIngredients.reduce((total, current) => total + current.price, 0) + (topBun ? topBun.price : 0) + (bottomBun ? bottomBun.price : 0);
}

const constructorIngredientsReducer = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<IIngredient>) => {
            const ingredient = { ...action.payload };
            ingredient.uuid = v4();
            state.constructorIngredients = [ ...state.constructorIngredients, ingredient];
            state.totalPrice = getTotalPrice(state);
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient.uuid !== action.payload);
            state.totalPrice = getTotalPrice(state);
        },
        addBun: (state, action: PayloadAction<IIngredient>) => {
            const bun = { ...action.payload };
            bun.uuid = v4();
            state.buns = [action.payload, bun];
            state.totalPrice = getTotalPrice(state);
        },
        removeBun: (state) => {
            state.buns = [];
            state.totalPrice = getTotalPrice(state);
        },
        moveIngredients: (state, action: PayloadAction<{dragIndex: string, hoverIndex: string}>) => {
            let { dragIndex, hoverIndex } = action.payload;
            let dragIngredient = state.constructorIngredients.find((ingredient) => ingredient.uuid === dragIndex);
            state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient.uuid !== dragIndex);
            let hoverIngredientIndex = state.constructorIngredients.findIndex((ingredient) => ingredient.uuid === hoverIndex);
            if (dragIngredient && hoverIngredientIndex) {
                state.constructorIngredients.splice(hoverIngredientIndex, 0, dragIngredient);
            }
        }
    }
});


export default constructorIngredientsReducer.reducer;
export const { addIngredient, removeIngredient, addBun, removeBun, moveIngredients } = constructorIngredientsReducer.actions;