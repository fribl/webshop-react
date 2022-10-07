import React, { useState } from 'react';
import { useQuery} from 'react-query';
import { NavLink, BrowserRouter, Switch, Route,  } from 'react-router-dom';

//style
import './responsive.css';

//images
import logo from './images/better better.png';
import icon from './images/iconbasket.png';

//components
import Home from './Components/navigation/Home';      
import AllProducts from './Components/navigation/AllProducts';
import Login from './Components/navigation/Login';
import Footer from "./Components/footer"
import { IUserContext} from './Components/users/user-context';
import { IUser } from './Components/users/user-interface';
import { LoginButton } from './Components/users/LoginButton';
import {CardInterface} from "./Components/productDisplay/CardInterface"
import Cart from "./Components/navigation/Basket";
import AllCoffee from './Components/navigation/AllCoffee';
import AllTea from './Components/navigation/AllTea';
import ItemDetail from './Components/productDisplay/itemDetail';
import PutInBasket from './Components/users/UserBasket';

//create context for login
export const UserContext = React.createContext<IUserContext | undefined>(
  undefined
);

//fetch all products
const getProducts = async (): Promise<CardInterface[]> => 
  await (await fetch('http://localhost:3000/products')).json();


function App() {
  //state for the cart
    const [items, setItems] = useState([] as CardInterface[]);
    const { data, isLoading, error} = useQuery<CardInterface[]>(
        'products',
        getProducts,
    );

    const loadData = () => {
      if (!(data === undefined)) {
        setItems(data)
      }
    }
   
   

      const manageAddToCart = (clickedItem: CardInterface) => {
        setItems(prev => {
          //if already in cart:
          const isInCart = prev.find(item => item.productId === clickedItem.productId)

          if (isInCart) {
            return prev.map(item => (
              item.productId === clickedItem.productId
              ? {...item, amount: item.amount + 1}
              : item
            ))
          }
          if (!(user.firstname === "")) {
            PutInBasket(clickedItem.productId)
          }
          return [...prev, {...clickedItem, amount: 1}]

        })
      }

      const manageRemoveFromCart = (productId: number) => {
        setItems(prev =>
          prev.reduce((accumulated, item) => {
            if (item.productId === productId) {
              if (item.amount === 1) return accumulated;
              return [...accumulated, { ...item, amount: item.amount - 1 }];
            } else {
              return [...accumulated, item];
            }
          }, [] as CardInterface[])
        );
      };
  

    //login
   const [user, updateUser] = useState<IUser>({firstname:"", lastname:"", email:""})
   const updateUserFun = (firstname:string, lastname:string, email:string) => {

    updateUser((prev) => ({...prev, ...{firstname:firstname, lastname:lastname, email:email}})) 

   }

  return (
      <div>
        <UserContext.Provider value={{ user: user, updateUser: updateUserFun}}>
        <BrowserRouter>
        <header>
          <ul >
            <li >
            <NavLink exact activeClassName="active" to="/">
                  <img src={logo} alt="Logo"/>
                </NavLink>
            </li>
            <li style={{float: "right"}}>
              <NavLink exact activeClassName="active" to="/login">
                  {LoginButton(user)}
                </NavLink>
            </li>
            <li style={{float: "right"}}>
              <NavLink exact activeClassName="active" to="/basket">
               <div><img src={icon} alt="basket"></img></div>
              </NavLink>
            </li>
          </ul>
          </header>
       
          <div style={{ display: "inline" }}>
            <div >
              <nav>
              <ul >
                <li>
                  <NavLink exact activeClassName="active" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/coffee">
                    Coffee
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/tea">
                    Tea
                  </NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to="/products">
                    All Products
                  </NavLink>
                </li>
              </ul>
              </nav>
            </div>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/basket" render={() => (
                  <Cart cartItems={items}
                  manageAddToCart={manageAddToCart}
                  manageRemoveFromCart={manageRemoveFromCart}
                  />
              )} 
              />
              <Route exact path="/products" render={() => (
                <AllProducts 
                items={data}
                handleAddToCart={manageAddToCart}
                />
              )}
              />
              <Route path="/tea" render={() => (
                  <AllTea items={data}
                  handleAddToCart={manageAddToCart}
                
                  />
              )}  />
              <Route path="/coffee" render={() => (
                  <AllCoffee items={data}
                  handleAddToCart={manageAddToCart}
            
                  />
              )}  />
              <Route path="/products/product/:productId" render={() => (
                  <ItemDetail
                  id={parseInt(window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) )}
                  {...console.log(parseInt(window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1) ))}
                  manageAddToCart={manageAddToCart}
                  />
              )} />
              <Route exact path="/" render={() => (
                <Home manageAddToCart={manageAddToCart} />
              )}
               />
            </Switch>
          </div>
        </BrowserRouter>
        </UserContext.Provider>
        <Footer></Footer>
      </div>
  );
}


export default App;