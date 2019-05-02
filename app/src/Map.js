import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Map.css';
import actions from './actions';
import {connect} from 'react-redux';

class Map extends React.Component {
    componentDidMount() {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(this.showPosition);
        }
    }

    showPosition = (position) => {
        this.props.updateLatLng(position.coords.latitude, position.coords.longitude);
    }

    handleClick = (event) => {
        this.props.updateLatLng(event.latLng.lat(), event.latLng.lng());
    }

    render() {
        return (
            <LoadScript id="script-loader"
                googleMapsApiKey={process.env.REACT_APP_MAPSAPIKEY}>
                <GoogleMap id="map"
                    mapContainerStyle={{
                        height: "100%",
                        width: "100%"
                    }}
                    zoom={14}
                    center={{
                        lat: this.props.lat,
                        lng: this.props.lng
                    }}
                    onClick={this.handleClick}>
                    <Marker
                        onLoad={marker => {
                            console.log(`Marker Position: [${marker.position.lat()}, ${marker.position.lng()}]`);
                        }}
                        position={{
                            lat: this.props.lat,
                            lng: this.props.lng
                        }}
                    />
                </GoogleMap>
            </LoadScript>
        )
    }
}

const mapStatesToPros = states => ({
    lat: states.geoData.lat,
    lng: states.geoData.lng,
});
export default connect(mapStatesToPros, actions)(Map);
