import React from "react";
import {BrowserRouter, NavLink, Route, Switch} from "react-router-dom";
import App from '../pages/App';
import D3 from '../pages/D3';
import Cytoscape from '../components/Cytoscape/Cytoscape';
import Test from '../pages/test';

import '../assets/styles/index.css';
import '../../example/assets/styles/Router.css';

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