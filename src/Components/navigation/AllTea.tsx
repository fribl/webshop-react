import React from "react";
import { CardInterface } from "../productDisplay/CardInterface";
import Item from "../productDisplay/item";



// const getProducts = async (): Promise<CardInterface[]> => 
// await (await fetch('http://localhost:3000/products')).json()

type Props = {
  items: CardInterface[] | undefined;
  handleAddToCart: (clickedItem: CardInterface) => void;
};

const AllTea: React.FC<Props> = ({items, handleAddToCart}) => {

   
  function isTea(element: CardInterface, index: number, array: CardInterface[]) { 
    return (element.category === "tea"); 
 } 

 const teas = items?.filter(isTea);
  
    return (
    <div>
      <h2>Teas</h2>
      <div className="flex-container">
            {teas?.map(item => (
              <div key={item.productId}>
                <Item item={item} manageAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
    </div>
      )
  }

  export default AllTea;