import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Merchants from "./components/merchant/Merchants";
import CreateMerchant from "./components/merchant/CreateMerchant";

class App extends React.Component<{}, any> {
    render() {
        return (
            <Router>
                <Navbar/>

                <Switch>
                    <Route exact path={"/"} component={Merchants}/>
                    <Route path={"/add"} component={CreateMerchant}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
