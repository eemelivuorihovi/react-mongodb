import React from "react";
import {NavLink} from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import {Nav} from "react-bootstrap";
import i18n from "../../i18n/translate";

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
                        <NavLink className="nav-link" exact to="/">{i18n("merchants.title")}</NavLink>
                    </div>
                    <div className="navbar-brand nav-item">
                        <NavLink to="/add" className="nav-link">{i18n("merchants.add")}</NavLink>
                    </div>
                </div>
                <Nav>
                    <LanguageSelector />
                </Nav>
            </div>
        </nav>
    );
};

export default Navbar;