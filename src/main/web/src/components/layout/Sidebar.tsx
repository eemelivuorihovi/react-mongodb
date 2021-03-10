import React from "react";
import {Link, useLocation} from "react-router-dom";
import {Nav, NavItem} from "react-bootstrap";
import "./Sidebar.css";
import {faPlus, faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import i18n from "../../i18n/translate";

const Sidebar: React.FC = () => {
    const location = useLocation();

    const menuItems = [
        {
            name: i18n("merchants.title"),
            url: "/",
            icon: faShoppingBasket
        },
        {
            name: i18n("merchants.add"),
            url: "/add",
            icon: faPlus
        }
    ];

    const isActive = (url: string) => {
        return url === location.pathname;
    };

    return (
        <div className="aside-body">

            <div className="navbar-header">
                <div className="navbar-brand logo">
                    <span className="fa fa-stack fa-1x">
                        <i className="fa fa-circle-thin fa-stack-2x"/>
                        <i className="fa fa-shopping-basket fa-stack-1x"/>
                    </span>
                </div>
            </div>
            <div className="mt-n2">
                <hr />
            </div>
            <Nav className="nav nav-aside"
                 activeKey="/">
            </Nav>
            <div className="nav-content">
                <div className="nav-content-submenu">
                    <Nav className="nav nav-aside"
                         activeKey="/">
                        <NavItem>
                            <span className="nav-label pl-3">{i18n("menu")}</span>
                        </NavItem>
                        {menuItems.map((item: any, index: any) => (
                                <NavItem key={index}>
                                    <Link to={item.url} className={isActive(item.url) ? "sb-nav-link active" : "sb-nav-link"}>
                                        <FontAwesomeIcon style={{ marginRight: 15, width: 15 }} icon={item.icon} />
                                        <span >{item.name}</span>
                                    </Link>
                                </NavItem>
                            )
                        )}
                    </Nav>
                </div>
            </div>
        </div>
    )
};

export default Sidebar;