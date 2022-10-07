import React from "react";
import { CardInterface } from "../productDisplay/CardInterface";
import Item from "../productDisplay/item";


type Props = {
  items: CardInterface[] | undefined;
  handleAddToCart: (clickedItem: CardInterface) => void;
};

const AllCoffee: React.FC<Props> = ({items, handleAddToCart}) => {
  
  function isCoffee(element: CardInterface, index: number, array: CardInterface[]) { 
    return (element.category === "coffee"); 
  }  

  const coffees = items?.filter(isCoffee);
    return (
    <div>
      <h2>Coffees</h2>
      <div className="flex-container">

            {coffees?.map(item => (
              <div key={item.productId}>
                <Item item={item} manageAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
    </div>
      )
  }

  export default AllCoffee;