import reducer, { wsOpenProfileFeed, wsCloseProfileFeed, wsErrorProfileFeed, wsMessageProfileFeed, initialState } from './profileFeedOrderReducer';


const profileFeedOrderReducerInitialState = Object.assign({}, initialState);

describe('profileFeedOrderReducer test', () => {

    test('should return the initial state', () => {
        expect(reducer(undefined, { type: '' })).toEqual(profileFeedOrderReducerInitialState)
    });

    test('should handle wsOpenProfileFeed', () => {
        expect(reducer(profileFeedOrderReducerInitialState, wsOpenProfileFeed())).toEqual({
            ...profileFeedOrderReducerInitialState,
            status: "ONLINE"
        })
    });

    test('should handle wsCloseProfileFeed', () => {
        expect(reducer(profileFeedOrderReducerInitialState, wsCloseProfileFeed())).toEqual({
            ...profileFeedOrderReducerInitialState,
            status: "OFFLINE"
        })
    });

    test('should handle wsErrorProfileFeed', () => {
        expect(reducer(profileFeedOrderReducerInitialState, wsErrorProfileFeed('error'))).toEqual({
            ...profileFeedOrderReducerInitialState,
            connectionError: "error"
        })
    });

    test('should handle wsMessageProfileFeed', () => {
        const messageOrder = {
            "success": true,
            "orders": [
                {
                    "_id": "65d3ed8d97ede0001d05cfd0",
                    "ingredients": [
                        "643d69a5c3f7b9001cfa093d",
                        "643d69a5c3f7b9001cfa0942",
                        "643d69a5c3f7b9001cfa0943",
                        "643d69a5c3f7b9001cfa093d"
                    ],
                    "status": "done",
                    "name": "Space флюоресцентный spicy бургер",
                    "createdAt": "2024-02-20T00:08:45.177Z",
                    "updatedAt": "2024-02-20T00:08:45.696Z",
                    "number": 34610
                }
            ],
            "total": 34236,
            "totalToday": 1
        }

        expect(reducer(profileFeedOrderReducerInitialState, wsMessageProfileFeed(messageOrder))).toEqual({
            ...profileFeedOrderReducerInitialState,
            orders: messageOrder.orders,
            total: 34236,
            totalToday: 1
        });
    });
})