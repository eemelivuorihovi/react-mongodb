import React from "react";
import {Link} from "react-router-dom";

export default class MerchantList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            merchants: props.merchants
        }
    }

    editMerchant(id: string) {
        console.log("edit: " + id);
    }

    deleteMerchant(id: string) {
        let url = "http://localhost:8080/api/merchant/" + id + "/delete";
        fetch(url)
            .then(response => response.json())
            .then(r => {
                if (r.success) {
                    let merchants =
                        this.state.merchants
                            .filter((m: any) => {
                                return m.id !== id;
                            });

                    this.setState({
                        merchants: merchants
                    });
                }
                else {
                    throw new Error(r.message);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }


    render() {
        const {merchants} = this.state;

        return (
            <div>
                {merchants.map((merchant: any) =>
                    <div key={merchant.id} className="row">
                        <div className="col-sm-9 align-middle">
                            <p>{merchant.name}</p>
                        </div>
                        <div className="col-sm-3 align-middle">
                            <Link to={"/edit"}>
                                <button className={"btn btn-edit mr-2 btn-sm"} onClick={() => this.editMerchant(merchant.id)}>
                                    <i className={"fa fa-pencil fa-lg"}/>
                                </button>
                            </Link>
                            <button className={"btn btn-danger btn-sm"} onClick={() => this.deleteMerchant(merchant.id)}>
                                <i className={"fa fa-trash fa-lg"}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}