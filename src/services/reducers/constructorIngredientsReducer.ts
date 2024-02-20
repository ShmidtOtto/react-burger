import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIngredient } from '@interfaces/index';

interface IConstructorIngredientsState {
    constructorIngredients: IIngredient[];
    totalPrice: number;
    bun: IIngredient | null;
}

export const initialState: IConstructorIngredientsState = {
    constructorIngredients: [],
    totalPrice: 0,
    bun: null
};

const getTotalPrice = (state: IConstructorIngredientsState) => {
    const bun = state.bun;
    return state.constructorIngredients.reduce((total, current) => total + current.price, 0) + (bun ? bun.price * 2 : 0);
}

const constructorIngredientsReducer = createSlice({
    name: 'constructorIngredients',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<IIngredient>) => {
            state.constructorIngredients = [ ...state.constructorIngredients, action.payload];
            state.totalPrice = getTotalPrice(state);
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient.uuid !== action.payload);
            state.totalPrice = getTotalPrice(state);
        },
        addBun: (state, action: PayloadAction<IIngredient>) => {
            state.bun = action.payload;
            state.totalPrice = getTotalPrice(state);
        },
        removeBun: (state) => {
            state.bun = null;
            state.totalPrice = getTotalPrice(state);
        },
        moveIngredients: (state, action: PayloadAction<{dragIndex: string, hoverIndex: string}>) => {
            let { dragIndex, hoverIndex } = action.payload;
            let dragIngredient = state.constructorIngredients.find((ingredient) => ingredient.uuid === dragIndex);
            state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient.uuid !== dragIndex);
            let hoverIngredientIndex = state.constructorIngredients.findIndex((ingredient) => ingredient.uuid === hoverIndex);
            if (dragIngredient && hoverIngredientIndex >= -1) {
                state.constructorIngredients.splice(hoverIngredientIndex, 0, dragIngredient);
            }
        }
    }
});


export default constructorIngredientsReducer.reducer;
export const { addIngredient, removeIngredient, addBun, removeBun, moveIngredients } = constructorIngredientsReducer.actions;