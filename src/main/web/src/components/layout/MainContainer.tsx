import React from "react";
import {Route, Switch} from "react-router-dom";
import Merchants from "../merchant/Merchants";
import CreateMerchant from "../merchant/CreateMerchant";
import "./MainContainer.css";

const MainContainer: React.FC = () => {
    return (
        <div className="main-container">
            <div style={{ padding: 15}} className="main-container-content">
                <div style={{ height: "100%", paddingLeft: "2em", paddingRight: "2em" }}>
                    <Switch>
                        <Route exact path="/" component={Merchants}/>
                        <Route path="/add" component={CreateMerchant}/>
                    </Switch>
                </div>
            </div>
        </div>
    )
};

export default MainContainer;