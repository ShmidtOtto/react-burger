import { IIngredient, IOrderInfo, IUserInfo } from '@interfaces/index';

interface Owner extends Pick<IUserInfo, 'name' | 'email'> {
    createdAt: string;
    updatedAt: string;
}
export interface ICreateOrderResponse {
    order: {
        ingredients: Array<IIngredient>;
        id: string;
        owner: Owner;
        status: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        number: number;
        price: number;
    }
}

export interface IGetOrderResponse {
    orders: Array<IOrderInfo>
}

async function createOrder ({ orderUrl, ingredients }: { orderUrl: string; ingredients: Array<IIngredient> }): Promise<ICreateOrderResponse> {
    const response = await fetch(orderUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': localStorage.getItem('accessToken') || ''
        },
        body: JSON.stringify({ ingredients: ingredients })
    });
    const data = await response.json();
    return data;
}

async function getOrder({ orderUrl, orderNumber }: { orderUrl: string; orderNumber: string }): Promise<IGetOrderResponse> {
    const response = await fetch(orderUrl + '/' + orderNumber);
    const data = await response.json();
    return data;
}

export const orderApi = {
    createOrder: createOrder,
    getOrder: getOrder
};