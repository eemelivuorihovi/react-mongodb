import React from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark mb-3">
            <div className="container-fluid">
                <div className="navbar-header">
                    <div className="navbar-brand logo">
                        <span className="fa fa-stack fa-1x">
                            <i className="fa fa-circle-thin fa-stack-2x"/>
                            <i className="fa fa-shopping-basket fa-stack-1x"/>
                        </span>
                    </div>
                    <div className="navbar-brand nav-item">
                        <NavLink className="nav-link" exact to="/">Merchants</NavLink>
                    </div>
                    <div className="navbar-brand nav-item">
                        <NavLink to="/add" className="nav-link">Add Merchant</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;