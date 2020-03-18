import React from "react";

export default class CreateMerchant extends React.Component<{}, any> {

    constructor(props: any) {
        super(props);
        this.state = {}
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

    save = (e: any) => {
        e.preventDefault();
        console.log(this.state);
    };

    render() {
        return (
            <form onSubmit={this.save}>
                <div className={"row form-group"}>
                    <div className={"col-sm-11"}>
                        <h2>Add Merchant</h2>
                    </div>
                    <div className={"col-sm-1"}>
                        <button className={"btn btn-success pull-right"} type={"submit"}>
                            <i className={"fa fa-floppy-o fa-lg"}/>
                        </button>
                    </div>
                </div>
                <div className={"row form-group"}>
                    <div className={"col-sm-4"}>Name</div>
                    <div className={"col-sm-8"}>
                        <input id={"name"} className={"form-control"} type={"text"}
                            onChange={this.setName}/>
                    </div>
                </div>

                <div className={"row form-group"}>
                    <div className={"col-sm-4"}>
                        Desciption
                    </div>
                    <div className={"col-sm-8"}>
                        <input id={"desciption"} className={"form-control"} type={"text"}
                            onChange={this.setDescription}/>
                    </div>
                </div>
            </form>
        );
    }
}