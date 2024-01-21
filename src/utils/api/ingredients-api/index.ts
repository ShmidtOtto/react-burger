import { IIngredient } from '@interfaces/index'; 

async function getIngredients(ingredientsUrl: string): Promise<IIngredient[]> {
    const response = await fetch(ingredientsUrl);
    if (!response.ok) throw new Error('Network response was not ok: status is ' + response.status);
    const data = await response.json();
    return data.data;
}

export const ingredientsApi = {
    getIngredients: getIngredients
}