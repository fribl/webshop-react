import { DeleteFromBasket } from "../users/UserBasket";
import { CardInterface} from "./CardInterface";

type Props = {
    item: CardInterface;
    manageAddToCart: (clickedItem: CardInterface) => void;
    manageRemoveFromCart: (productId: number) => void;
}

const CartItem: React.FC<Props> = ({item, manageAddToCart, manageRemoveFromCart}) => {
    return (
        <div >
            <h3>{item.name}</h3>
            <div className="info">
               
                <p>Price: {(item.amount * item.price).toFixed(2)} DKK</p>
            </div>
            <div className="add-remove">
              <button onClick={() => manageRemoveFromCart(item.productId)}>
                  -
              </button>
              <p>{item.amount}</p>
              <button onClick={() => manageAddToCart(item)}>
                  +
              </button>
              
            </div>
        </div>
    )
}

export default CartItem 