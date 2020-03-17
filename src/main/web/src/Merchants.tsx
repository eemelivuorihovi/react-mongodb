import React from "react";

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
            return <p>Loading...</p>
        }

        return (
            <div>
                {merchants.map((merchant: any) =>
                    <div key={merchant.id}>
                        {merchant.name}
                    </div>
                )}
            </div>
        )
    }
}

export default Merchants;