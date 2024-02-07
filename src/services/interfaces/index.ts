export interface IIngredient {
    _id: string;
    type: ingredientsCategories | '';
    uuid: string;
    image: string;
    price: number;
    name: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
}

export interface IUserInfo {
    name: string;
    email: string;
    password?: string;
}

export interface IShortUserInfo extends Omit<IUserInfo, 'password'> {}

export enum ingredientsCategories {
    bun = 'bun',
    sauce = 'sauce',
    main = 'main'
}

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
  }

export enum orderInfoStatus {
    PANDING = 'pending',
    DONE = 'done'
}

export interface IOrderInfo {
    createdAt: string;
    ingredients: Array<string>
    name: string;
    number: number;
    status: orderInfoStatus;
    updatedAt: string;
    _id: string;
}