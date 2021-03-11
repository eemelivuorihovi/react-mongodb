import React, {useEffect, useState} from "react";
import LoadingIcon from "../layout/LoadingIcon";
import MerchantList from "./MerchantList";
import Map from "./Map";
import Merchant from "../../model/Merchant";
import {Col, Row} from "react-bootstrap";
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
        <div>
            {loading ? (
                <LoadingIcon />
            ) : (
                // <div className="content-card pl-3">
                //     <Row>
                //         <Col className="pl-5 content-card-header">
                //             <span>{i18n("merchants.title")}</span>
                //         </Col>
                //     </Row>
                //     <Row>
                //         <Col>
                //             <MerchantList merchants={merchants}/>
                //         </Col>
                //         <Col>
                //             <Map merchants={merchants}/>
                //         </Col>
                //     </Row>
                // </div>
                <Row>
                    <Col xl={4} lg={4} md={5} sm={6} xs={12}>
                        <div className="content-card">
                            <div className="content-card-header">
                                <span>{i18n("merchants.title")}</span>
                            </div>
                            <div>
                                <MerchantList merchants={merchants}/>
                            </div>
                        </div>
                    </Col>

                    <Col xl={8} lg={8} md={7} sm={6} xs={12}>
                        <div className="content-card pr-2" style={{overflowX: "hidden"}}>
                            <div className="content-card-header">
                                {i18n("map")}
                            </div>
                            <div style={{width: "100%", height: "100%"}}>
                                {/*<MerchantMap merchants={merchants}/>*/}
                                <Map merchants={merchants} />
                            </div>
                        </div>
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default Merchants;
