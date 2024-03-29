import React, {useEffect, useState} from "react";
import LoadingIcon from "../layout/LoadingIcon";
import MerchantList from "./MerchantList";
import Map from "./Map";
import Merchant from "../../model/Merchant";
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import i18n from "../../i18n/translate";

const Merchants: React.FC = () => {
    const [merchants, setMerchants] = useState<Merchant[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            await axios.get('http://localhost:8080/api/merchant')
                .then(r => setMerchants(r.data.data))
                .finally(() => setLoading(false));
        };

        fetchData();
    }, []);

    return (

        <Container fluid className="h-100 d-flex w-100" style={{ paddingLeft: "2em", paddingRight: "2em" }}>
            {loading ? (
                <LoadingIcon />
            ) : (
                <div className="pl-3">
                    <Row>
                        <Col className="pl-5">
                            <h2>{i18n("merchants.title")}</h2>
                        </Col>
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
