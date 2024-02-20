import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IIngredient } from '@interfaces/index';

interface IIngredientDetailsState extends Pick<IIngredient, 'name' | 'image' | 'proteins' | 'fat' | 'carbohydrates' | 'calories'> {

}

export const initialState: IIngredientDetailsState = { 
    image: '',
    name: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0
};

const ingredientDetailsReducer = createSlice({
    name: 'ingredientDetails',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<IIngredientDetailsState>) => {
            state.name = action.payload.name;
            state.image = action.payload.image;
            state.proteins = action.payload.proteins;
            state.fat = action.payload.fat;
            state.carbohydrates = action.payload.carbohydrates;
            state.calories = action.payload.calories;
        },
        removeIngredient: (state) => {
            state.name = initialState.name;
            state.image = initialState.image;
            state.proteins = initialState.proteins;
            state.fat = initialState.fat;
            state.carbohydrates = initialState.carbohydrates;
            state.calories = initialState.calories;
        }
    }
});


export default ingredientDetailsReducer.reducer;
export const { addIngredient, removeIngredient } = ingredientDetailsReducer.actions