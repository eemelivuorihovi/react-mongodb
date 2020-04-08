import React from "react";

export default class CreateMerchant extends React.Component<{}, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            props: props
        };
    }

    setName = (e: any) => {
        this.setState({
            name: e.target.value
        });
    };

    setDescription = (e: any) => {
        this.setState({
            description: e.target.value
        });
    };

    setPostcode = (e: any) => {
        this.setState({
            postcode: e.target.value
        });
    };

    save = (e: any) => {
        e.preventDefault();

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        };

        fetch("http://localhost:8080/api/merchant/save", options)
            .then(response => response.json())
            .then(data => this.responseHandler(data))
            .catch(error => {
                console.error(error);
            });
    };

    responseHandler = (data: any) => {
        if (data.success) {
            this.state.props.history.push("/");
        }
        else {
            throw new Error(data.message);
        }
    };

    render() {
        return (
            <form onSubmit={this.save}>
                <div className={"row form-group"}>
                    <div className={"col-sm-10"}>
                        <h2>Add Merchant</h2>
                    </div>
                    <div className={"col-sm-2"}>
                        <button className={"btn btn-success pull-right"} type={"submit"}>
                            <span>
                                Save&nbsp;
                                <i className={"fa fa-floppy-o fa-lg"}/>
                            </span>
                        </button>
                    </div>
                </div>
                <div className={"row form-group"}>
                    <div className={"col-sm-3"}>Name</div>
                    <div className={"col-sm-9"}>
                        <input id={"name"} className={"form-control"} type={"text"}
                            onChange={this.setName}/>
                    </div>
                </div>

                <div className={"row form-group"}>
                    <div className={"col-sm-3"}>
                        Description
                    </div>
                    <div className={"col-sm-9"}>
                        <input id={"description"} className={"form-control"} type={"text"}
                            onChange={this.setDescription}/>
                    </div>
                </div>

                <div className={"row form-group"}>
                    <div className={"col-sm-3"}>
                        Postcode
                    </div>
                    <div className={"col-sm-9"}>
                        <input id={"postcode"} className={"form-control"} type={"text"}
                               onChange={this.setPostcode}/>
                    </div>
                </div>
            </form>
        );
    }
}
