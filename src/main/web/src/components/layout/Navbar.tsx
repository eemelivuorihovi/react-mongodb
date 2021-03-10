import React from "react";
import LanguageSelector from "./LanguageSelector";
import {Nav} from "react-bootstrap";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark top-nav pb-3 pt-1">
            <div className="container-fluid mt-1">
                <div className="navbar-header">
                </div>
                <Nav className="mt-1">
                    <LanguageSelector />
                </Nav>
            </div>
        </nav>
    );
};

export default Navbar;