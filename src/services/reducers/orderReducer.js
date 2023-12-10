import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getOrder = createAsyncThunk(
    'order/getOrder',
    async ({ orderUrl, ingredients }) => {
        const response = await fetch(orderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ ingredients: ingredients })
        });
        const data = await response.json();
        return data;
    }
)

const initialState = {
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
        .addCase(getOrder.fulfilled, (state, action) => {
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
        }).addCase(getOrder.rejected, (state) => {
            state.currentOrder = {
                orderRequest: false,
                orderRrror: true
            };
        }).addCase(getOrder.pending, (state) => {
            state.currentOrder = {
                orderRequest: true,
                orderRrror: false
            };
        })
    }
});


export default orderReducer.reducer;
export const { removeCurrentOrder } = orderReducer.actions