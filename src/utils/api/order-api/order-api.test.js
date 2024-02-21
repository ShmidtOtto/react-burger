
import { orderApi } from '../index';

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks();

describe('orderApi function test', () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    const ordersUrl = 'https://norma.nomoreparties.space/api/orders';

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
            "image": "https://code.s3.yandex.net/react/code/meat-03.png",
            "price": 988,
            "name": "Филе Люминесцентного тетраодонтимформа",
            "proteins": 44,
            "fat": 26,
            "carbohydrates": 85,
            "calories": 643,
            "_id": "643d69a5c3f7b9001cfa093e",
            "type": "main",
            "uuid": "956a5db1-77c7-49d6-875d-5307b47822fc"
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
            "uuid": "ca4b6c22-523d-4921-8d5f-4baf430a06e7"
        }
    ];

    const orderResponse = {
        "success": true,
        "name": "Флюоресцентный люминесцентный бургер",
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
                    "_id": "643d69a5c3f7b9001cfa093e",
                    "name": "Филе Люминесцентного тетраодонтимформа",
                    "type": "main",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
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
            "_id": "65d20c5797ede0001d05cafd",
            "owner": {
                "name": "Otto7",
                "email": "shmidt_o@inbox.ru",
                "createdAt": "2023-12-25T07:29:28.869Z",
                "updatedAt": "2024-02-17T08:23:54.986Z"
            },
            "status": "done",
            "name": "Флюоресцентный люминесцентный бургер",
            "createdAt": "2024-02-18T13:55:35.806Z",
            "updatedAt": "2024-02-18T13:55:36.257Z",
            "number": 34443,
            "price": 2964
        }
    }

    const getOrderResponse = {
        "success": true,
        "orders": [
            {
                "_id": "65d205fe97ede0001d05caf1",
                "ingredients": [
                    "643d69a5c3f7b9001cfa093c",
                    "643d69a5c3f7b9001cfa093e",
                    "643d69a5c3f7b9001cfa0947",
                    "643d69a5c3f7b9001cfa093c"
                ],
                "owner": "65892f5887899c001b825491",
                "status": "done",
                "name": "Краторный фалленианский люминесцентный бургер",
                "createdAt": "2024-02-18T13:28:30.514Z",
                "updatedAt": "2024-02-18T13:28:30.996Z",
                "number": 34442,
                "__v": 0
            }
        ]
    }

    test('createOrder should return a order details', async () => {

        fetchMock.mockResponseOnce(JSON.stringify(orderResponse), {
            status: 200
        });

        let getIngredientResponse = await orderApi.createOrder({orderUrl: ordersUrl, ingredients: ingredients});

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(getIngredientResponse).toEqual(orderResponse);
        expect(fetch).toBeCalledWith(ordersUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': ''
            },
            body: JSON.stringify({ ingredients: ingredients })
        })
    });

    test('getOrder should return a order info', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(getOrderResponse), {
            status: 200
        });

        const orderNumber = '34442';

        let getIngredientResponse = await orderApi.getOrder({orderUrl: ordersUrl, orderNumber: orderNumber});

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(getIngredientResponse).toEqual(getOrderResponse);
        expect(fetch).toBeCalledWith(ordersUrl + '/' + orderNumber)
    })
});