import reducer, { addIngredient, removeIngredient, initialState } from './ingredientDetailsReducer';

const ingredientDetailsReducerInitialState = Object.assign({}, initialState);

describe('ingredientsReducer test', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(ingredientDetailsReducerInitialState)
    });

    test('should handle addIngredient', () => {
        const ingredient = {
            name: "Краторная булка N-200i",
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420
        }
        expect(reducer(ingredientDetailsReducerInitialState, addIngredient(ingredient))).toEqual({
            ...ingredientDetailsReducerInitialState,
            ...ingredient
        })
    });

    test('should handle removeIngredient', () => {
        expect(reducer(ingredientDetailsReducerInitialState, removeIngredient())).toEqual({
            ...ingredientDetailsReducerInitialState
        })
    });
})