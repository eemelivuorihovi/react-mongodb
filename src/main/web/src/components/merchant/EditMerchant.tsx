import React from "react";
import LoadingIcon from "../layout/LoadingIcon";

export default class EditMerchant extends React.Component<{}, any> {
    constructor(props: any) {
        super(props);
        let params = props.match.params;
        this.state ={
            id: params.id,
            merchant: {},
            props: props,
            isLoading: false
        };
    }

    componentDidMount(): void {
        this.setState({
            isLoading: true
        });

        const {id} = this.state;

        fetch("http://localhost:8080/api/merchant/" + id)
            .then(response => response.json())
            .then(r => {
                let merchant = r.data;
                this.setState({
                    name: merchant.name,
                    description: merchant.description,
                    postcode: merchant.location?.postcode,
                    tags: merchant.tags,
                    isLoading: false
                });
            });
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

        let url = "http://localhost:8080/api/merchant/save";
        fetch(url, options)
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
        const  {name, postcode, description, isLoading} = this.state;

        if (isLoading) {
            return <LoadingIcon/>;
        }

        return (
            <form onSubmit={this.save}>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-sm-10">
                                <h2>{name}</h2>
                            </div>
                            <div className="col-sm-2">
                                <button className={"btn btn-success pull-right"} type={"submit"}>
                                    <span>
                                        Save&nbsp;
                                        <i className={"fa fa-floppy-o fa-lg"}/>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="panel-body">
                        <div className="form-group">
                            <input id={"name"} className={"form-control"} type={"text"}
                                   value={name}
                                   onChange={this.setName}/>
                        </div>

                        <div className="form-group">
                            <input id={"description"} className={"form-control"} type={"text"}
                                   value={description}
                                   onChange={this.setDescription}/>
                        </div>

                        <div className="form-group">
                            <input id={"postcode"} className={"form-control"} type={"text"}
                                   value={postcode}
                                   onChange={this.setPostcode}/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}