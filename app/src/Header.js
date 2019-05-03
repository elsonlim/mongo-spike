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
            showMarkers: this.props.showMarkers,
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

    toggleMarkers = () => {
        const showMarkers = !this.state.showMarkers;
        this.setState({ showMarkers });
        this.props.toggleMarkers(showMarkers);
    }

    render() {
        return (
            <div className="Header">
                <div className="Title">Simple Markers</div>
                <div className="Control">
                    <div className="Control-item">
                        <label htmlFor="address" className="Label">Address</label>
                        <input id="address" type="text" value={this.state.address} placeholder="Type in an address"
                            onChange={(event) => this.setState({address: event.target.value})} />
                        <button onClick={this.handleAddressClick}>Search by Address!</button>
                    </div>
                    <div className="Control-item">
                        <label htmlFor="lat" className="Label">Latitude</label>
                        <input id="lat" type="text" value={this.state.inputLat}
                            onChange={(event) => this.setState({inputLat: Number.parseFloat(event.target.value)})} />
                        <label htmlFor="lng" className="Label">Longitude</label>
                        <input id="lng" type="text" value={this.state.inputLng}
                            onChange={(event) => this.setState({inputLng: Number.parseFloat(event.target.value)})} />
                        <button onClick={this.handlePositionClick}>Search by Position!</button>
                    </div>
                </div>
                <div className="Control-markers">
                    <div className="Control-item">
                        <label htmlFor="lat" className="Label">New Marker</label>
                        <input id="markerTitle" type="text" value={this.state.markerTitle} placeholder="Give your marker a name!"
                            onChange={(event) => this.setState({markerTitle: event.target.value})} />
                        <label htmlFor="lng" className="Label">Description</label>
                        <input id="lng" type="text" value={this.state.markerDescription} placeholder="Describe your new marker"
                            onChange={(event) => this.setState({markerDescription: event.target.value})} />
                        <button onClick={this.saveMarker}>Save Marker</button>
                    </div>
                    <div>
                        <button className="Toggle" onClick={this.toggleMarkers}>Toggle Markers</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatesToProps = states => ({
    lat: states.geoData.lat,
    lng: states.geoData.lng,
    showMarkers: states.geoData.showMarkers,
});
export default connect(mapStatesToProps, Actions)(Header);
