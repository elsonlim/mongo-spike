import React from 'react';
import './Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputLat: this.props.lat,
            inputLng: this.props.lng,
            address: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lat !== this.state.inputLat || nextProps.lng !== this.state.inputLng) {
            this.setState({
                inputLat: nextProps.lat,
                inputLng: nextProps.lng
            });
            // this.getAddress();
        }
    }

    handleAddressClick = () => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({"address": this.state.address}, (results, status) => {
            if (status === "OK") {
                this.props.setPosition(
                    results[0].geometry.location.lat(),
                    results[0].geometry.location.lng()
                );
            }
        });
    }

    handlePositionClick = () => {
        this.props.setPosition(this.state.inputLat, this.state.inputLng);
    }

    render() {
        return (
            <div className="Header">
                <div className="Title">Simple Markers</div>
                <div className="Control">
                    <div className="Control-item">
                        <label htmlFor="address" className="Label">Address</label>
                        <label htmlFor="lat" className="Label">Latitude</label>
                    </div>
                    <div className="Control-item">
                        <input id="address" type="text" value={this.state.address} placeholder="Type in an address"
                            onChange={(event) => this.setState({address: event.target.value})} />
                        <div className="Control">
                            <input id="lat" type="text" value={this.state.inputLat}
                                onChange={(event) => this.setState({inputLat: Number.parseFloat(event.target.value)})} />
                            <label htmlFor="lng" className="Label">Longitude</label>
                            <input id="lng" type="text" value={this.state.inputLng}
                                onChange={(event) => this.setState({inputLng: Number.parseFloat(event.target.value)})} />
                        </div>
                    </div>
                    <div className="Control-item">
                        <button onClick={this.handleAddressClick}>Search by Address!</button>
                        <button onClick={this.handlePositionClick}>Search by Position!</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
