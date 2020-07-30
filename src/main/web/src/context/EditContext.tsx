import React from "react";
import Merchant from "../model/Merchant";

const EditContext = React.createContext({
    editMerchant: {} as Merchant,
    setEditMerchant: (m: Merchant) => {},
    showEditModal: false,
    setShowEditModal: (show: boolean) => {}
});

export default EditContext;
