import React from "react";
import { CardInterface } from "../productDisplay/CardInterface";
import Item from "../productDisplay/item";


type Props = {
  items: CardInterface[] | undefined;
  handleAddToCart: (clickedItem: CardInterface) => void;
};

const AllProducts: React.FC<Props> = ({items, handleAddToCart}) => {
  
    return (
    <div>
      <h2>All products</h2>
      <div className="flex-container">
            {items?.map(item => (
              <div key={item.productId} >
                <Item item={item} manageAddToCart={handleAddToCart} />
              </div>
            ))}
          </div>
  
    </div>
      )
  }

  export default AllProducts;
