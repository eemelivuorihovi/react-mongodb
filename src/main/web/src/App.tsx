import React from 'react';
import './App.css';
import Merchants from "./Merchants";

class App extends React.Component<{}, any> {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>Merchants</h2>
                    <Merchants/>
                </div>
            </div>
        );
    }
}

export default App;
