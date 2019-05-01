import React from 'react';
import Header from './Header';
import Map from './Map';
import './App.css';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            lat: 1.3521,
            lng: 103.8198
        };
    }

    setPosition = (lat, lng) => {
        this.setState({lat, lng})
    }

    render() {
        return(
            <div className="App" >
                <Header lat={this.state.lat} lng={this.state.lng} setPosition={this.setPosition}></Header>
                <Map lat={this.state.lat} lng={this.state.lng} setPosition={this.setPosition}></Map>
            </div>
        );
    }
}

export default App;
