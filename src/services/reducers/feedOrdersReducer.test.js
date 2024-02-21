import reducer, { wsOpenFeed, wsCloseFeed, wsErrorFeed, wsMessageFeed, initialState } from './feedOrdersReducer';

const feedOrdersReducerInitialState = Object.assign({}, initialState);

describe('ingredientsReducer test', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(feedOrdersReducerInitialState)
    });

    test('should handle wsOpenFeed', () => {
        expect(reducer(feedOrdersReducerInitialState, wsOpenFeed())).toEqual({
            ...feedOrdersReducerInitialState,
            status: 'ONLINE'
        })
    });

    test('should handle wsCloseFeed', () => {
        expect(reducer(feedOrdersReducerInitialState, wsCloseFeed())).toEqual({
            ...feedOrdersReducerInitialState,
            status: 'OFFLINE'
        })
    });

    test('should handle wsErrorFeed', () => {
        expect(reducer(feedOrdersReducerInitialState, wsErrorFeed('error'))).toEqual({
            ...feedOrdersReducerInitialState,
            connectionError: 'error'
        })
    });

    test('should handle wsMessageFeed', () => {
        const feedOrderPayload = {
            success: true,
            orders: [
                {
                    "_id": "65d42ee397ede0001d05d006",
                    "ingredients": [
                        "643d69a5c3f7b9001cfa093d",
                        "643d69a5c3f7b9001cfa0943",
                        "643d69a5c3f7b9001cfa093d"
                    ],
                    "status": "done",
                    "name": "Space флюоресцентный бургер",
                    "createdAt": "2024-02-20T04:47:31.135Z",
                    "updatedAt": "2024-02-20T04:47:32.444Z",
                    "number": 34621
                }
            ],
            total: 34247,
            totalToday: 114
        }
        expect(reducer(feedOrdersReducerInitialState, wsMessageFeed(feedOrderPayload))).toEqual({
            ...feedOrdersReducerInitialState,
            orders: feedOrderPayload.orders,
            total: feedOrderPayload.total,
            totalToday: feedOrderPayload.totalToday
        })
    });
})