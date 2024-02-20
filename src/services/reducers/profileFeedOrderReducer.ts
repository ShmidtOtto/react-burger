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

export const initialState: IInitialState = {
    orders: [],
    status: WebsocketStatus.OFFLINE,
    connectionError: '',
    total: 0,
    totalToday: 0

}

const feedOrderReducer = createSlice({
    name: 'profileFeedOrder',
    initialState,
    reducers: {
        wsOpenProfileFeed: (state) => {
            state.status = WebsocketStatus.ONLINE;
        },
        wsCloseProfileFeed: (state) => {
            state.status = WebsocketStatus.OFFLINE;
        },
        wsErrorProfileFeed: (state, action) => {
            state.connectionError = action.payload;
        },
        wsMessageProfileFeed: (state, action: PayloadAction<IFeedOrderResponse>) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        }
    },
});

export default feedOrderReducer.reducer;
export const { wsOpenProfileFeed, wsCloseProfileFeed, wsErrorProfileFeed, wsMessageProfileFeed } = feedOrderReducer.actions;

export const wsConnectProfileFeed = createAction<string, 'profileFeedOrder/wsConnectFeed'>('profileFeedOrder/wsConnectFeed');
export const wsDisconnectProfileFeed = createAction('profileFeedOrder/wsDisconnectFeed');

export type TFeedOrderActions = ReturnType<typeof wsOpenProfileFeed>
  | ReturnType<typeof wsCloseProfileFeed>
  | ReturnType<typeof wsErrorProfileFeed>
  | ReturnType<typeof wsMessageProfileFeed>
  | ReturnType<typeof wsConnectProfileFeed>
  | ReturnType<typeof wsDisconnectProfileFeed>;