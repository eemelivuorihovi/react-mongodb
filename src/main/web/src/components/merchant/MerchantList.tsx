import React from "react";
import {Link} from "react-router-dom";

export default class MerchantList extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            merchants: props.merchants
        }
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
                        <div className="col-sm-9">
                            <p>{merchant.name}</p>
                        </div>
                        <div className="col-sm-3">
                            <Link to={"/edit/" + merchant.id} className={"btn btn-edit mr-2 btn-sm"} title={"Edit " + merchant.name}>
                                <i className={"fa fa-pencil fa-lg"}/>
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