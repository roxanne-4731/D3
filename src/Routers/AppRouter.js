import React from "react";
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import App from '../Pages/App';
import D3 from '../Pages/D3';
import Cytoscape from '../Components/Cytoscape/Cytoscape';
import Test from '../Pages/test';

import '../Styles/index.css';
import '../Styles/Router.css';

const Header = () => (
    <header className="header-style">
        <NavLink className="nav-item" to="/" activeClassName="is-active">React</NavLink>
        <NavLink className="nav-item" to="/D3" activeClassName="is-active">D3</NavLink>
        <NavLink className="nav-item" to="/Cytoscape" activeClassName="is-active">Cytoscape</NavLink>
        <NavLink className="nav-item" to="/ForTest" activeClassName="is-active">For Test</NavLink>
    </header>
);
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={App} exact={true}/>
                <Route path="/D3" component={() => <D3/>}/>
                <Route path="/Cytoscape" component={() => <Cytoscape/>}/>
                <Route path="/ForTest" component={() => <Test/>}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;