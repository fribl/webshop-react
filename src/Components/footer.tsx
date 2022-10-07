import React from 'react';
import { NavLink, BrowserRouter, Switch, Route } from 'react-router-dom';

const Footer = () => {

    return(
        <div className="footer-container">
            <footer>
            <BrowserRouter>
            <ul>
                <li className="item">
                    <NavLink exact to="/all-products">
                    <p>Our products</p>
                    </NavLink>
                    <NavLink exact to="/">
                    <p>Suppliers</p>
                    </NavLink>
                </li>
                <li className="item">
                    <NavLink exact to="/">
                    <p>Terms and conditions</p>
                    </NavLink>
                    <NavLink exact to="/">
                    <p>Shipping</p>
                    </NavLink> 
                </li>
                <li className="item">
                    <NavLink exact to="/">
                    <p>About</p>
                    </NavLink>
                    <NavLink exact to="/">
                    <p>Our vision</p>
                    </NavLink>
                </li>
            </ul>
            {/* <Switch>
              <Route path="/all-products" component={AllProducts} />
            </Switch> */}
            </BrowserRouter>
            </footer>
        </div>
    )

}
export default Footer;