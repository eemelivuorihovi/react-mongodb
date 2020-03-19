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
                <div className="App">
                    <Navbar/>
                </div>

                <div className="container">
                    <Switch>
                        <Route exact path={"/"}>
                            <Merchants/>
                        </Route>
                        <Route path={"/add"}>
                            <CreateMerchant/>
                        </Route>
                        <Route path={"/edit/:id"} component={EditMerchant}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
