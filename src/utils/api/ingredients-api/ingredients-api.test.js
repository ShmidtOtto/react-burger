
import { ingredientsApi } from '../index';

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks();

describe('get ingredients function test', () => {
    beforeEach(() => {
        fetch.resetMocks()
    })


    const ingredientResponse = {
        "_id": "643d69a5c3f7b9001cfa093c",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    }

    const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';

    test('should return a ingredients', async () => {

        fetchMock.mockResponseOnce(JSON.stringify({
            "success": true,
            "data": [
                ingredientResponse
            ]
        }), {
            status: 200
        });

        let getIngredientResponse = await ingredientsApi.getIngredients(ingredientsUrl);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(getIngredientResponse).toEqual([ingredientResponse]);
        expect(fetch).toBeCalledWith(ingredientsUrl)
    });

    test('should return an error', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            "success": false,
        }), {
            status: 500
        });

        let responseError = ''

        try {
            let getIngredientResponse = await ingredientsApi.getIngredients(ingredientsUrl);
        } catch (err) {
            responseError = err.message;
        } finally {
            expect(responseError).toEqual('Network response was not ok: status is 500');
        }
    })
});