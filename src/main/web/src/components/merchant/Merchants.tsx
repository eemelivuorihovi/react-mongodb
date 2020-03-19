import React from "react";
import LoadingIcon from "../layout/LoadingIcon";
import MerchantList from "./MerchantList";
import Map from "./Map";

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

    render() {
        const {merchants, isLoading} = this.state;

        if (isLoading) {
            return <LoadingIcon/>;
        }

        return (
            <div>
                <h2>Merchants</h2>
                <div className={"panel panel-default"}>
                    <MerchantList merchants={merchants}/>
                </div>
                <div className={"panel panel-default"}>
                    <Map merchants={merchants}/>
                </div>
            </div>
        );
    }
}

export default Merchants;