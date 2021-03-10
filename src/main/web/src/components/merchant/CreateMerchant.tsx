import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import Merchant from "../../model/Merchant";
import axios from "axios";
import Creatable from "react-select/creatable";
import SelectOption from "../../model/SelectOption";
import i18n from "../../i18n/translate";

const CreateMerchant: React.FC = () => {
    let history = useHistory();

    const [merchant, setMerchant] = useState<Merchant>({} as Merchant);
    const setName = (e: any) => {
        let updated = {
            ...merchant,
            name: e.target.value
        };

        setMerchant(updated);
    };

    const setDescription = (e: any) => {
        let updated = {
            ...merchant,
            description: e.target.value
        };

        setMerchant(updated);
    };

    const setPostcode = (e: any) => {
        let updated = {
            ...merchant,
            location: {
                postcode: e.target.value
            }
        } as Merchant;

        setMerchant(updated);
    };

    const setTags = (selection: SelectOption[]) => {
        let t = selection.map(tag => tag.value);
        setMerchant({
            ...merchant,
            tags: t
        });
    };

    const save = async () => {
        await axios.post("http://localhost:8080/api/merchant/save", merchant)
            .then(response => responseHandler(response.data))
            .catch(error => {
                console.error(error);
            });
    };

    const responseHandler = (data: any) => {
        if (data.success) {
            history.push("/");
        }
        else {
            throw new Error(data.message);
        }
    };

    return (
        <Row className="pt-3">
            <Col>
                <div className="content-card" style={{minWidth: "60vw"}}>
                    <div className="row form-group">
                        <div className="col-sm-10 content-card-header">
                            <span>{i18n("merchants.add")}</span>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-success pull-right" onClick={save}>
                                <span>
                                    <span className="pr-2">{i18n("save")}</span>
                                    <i className="fa fa-floppy-o fa-lg"/>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-sm-3">{i18n("merchants.name")}</div>
                        <div className="col-sm-9">
                            <input id="name" className="form-control" type="text"
                                   onChange={setName}/>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-3">
                            {i18n("merchants.description")}
                        </div>
                        <div className="col-sm-9">
                            <input id="description" className="form-control" type="text"
                                   onChange={setDescription}/>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-3">
                            {i18n("merchants.postcode")}
                        </div>
                        <div className="col-sm-9">
                            <input id="postcode" className="form-control" type="text"
                                   onChange={setPostcode}/>
                        </div>
                    </div>

                    <div className="row form-group">
                        <div className="col-sm-3">
                            {i18n("merchants.tags")}
                        </div>
                        <div className="col-sm-9">
                            <Creatable onChange={(e: any) => setTags(e)}
                                       placeholder="Add tags"
                                       isMulti/>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default CreateMerchant;
