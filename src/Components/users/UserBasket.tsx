

//For illustration: put in basket of specific user with id 2
export default async function PutInBasket(productId: number) {
    const url = `http://localhost:3000/customers/2/basket/${productId}`;
    const response = await fetch(url, {method: 'PUT'});
    const data = await response.json();
    return data;

}

//delete from basket
export async function DeleteFromBasket(productId: number) {
    const url = `http://localhost:3000/customers/2/basket/${productId}`;
    const response = await fetch(url, {method: 'DELETE'});
    const data = await response.json();
    return data;

}

//get basket from soecific user...not working
export async function GetBasket(userId: number) {

    const url = `http://localhost:3000/customers/${userId}/basket`;
    const response = await fetch(url, {method: 'GET'})
    const  data = await response.json();
    console.log(data);
    return data;
}
