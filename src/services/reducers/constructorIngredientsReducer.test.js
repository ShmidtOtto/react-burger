import reducer, { addIngredient, removeIngredient, addBun, removeBun, moveIngredients, initialState } from './constructorIngredientsReducer';

const constructorIngredientsReducerInitialState = {
    ...initialState
};

const ingredient = {
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    price: 1255,
    name: 'Краторная булка N-200i',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    _id: '643d69a5c3f7b9001cfa093e',
    type: 'bun',
    uuid: '54b43a5c-d249-48e5-a496-0a3899056e9f'
};

describe('feedOrderReducer test', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(constructorIngredientsReducerInitialState)
    });

    test('should handle addIngredient', () => {
        expect(reducer(constructorIngredientsReducerInitialState, addIngredient(ingredient))).toEqual({
            ...constructorIngredientsReducerInitialState,
            constructorIngredients: [ingredient],
            totalPrice: ingredient.price
        })
    });

    test('should handle removeIngredient', () => {
        const state = {
            ...constructorIngredientsReducerInitialState,
            constructorIngredients: [ingredient],
        };

        expect(reducer(state, removeIngredient(ingredient.uuid))).toEqual({
            ...constructorIngredientsReducerInitialState,
            constructorIngredients: [],
            totalPrice: 0
        })
    });

    test('should handle addBun', () => {
        expect(reducer(constructorIngredientsReducerInitialState, addBun(ingredient))).toEqual({
            ...constructorIngredientsReducerInitialState,
            bun: ingredient,
            totalPrice: ingredient.price * 2
        })
    });

    test('removeBun handle addBun', () => {
        const state = {
            ...constructorIngredientsReducerInitialState,
            bun: ingredient
        }

        expect(reducer(state, removeBun(ingredient))).toEqual({
            ...constructorIngredientsReducerInitialState,
            bun: null,
            totalPrice: 0
        })
    });

    test('removeBun handle moveIngredients', () => {
        const [ first, second, third, fourth ] = [
            {
                _id: "643d69a5c3f7b9001cfa0941",
                name: "Биокотлета из марсианской Магнолии",
                type: "main",
                proteins: 420,
                fat: 142,
                carbohydrates: 242,
                calories: 4242,
                price: 424,
                image: "https://code.s3.yandex.net/react/code/meat-01.png",
                uuid: '1'
            },
            {
                _id: "643d69a5c3f7b9001cfa093e",
                name: "Филе Люминесцентного тетраодонтимформа",
                type: "main",
                proteins: 44,
                fat: 26,
                carbohydrates: 85,
                calories: 643,
                price: 988,
                image: "https://code.s3.yandex.net/react/code/meat-03.png",
                uuid: '2'
            },
            {
                _id: "643d69a5c3f7b9001cfa0942",
                name: "Соус Spicy-X",
                type: "sauce",
                proteins: 30,
                fat: 20,
                carbohydrates: 40,
                calories: 30,
                price: 90,
                image: "https://code.s3.yandex.net/react/code/sauce-02.png",
                uuid: '3'
            },
            {
                _id: "643d69a5c3f7b9001cfa0943",
                name: "Соус с шипами Антарианского плоскоходного бургера",
                type: "sauce",
                proteins: 101,
                fat: 99,
                carbohydrates: 100,
                calories: 100,
                price: 88,
                image: "https://code.s3.yandex.net/react/code/sauce-01.png",
                uuid: '4'
            }
        ];

        let state = {
            ...constructorIngredientsReducerInitialState,
            constructorIngredients: [first, second, third, fourth]
        }

        expect(reducer(state, moveIngredients({dragIndex: '4', hoverIndex: '3'}))).toEqual({
            ...constructorIngredientsReducerInitialState,
            constructorIngredients: [first, second, fourth, third]
        })

        state = {
            ...constructorIngredientsReducerInitialState,
            constructorIngredients: [first, second, third, fourth]
        }

        expect(reducer(state, moveIngredients({dragIndex: '2', hoverIndex: '4'}))).toEqual({
            ...constructorIngredientsReducerInitialState,
            constructorIngredients: [first, third, second, fourth]
        })

        state = {
            ...constructorIngredientsReducerInitialState,
            constructorIngredients: [first, second, third, fourth]
        }

        expect(reducer(state, moveIngredients({dragIndex: '10', hoverIndex: '9'}))).toEqual({
            ...constructorIngredientsReducerInitialState,
            ...state
        })
    });
})