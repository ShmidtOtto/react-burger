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