import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async ingredientsUrl => {
        const response = await fetch(ingredientsUrl);
        if (!response.ok) throw new Error('Network response was not ok: status is ' + response.status);
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
        .addCase(getIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload;
            state.ingredientsRequest = false;
            state.ingredientsRrror = false;

            action.payload.forEach(ingredient => {
                if (!state.ingredientsCategories.includes(ingredient.type)) state.ingredientsCategories.push(ingredient.type);
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