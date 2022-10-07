import React from "react";
import teaPic from "../images/tea front SIZE.jpeg";
import coffeepic from "../images/Coffee beans 2.jpeg";
import Offers from "./productDisplay/offers";
import { CardInterface } from "./productDisplay/CardInterface";

type Props = {
    manageAddToCart: (clickedItem: CardInterface) => void;
}

const Index: React.FC<Props> = ({manageAddToCart}) => {
    return (
        <div>
            <ul>
                <li>
                    <img src={teaPic} alt="Tea" style={{maxWidth: "50%", height: "auto", padding: "1 1 1"}}></img>
                </li>
                <li>
                    <img src={coffeepic} alt="coffee" style={{maxWidth: "43%", height: "auto", padding: "1 1 1"}}></img>
                </li>
            </ul>
            <div style={{padding: "2 2 2"}}>
                <Offers manageAddToCart={manageAddToCart}></Offers>
            </div>
        </div>

    )
}

export default Index;