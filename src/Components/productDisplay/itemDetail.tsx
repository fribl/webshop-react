import React from "react";
import { useQuery } from "react-query";
import { CardInterface } from "./CardInterface";

type Props = {
    //items: CardInterface[]
    id: number;
    manageAddToCart: (clickedItem: CardInterface) => void;
}

function ProductDetail (id: number) {
    const getProduct = async (): Promise<CardInterface> => 
    await (await fetch(`http://localhost:3000/products/product/${id}`)).json();
   // const [cartItem, setCartItem] = useState({} as CardInterface);
        const {data, error, isLoading} = useQuery<CardInterface>(
            'product',
            getProduct
        );

    if (!isLoading) {
        return data
    } 
    if (data === undefined) {
        return isLoading;
    }
}

const ItemDetail: React.FC<Props> = ({id, manageAddToCart}) => {

    const item: any = ProductDetail(id);
        //console.log(cartItem);
       
    //let item: CardInterface = findMatch(id, items)

    return(
    <div className="detail-box">
        <div className="detail-item">
        <img src={item.picturePath} alt="product"/>
        </div>
        <div className="detail-item">
            <div className="info-box">
            <p className="title">{item.name}</p>
            <p>{item.description}</p>
            <p>{item.price} DKK</p>
            <button onClick={async () => manageAddToCart(item)}>Add to cart</button>
            </div>
        </div>
        
    </div>
    )
}
export default ItemDetail;