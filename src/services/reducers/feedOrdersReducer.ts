import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";

import { WebsocketStatus, IOrderInfo } from "@interfaces/index";

interface IFeedOrderResponse {
    orders: Array<IOrderInfo>;
    success: boolean;
    total: number;
    totalToday: number;
}

interface IInitialState {
    orders: Array<IOrderInfo>;
    status: WebsocketStatus;
    connectionError: string;
    total: number;
    totalToday: number;
}

const initialState: IInitialState = {
    orders: [],
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    total: 0,
    totalToday: 0

}

const feedOrdersReducer = createSlice({
    name: 'feedOrders',
    initialState,
    reducers: {
        wsOpenFeed: (state) => {
            state.status = WebsocketStatus.ONLINE;
        },
        wsCloseFeed: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsErrorFeed: (state, action) => {
            state.connectionError = action.payload;
        },
        wsMessageFeed: (state, action: PayloadAction<IFeedOrderResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    },
});

export default feedOrdersReducer.reducer;
export const { wsOpenFeed, wsCloseFeed, wsErrorFeed, wsMessageFeed } = feedOrdersReducer.actions;

export const wsConnectFeed = createAction<string, 'feedOrders/wsConnectFeed'>('feedOrders/wsConnectFeed');
export const wsDisconnectFeed = createAction('feedOrders/wsDisconnectFeed');

export type TFeedOrderActions = ReturnType<typeof wsOpenFeed>
  | ReturnType<typeof wsCloseFeed>
  | ReturnType<typeof wsErrorFeed>
  | ReturnType<typeof wsMessageFeed>
  | ReturnType<typeof wsConnectFeed>
  | ReturnType<typeof wsDisconnectFeed>;