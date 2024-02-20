import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { ingredientsApi } from '@api/index';

import { IIngredient, ingredientsCategories } from '@interfaces/index';


export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async (ingredientsUrl: string): Promise<IIngredient[]> => {
        return await ingredientsApi.getIngredients(ingredientsUrl);
    }
);

interface IIngredientsState {
    ingredients: Array<IIngredient>;
    ingredientsRequest: boolean;
    ingredientsRrror: boolean;
    ingredientsCategories: Array<ingredientsCategories>;
}

export const initialState: IIngredientsState = { 
    ingredients: [], 
    ingredientsRequest: false, 
    ingredientsRrror: false, 
    ingredientsCategories: [] 
};

const ingredientsReducer = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<IIngredient[]>) => {
            state.ingredients = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getIngredients.fulfilled, (state, action: PayloadAction<IIngredient[]>) => {
            state.ingredients = action.payload;
            state.ingredientsRequest = false;
            state.ingredientsRrror = false;

            action.payload.forEach(ingredient => {
                if (ingredient.type !== '' && !state.ingredientsCategories.includes(ingredient.type)) state.ingredientsCategories.push(ingredient.type);
            });
        }).addCase(getIngredients.rejected, (state) => {
            state.ingredientsRequest = false;
            state.ingredientsRrror = true;
        }).addCase(getIngredients.pending, (state) => {
            state.ingredientsRequest = true;
            state.ingredientsRrror = false;
        })
    }
});


export default ingredientsReducer.reducer;
export const { addIngredient } = ingredientsReducer.actions;