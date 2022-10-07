import React from "react";
import { useQuery } from "react-query";
import Item from "./item";
import  {  CardInterface } from "./CardInterface";


type Props = {
    manageAddToCart: (clickedItem: CardInterface) => void;
  };

const getProducts = async (): Promise<CardInterface[]> => 
  await (await fetch('http://localhost:3000/products')).json();

function isOnOffer(element: CardInterface) { 
    return (element.price <= 39); 
} 
  

const Offers: React.FC<Props> = ({manageAddToCart}) => {
    const { data } = useQuery<CardInterface[]>(
        'products',
        getProducts,
    );

    const Items: CardInterface[] = [];
    data?.filter((element: CardInterface) => {
        if (isOnOffer(element)) {
          Items.push(element)
        }
    });

    return (
        <div>
            <h2>Get them before it is too late</h2>
            <div className="flex-containeroffer">
                {Items?.map(item => (
                    <div key={item.productId}>
                    <Item item={item} manageAddToCart={manageAddToCart}/> 
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Offers;

