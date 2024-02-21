import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IOrderInfo } from "@interfaces/index";

import { orderApi } from "@api/index";
import { IGetOrderResponse } from "@api/order-api";

export const getOrder = createAsyncThunk(
    'feedOrder/getOrder',
    async ({ orderUrl, orderNumber }: { orderUrl: string, orderNumber: string }): Promise<IGetOrderResponse> => {
        return await orderApi.getOrder({ orderUrl: orderUrl, orderNumber: orderNumber });
    }
);

interface IInitialState {
    order: IOrderInfo | null;
}

export const initialState: IInitialState = {
    order: null
}

const feedOrderReducer = createSlice({
    name: 'feedOrder',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<IOrderInfo>) => {
            state.order = action.payload;
        },
        removeOrder: (state) => {
            state.order = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.fulfilled, (state, action: PayloadAction<IGetOrderResponse>) => {
                if (!action.payload.orders[0]) {
                    state.order = null;
                    return;
                } else {
                    state.order = action.payload.orders[0];
                }
            })
    }
});

export default feedOrderReducer.reducer;
export const { addOrder, removeOrder } = feedOrderReducer.actions;

export type TFeedOrderActions = ReturnType<typeof addOrder> | ReturnType<typeof removeOrder>;