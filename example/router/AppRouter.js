import React from "react";
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import D3 from '../pages/D3';

import '../assets/styles/index.css';
import '../../example/assets/styles/Router.css';

const Header = () => (
    <header className="header-style">
        <NavLink className="nav-item" to="/D3" activeClassName="is-active" exact >D3</NavLink>
    </header>
);
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/D3" component={() => <D3/>}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;