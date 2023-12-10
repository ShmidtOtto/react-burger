import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getIngridients = createAsyncThunk(
    'ingredients/getIngridients',
    async ingridientsUrl => {
        const response = await fetch(ingridientsUrl);
        const data = await response.json();
        return data.data;
    }
)

const initialState = { ingredients: [], ingredientsRequest: false, ingredientsRrror: false, ingredientsCategories: [] };

const ingredientsReducer = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            state.ingredients = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getIngridients.fulfilled, (state, action) => {
            state.ingredients = action.payload;
            state.ingredientsRequest = false;
            state.ingredientsRrror = false;

            action.payload.forEach(ingredient => {
                if (!state.ingredientsCategories.includes(ingredient.type)) state.ingredientsCategories.push(ingredient.type);
            });
        }).addCase(getIngridients.rejected, (state) => {
            state.ingredientsRequest = false;
            state.ingredientsRrror = true;
        }).addCase(getIngridients.pending, (state) => {
            state.ingredientsRequest = true;
            state.ingredientsRrror = false;
        })
    }
});


export default ingredientsReducer.reducer;
export const { addIngredient } = ingredientsReducer.actions;