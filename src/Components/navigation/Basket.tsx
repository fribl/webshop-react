import React from "react";
import { CardInterface} from "../productDisplay/CardInterface";
import CartItem from "../productDisplay/cartItem";
import { IUser } from "../users/user-interface";

 
type Props = {
  cartItems: CardInterface[];
  manageAddToCart: (clickedItem: CardInterface) => void;
  manageRemoveFromCart: (productId: number) => void;
};


const Cart: React.FC<Props> = ({ cartItems, manageAddToCart, manageRemoveFromCart}, user: IUser) => {

  return(
    <div >     
      <h2>Cart content</h2>
      <div className="basket">
      <div className="cart-content">
      {cartItems.length === 0 ? <p>Cart is empty</p> : null}
      {cartItems.map(item => (
        <CartItem 
        key={item.productId}
        item={item}
        manageAddToCart={manageAddToCart}
        manageRemoveFromCart={manageRemoveFromCart}
        />
      ))}
      </div>
      <div className="cart-items">
        <div>
        <h3>Total: {sum(cartItems)} DKK</h3>
        <button>Pay now</button>
        </div>
     
      </div>
      </div>
    </div>
  )
}

export default Cart;

//calculating the sum:
function sum(cartItems: CardInterface[]) {
  let total = 0;
  cartItems.forEach(item => {
    const price = (item.amount * item.price);
    total = total + price;
  });
  return total.toFixed(2);
}
