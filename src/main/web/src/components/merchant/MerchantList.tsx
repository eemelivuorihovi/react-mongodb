import React, {useState} from "react";
import Merchant from "../../model/Merchant";
import EditContext from "../../context/EditContext";
import {Button, ButtonGroup} from "react-bootstrap";
import {faPencilAlt, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import EditModal from "./EditModal";

interface Props {
    merchants: Merchant[]
}

const MerchantList: React.FC<Props> = (props: Props) => {
    const [merchants, setMerchants] = useState<Merchant[]>(props.merchants);

    const deleteMerchant = (id: string) => {
        let url = "http://localhost:8080/api/merchant/" + id + "/delete";
        fetch(url)
            .then(response => response.json())
            .then(r => {
                if (r.success) {
                    let filtered =
                        merchants
                            .filter((m: Merchant) => {
                                return m.id !== id;
                            });

                    setMerchants(filtered);
                }
                else {
                    throw new Error(r.message);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const [showEditModal, setShowEdit] = useState<boolean>(false);
    const setShowEditModal = (show: boolean) => setShowEdit(show);

    const [editMerchant, setEditMerchantState] = useState<Merchant>(null);
    const setEditMerchant = (m: Merchant) => setEditMerchantState(m);

    return (
        <EditContext.Provider value={{editMerchant, setEditMerchant, showEditModal, setShowEditModal}}>
            <div className="merchant-list">
                <ul className="list-group">
                    {merchants.map((merchant: Merchant) =>
                        <li key={merchant.id} className="list-group-item">
                            <div className="row">
                                <div className="col-sm-9">
                                    {merchant.name}
                                </div>
                                <div className="col-sm-3">
                                    <ButtonGroup className="pull-right">
                                        <Button variant="outline-warning" size="sm" onClick={() => {
                                            setEditMerchant(merchant);
                                            setShowEditModal(true)
                                        }}>
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => deleteMerchant(merchant.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            {editMerchant && (
                <EditModal merchant={editMerchant}/>
            )}
        </EditContext.Provider>
    );
};

export default MerchantList;
