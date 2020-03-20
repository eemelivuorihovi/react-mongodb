import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Merchants from "./components/merchant/Merchants";
import CreateMerchant from "./components/merchant/CreateMerchant";
import EditMerchant from "./components/merchant/EditMerchant";

class App extends React.Component<{}, any> {
    render() {
        return (
            <Router>
                <Navbar/>

                <div className="container">
                    <Switch>
                        <Route exact path={"/"} component={Merchants}/>
                        <Route path={"/add"} component={CreateMerchant}/>
                        <Route path={"/edit/:id"} component={EditMerchant}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
