import React from 'react';
import './Header.css';
import {connect} from 'react-redux';
import Actions from './actions';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputLat: this.props.lat,
            inputLng: this.props.lng,
            address: '',
            markerTitle: '',
            markerDescription: '',
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
                this.props.updateLatLng(
                    results[0].geometry.location.lat(),
                    results[0].geometry.location.lng()
                );
            }
        });
    }

    handlePositionClick = () => {
        this.props.updateLatLng(this.state.inputLat, this.state.inputLng);
    }

    saveMarker = () => {
        this.props.savePlace(this.state.markerTitle, this.state.markerDescription, this.state.inputLat, this.state.inputLng);
    }

    render() {
        return (
            <div className="Header">
                <div className="Title">Simple Markers</div>
                <div className="Control">
                    <div className="Control-item">
                        <label htmlFor="address" className="Label">Address</label>
                        <label htmlFor="lat" className="Label">Latitude</label>
                        <label htmlFor="lat" className="Label">New Title</label>
                    </div>
                    <div className="Control-item">
                        <input id="address" type="text" value={this.state.address} placeholder="Type in an address"
                            onChange={(event) => this.setState({address: event.target.value})} />
                        <div className="Control">
                            <input id="lat" type="text" value={this.props.lat}
                                onChange={(event) => this.setState({inputLat: Number.parseFloat(event.target.value)})} />
                            <label htmlFor="lng" className="Label">Longitude</label>
                            <input id="lng" type="text" value={this.props.lng}
                                onChange={(event) => this.setState({inputLng: Number.parseFloat(event.target.value)})} />
                        </div>
                        <div className="Control">
                            <input id="markerTitle" type="text" value={this.state.markerTitle}
                                onChange={(event) => this.setState({markerTitle: event.target.value})} />
                            <label htmlFor="lng" className="Label">Description</label>
                            <input id="lng" type="text" value={this.state.markerDescription}
                                onChange={(event) => this.setState({markerDescription: event.target.value})} />
                        </div>
                    </div>
                    <div className="Control-item">
                        <button onClick={this.handleAddressClick}>Search by Address!</button>
                        <button onClick={this.handlePositionClick}>Search by Position!</button>
                        <button onClick={this.saveMarker}>Save Marker</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatesToProps = states => ({
    lat: states.geoData.lat,
    lng: states.geoData.lng,
});
export default connect(mapStatesToProps, Actions)(Header);
