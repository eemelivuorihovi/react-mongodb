import React, {useEffect, useState} from "react";
import LoadingIcon from "../layout/LoadingIcon";
import MerchantList from "./MerchantList";
import Map from "./Map";
import Merchant from "../../model/Merchant";
import {Col, Container, Row} from "react-bootstrap";

const Merchants: React.FC = () => {
    const [merchants, setMerchants] = useState<Merchant[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);

            fetch('http://localhost:8080/api/merchant')
                .then(response => response.json())
                .then(r => {
                    setMerchants(r.data);
                    setLoading(false);
                });
        };

        fetchData();
    }, []);

    return (

        <Container fluid className="h-100 d-flex w-100" style={{ paddingLeft: "2em", paddingRight: "2em" }}>
            {loading ? (
                <LoadingIcon />
            ) : (
                <div>
                    <Row>
                        <h2>Merchants</h2>
                    </Row>
                    <Row>
                        <Col>
                            <MerchantList merchants={merchants}/>
                        </Col>
                        <Col>
                            <Map merchants={merchants}/>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    );
};

export default Merchants;
