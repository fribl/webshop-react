import React from "react";
import { Link } from "react-router-dom";
import { CardInterface } from "./CardInterface";

type Props = {
    item: CardInterface;
    manageAddToCart: (clickedItem: CardInterface) => void;
}

const Item: React.FC<Props> = ({item, manageAddToCart}) => (
    
    <div>
    <div className="flex-item">
        <Link to={`/products/product/${item.productId}`} style={{textDecoration: 'none'}}>
        <img className="card-image" src={item.picturePath} alt="product"/>
        
            <h3>{item.name}</h3>
            <p>{item.price} DKK</p>
            </Link>
        <button onClick={() => manageAddToCart(item)}>Add to cart</button>
    </div>    
    </div>
)
export default Item;