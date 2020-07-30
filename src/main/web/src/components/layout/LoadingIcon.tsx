import React from "react";
import {Spinner} from "react-bootstrap";

const LoadingIcon = () => {
    return (
        <Spinner style={{ display: "block", marginLeft: "auto", marginRight: "auto", height: "5rem", width: "5rem" }}
                 animation="border"
                 variant="dark" />
    );
};

export default LoadingIcon;
