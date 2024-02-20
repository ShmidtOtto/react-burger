import reducer, { addIngredient, getIngredients, initialState } from './ingredientsReducer';

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks();

const ingredientsReducerInitialState = Object.assign({}, initialState);

describe('ingredientsReducer test', () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    test('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(ingredientsReducerInitialState)
    });

    test('should handle addIngredient', () => {
        const ingredient = {
            _id: "643d69a5c3f7b9001cfa093c",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        }
        expect(reducer(ingredientsReducerInitialState, addIngredient([ingredient]))).toEqual({
            ...ingredientsReducerInitialState,
            ingredients: [ingredient]
        })
    });

    test('should handle getIngredients action', async () => {
        const getIngredientsResponse = {
            success: true,
            data: [
                {
                    _id: "643d69a5c3f7b9001cfa093c",
                    name: "Краторная булка N-200i",
                    type: "bun",
                    proteins: 80,
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255,
                    image: "https://code.s3.yandex.net/react/code/bun-02.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                    __v: 0
                }
            ]
        }


        fetchMock.mockResponseOnce(JSON.stringify(getIngredientsResponse), {
            status: 200,
            ok: true
        });

        const dispatch = jest.fn();
        const getIngredientsRequest = getIngredients('https://norma.nomoreparties.space/api/ingredients');
        await getIngredientsRequest(dispatch)

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(getIngredients.pending().type);
        expect(end[0].type).toBe(getIngredients.fulfilled().type);
        expect(end[0].payload).toEqual(getIngredientsResponse.data);

        let state = await reducer(ingredientsReducerInitialState, getIngredients.fulfilled(getIngredientsResponse.data));

        expect(state).toEqual({
            ...ingredientsReducerInitialState,
            ingredientsRequest: false,
            ingredientsRrror: false,
            ingredients: getIngredientsResponse.data,
            ingredientsCategories: ['bun']
        })
    });

})