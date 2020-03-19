import React from "react";
import LoadingIcon from "../layout/LoadingIcon";
import MerchantList from "./MerchantList";

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
                <div>
                    <MerchantList merchants={merchants}/>
                </div>
            </div>
        );
    }
}

export default Merchants;