import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { IIngredient } from '@interfaces/index';
import { orderApi } from '@api/index';
import { ICreateOrderResponse } from '@api/order-api';

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async ({ orderUrl, ingredients }: { orderUrl: string; ingredients: Array<IIngredient> }): Promise<ICreateOrderResponse> => {
        return await orderApi.createOrder({ orderUrl, ingredients });
    }
)

interface IOrderInfo {
    orderRequest: boolean,
    orderRrror: boolean,
    orderNumber: number | null
}

interface IOrderState {
    orders: Array<IOrderInfo>;
    currentOrder: IOrderInfo
}

export const initialState: IOrderState = {
    orders: [],
    currentOrder: {
        orderRequest: false,
        orderRrror: false,
        orderNumber: null
    },
};

const orderReducer = createSlice({
    name: 'order',
    initialState,
    reducers: {
        removeCurrentOrder: (state) => {
            state.currentOrder = {
                orderRequest: false,
                orderRrror: false,
                orderNumber: null
            };
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.fulfilled, (state, action: PayloadAction<ICreateOrderResponse>) => {
            state.currentOrder = {
                orderRequest: false,
                orderRrror: false,
                orderNumber: action.payload.order.number
            };

            state.orders.push({
                orderRequest: false,
                orderRrror: false,
                orderNumber: action.payload.order.number
            });
        }).addCase(createOrder.rejected, (state) => {
            state.currentOrder = {
                orderRequest: false,
                orderRrror: true,
                orderNumber: null
            };
        }).addCase(createOrder.pending, (state) => {
            state.currentOrder = {
                orderRequest: true,
                orderRrror: false,
                orderNumber: null
            };
        })
    }
});


export default orderReducer.reducer;
export const { removeCurrentOrder } = orderReducer.actions