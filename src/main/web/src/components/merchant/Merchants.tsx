import React from "react";
import {Link} from "react-router-dom";
import LoadingIcon from "../layout/LoadingIcon";

class Merchants extends React.Component<{}, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            merchants: [],
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        fetch('http://localhost:8080/api/merchant')
            .then(response => response.json())
            .then(r =>
                this.setState({
                    merchants: r.data,
                    isLoading: false
                })
            );
    }

    editMerchant(id: string) {
        console.log("edit: " + id);
    }

    deleteMerchant(id: string) {
        console.log("delete: " + id);
    }

    render() {
        const {merchants, isLoading} = this.state;

        if (isLoading) {
            return <LoadingIcon/>;
        }

        return (
            <div>
                <h2>Merchants</h2>
                {merchants.map((merchant: any) =>
                    <div key={merchant.id} className="row">
                        <div className="col-lg-10">
                            <p>{merchant.name}</p>
                        </div>
                        <div className="col-lg-2">
                            <Link to={"/edit"}>
                                <button className={"btn btn-info mr-2 btn-sm"} onClick={() => this.editMerchant(merchant.id)}>
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

export default Merchants;