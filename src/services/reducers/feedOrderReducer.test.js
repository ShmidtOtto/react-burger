import reducer, { addOrder, removeOrder, getOrder, initialState } from './feedOrderReducer';

import fetchMock from 'jest-fetch-mock'
fetchMock.enableMocks();

const feedOrderReducerInitialState = Object.assign({}, initialState);

describe('feedOrderReducer test', () => {
    beforeEach(() => {
        fetch.resetMocks()
    });

    test('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(feedOrderReducerInitialState)
    });

    test('should handle addOrder', () => {
        const order = {
            _id: "65d39ad097ede0001d05cf17",
            ingredients: [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa0943",
                "643d69a5c3f7b9001cfa093d"
            ],
            status: "done",
            name: "Space флюоресцентный бургер",
            createdAt: "2024-02-19T18:15:44.604Z",
            updatedAt: "2024-02-19T18:15:45.554Z",
            number: 34572
        }

        expect(reducer(feedOrderReducerInitialState, addOrder(order))).toEqual({
            ...feedOrderReducerInitialState,
            order: order
        })
    });

    test('should handle removeOrder', () => {
        expect(reducer(feedOrderReducerInitialState, removeOrder())).toEqual({
            ...feedOrderReducerInitialState,
            order: null
        })
    });

    test('should handle getOrder action with payload', async () => {
        const getOrderResponse = {
            "success": true,
            "orders": [
              {
                "_id": "65d42e4a97ede0001d05d003",
                "ingredients": [
                  "643d69a5c3f7b9001cfa093d",
                  "643d69a5c3f7b9001cfa0943",
                  "643d69a5c3f7b9001cfa093d"
                ],
                "owner": "65b5326787899c001b82ba8d",
                "status": "done",
                "name": "Space флюоресцентный бургер",
                "createdAt": "2024-02-20T04:44:58.400Z",
                "updatedAt": "2024-02-20T04:44:59.556Z",
                "number": 34618,
                "__v": 0
              }
            ]
          }

        fetchMock.mockResponseOnce(JSON.stringify(getOrderResponse), {
            status: 200,
            ok: true
        });

        const dispatch = jest.fn();
        const loginRequest = getOrder({ orderUrl: 'https://norma.nomoreparties.space/api/orders', orderNumber: '34618' });
        await loginRequest(dispatch)

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(getOrder.pending().type);
        expect(end[0].type).toBe(getOrder.fulfilled().type);
        expect(end[0].payload).toEqual(getOrderResponse);

        expect(fetch).toBeCalledWith('https://norma.nomoreparties.space/api/orders/34618')

        let state = await reducer(feedOrderReducerInitialState, getOrder.fulfilled(getOrderResponse));

        expect(state).toEqual({
            ...feedOrderReducerInitialState,
            order: getOrderResponse.orders[0]
        })
    });

    test('should handle getOrder action without payload', async () => {
        const getOrderResponse = {
            "success": true,
            "orders": []
          }

        fetchMock.mockResponseOnce(JSON.stringify(getOrderResponse), {
            status: 200,
            ok: true
        });

        const dispatch = jest.fn();
        const loginRequest = getOrder({ orderUrl: 'https://norma.nomoreparties.space/api/orders', orderNumber: '34618' });
        await loginRequest(dispatch)

        const { calls } = dispatch.mock;
        expect(calls).toHaveLength(2);

        const [start, end] = calls;

        expect(start[0].type).toBe(getOrder.pending().type);
        expect(end[0].type).toBe(getOrder.fulfilled().type);
        expect(end[0].payload).toEqual(getOrderResponse);

        expect(fetch).toBeCalledWith('https://norma.nomoreparties.space/api/orders/34618')

        let state = await reducer(feedOrderReducerInitialState, getOrder.fulfilled(getOrderResponse));

        expect(state).toEqual({
            ...feedOrderReducerInitialState,
            order: null
        })
    });
})