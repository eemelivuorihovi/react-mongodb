import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark mb-3">
            <div className={"container-fluid"}>
                <div className={"navbar-header"}>
                    <div className="navbar-brand">
                        <h5>Marktplace</h5>
                    </div>
                    <div className="navbar-brand">
                        <Link className={"App-link"} to={"/"}>Merchants</Link>
                    </div>
                    <div className="navbar-brand">
                        <Link to={"/add"} className={"App-link"}>Add Merchant</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;