import React, {useContext, useState} from "react";
import Merchant from "../../model/Merchant";
import {Button, FormControl, InputGroup, Modal, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";
import EditContext from "../../context/EditContext";
import Location from "../../model/Location";
import Creatable from "react-select/creatable";
import SelectOption from "../../model/SelectOption";
import i18n from "../../i18n/translate";

interface Props {
    merchant: Merchant
}

const EditModal: React.FC<Props> = (props: Props) => {
    const {editMerchant, setEditMerchant, showEditModal, setShowEditModal} = useContext(EditContext);
    const [merchant, setMerchant] = useState<Merchant>(props.merchant);

    const handleClose = () => {
        setShowEditModal(false);
    };

    const setName = (event: any) => {
        let m = {
            ...merchant,
            name: event.target.value
        };

        setMerchant(m);
    };

    const setDescription = (event: any) => {
        let m = {
            ...merchant,
            description: event.target.value
        };

        setMerchant(m);
    };

    const setPostcode = (event: any) => {
        let m = {
            ...merchant,
            location: {
                postcode: event.target.value
            } as Location
        };

        setMerchant(m);
    };

    const setTags = (selection: SelectOption[]) => {
        let t = selection.map(tag => tag.value);
        setMerchant({
            ...merchant,
            tags: t
        });
    };

    const [saving, setSaving] = useState<boolean>(false);
    const save = () => {
        setSaving(true);
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(merchant)
        };

        let url = "http://localhost:8080/api/merchant/save";
        fetch(url, options)
            .then(response => response.json())
            .then(data => {
                setSaving(false);
                handleClose()
            })
            .catch(error => console.error(error));
    };

    return (
        <Modal show={showEditModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit {editMerchant.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>{i18n("merchants.name")}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder={i18n("merchants.name")} value={merchant.name} onChange={(event: any) => setName(event)}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>{i18n("merchants.description")}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl as="textarea"
                                 placeholder={i18n("merchants.description")}
                                 value={merchant.description}
                                 onChange={(event: any) => setDescription(event)}/>
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>{i18n("merchants.postcode")}</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl placeholder={i18n("merchants.postcode")} value={merchant.location.postcode} onChange={(event: any) => setPostcode(event)}/>
                </InputGroup>

                <Creatable onChange={(e: any) => setTags(e)}
                           placeholder={i18n("merchants.tags")}
                           isMulti
                           value={
                               merchant.tags.map(tag => ({
                                   value: tag,
                                   label: tag
                               }))
                           }
                           options={
                               merchant.tags.map(tag => ({
                                   value: tag,
                                   label: tag
                               }))
                           } />
            </Modal.Body>
            <Modal.Footer>
                {saving ? (
                    <Button variant="success" disabled>
                        <span className="mr-2">
                            {i18n("saving")}
                        </span>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </Button>
                ) : (
                    <Button variant="success"
                            className="pull-right"
                            onClick={() => save()}>
                        <span className="mr-2">
                            {i18n("save")}
                        </span>
                        <FontAwesomeIcon icon={faSave}/>
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    )
};

export default EditModal;
