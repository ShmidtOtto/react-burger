import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsReducer';
import constructorIngredientsReducer from './constructorIngredientsReducer';
import orderReducer from './orderReducer';
import ingredientDetailsReducer from './ingredientDetailsReducer';
import userReducer from './userReducer';
import feedOrderReducer from './feedOrderReducer';
import feedOrdersReducer, { wsConnectFeed, wsDisconnectFeed, wsOpenFeed, wsCloseFeed, wsErrorFeed, wsMessageFeed } from './feedOrdersReducer';
import profileFeedOrderReducer, { wsConnectProfileFeed, wsDisconnectProfileFeed, wsOpenProfileFeed, wsCloseProfileFeed, wsErrorProfileFeed, wsMessageProfileFeed } from './profileFeedOrderReducer';

import { socketMiddleware } from './middlewares/socket-middleware';

const feedOrderSocketMiddleware = socketMiddleware({
    wsConnect: wsConnectFeed,
    wsDisconnect: wsDisconnectFeed,
    onOpen: wsOpenFeed,
    onClose: wsCloseFeed,
    onError: wsErrorFeed,
    onMessage: wsMessageFeed
});

const profileFeedOrderSocketMiddleware = socketMiddleware({
    wsConnect: wsConnectProfileFeed,
    wsDisconnect: wsDisconnectProfileFeed,
    onOpen: wsOpenProfileFeed,
    onClose: wsCloseProfileFeed,
    onError: wsErrorProfileFeed,
    onMessage: wsMessageProfileFeed
});


const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructorIngredients: constructorIngredientsReducer,
    order: orderReducer,
    ingredientDetails: ingredientDetailsReducer,
    user: userReducer,
    feedOrderReducer: feedOrderReducer,
    feedOrders: feedOrdersReducer,
    profileFeedOrder: profileFeedOrderReducer
});

const store = configureStore({ 
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(feedOrderSocketMiddleware, profileFeedOrderSocketMiddleware);
    }
 });

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch