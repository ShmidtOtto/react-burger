import reducer, { removeCurrentOrder, createOrder, initialState } from './orderReducer';

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks();

const orderReducerInitialState = Object.assign({}, initialState);

describe('orderReducer test', () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    test('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(orderReducerInitialState)
    });

    test('should handle removeCurrentOrder', () => {
        expect(reducer(orderReducerInitialState, removeCurrentOrder())).toEqual({
            ...orderReducerInitialState
        })
    });

    test('should handle createOrder action', async () => {
        const createOrderResponse = {
            "success": true,
            "name": "Флюоресцентный метеоритный бургер",
            "order": {
                "ingredients": [
                    {
                        "_id": "643d69a5c3f7b9001cfa093d",
                        "name": "Флюоресцентная булка R2-D3",
                        "type": "bun",
                        "proteins": 44,
                        "fat": 26,
                        "carbohydrates": 85,
                        "calories": 643,
                        "price": 988,
                        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                        "__v": 0
                    },
                    {
                        "_id": "643d69a5c3f7b9001cfa0940",
                        "name": "Говяжий метеорит (отбивная)",
                        "type": "main",
                        "proteins": 800,
                        "fat": 800,
                        "carbohydrates": 300,
                        "calories": 2674,
                        "price": 3000,
                        "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                        "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                        "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                        "__v": 0
                    },
                    {
                        "_id": "643d69a5c3f7b9001cfa093d",
                        "name": "Флюоресцентная булка R2-D3",
                        "type": "bun",
                        "proteins": 44,
                        "fat": 26,
                        "carbohydrates": 85,
                        "calories": 643,
                        "price": 988,
                        "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                        "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                        "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                        "__v": 0
                    }
                ],
                "_id": "65d427f997ede0001d05cff7",
                "owner": {
                    "name": "name",
                    "email": "email",
                    "createdAt": "2023-12-25T07:29:28.869Z",
                    "updatedAt": "2024-02-17T08:23:54.986Z"
                },
                "status": "done",
                "name": "Флюоресцентный метеоритный бургер",
                "createdAt": "2024-02-20T04:18:01.668Z",
                "updatedAt": "2024-02-20T04:18:02.163Z",
                "number": 34611,
                "price": 4976
            }
        }

        const ingredients = [
            {
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "price": 988,
                "name": "Флюоресцентная булка R2-D3",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "_id": "643d69a5c3f7b9001cfa093d",
                "type": "bun"
            },
            {
                "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                "price": 3000,
                "name": "Говяжий метеорит (отбивная)",
                "proteins": 800,
                "fat": 800,
                "carbohydrates": 300,
                "calories": 2674,
                "_id": "643d69a5c3f7b9001cfa0940",
                "type": "main",
                "uuid": "54b43a5c-d249-48e5-a496-0a3899056e9f"
            },
            {
                "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                "price": 988,
                "name": "Флюоресцентная булка R2-D3",
                "proteins": 44,
                "fat": 26,
                "carbohydrates": 85,
                "calories": 643,
                "_id": "643d69a5c3f7b9001cfa093d",
                "type": "bun",
                "uuid": "53c60d0d-8fa9-41d8-9316-c7b43dbbf35b"
            }
        ]

        fetchMock.mockResponseOnce(JSON.stringify(createOrderResponse), {
            status: 200,
            ok: true
        });

        const dispatch = jest.fn();
        const createOrderRequest = createOrder({ orderUrl: 'https://norma.nomoreparties.space/api/orders', ingredients: ingredients });
        await createOrderRequest(dispatch)

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(createOrder.pending().type);
        expect(end[0].type).toBe(createOrder.fulfilled().type);
        expect(end[0].payload).toEqual(createOrderResponse);

        let state = await reducer(orderReducerInitialState, createOrder.fulfilled(createOrderResponse));

        expect(state).toEqual({
            ...orderReducerInitialState,
            currentOrder: {
                orderRequest: false,
                orderRrror: false,
                orderNumber: createOrderResponse.order.number
            },
            orders: [{
                orderNumber: 34611,
                orderRequest: false,
                orderRrror: false,
            }],
        })
    });

})