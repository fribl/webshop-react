import React from "react";
import Index from "../index";
import { CardInterface } from "../productDisplay/CardInterface";

type Props = {
  manageAddToCart: (clickedItem: CardInterface) => void;
}

const Home: React.FC<Props> = ({manageAddToCart}) => {
    return (
        <div>
        <h2>Welcome to Coffee & Tea</h2>
        <Index manageAddToCart={manageAddToCart}></Index>
        </div>
    )
  }
export default Home;