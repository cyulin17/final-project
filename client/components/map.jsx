import React from 'react';
import GoogleMapReact from 'google-map-react';
import Search from './search';

function Marker() {
  return <div className="map-marker" />;
}

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      center: {
        lat: 38.19773060427947,
        lng: 137.638514642288
      },
      zoom: 5
    };
    this.updateLocation = this.updateLocation.bind(this);
  }

  updateLocation(newPlace) {
    const googleURL = encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${newPlace}&key=${process.env.GOOGLE_TOKEN}`);

    fetch('https://lfz-cors.herokuapp.com/?url=' + googleURL, { method: 'GET' })
      .then(res => res.json())
      .then(newLocation => {
        const myLatLng = newLocation.results[0].geometry.location;
        const data = newLocation.results[0];
        const lat = myLatLng.lat;
        const lng = myLatLng.lng;
        this.setState({
          places: data,
          center: {
            lat: lat,
            lng: lng
          },
          zoom: 9
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {

    return (
      <div style={ { height: '100vh' }}>
        <Search onSubmit={this.updateLocation}/>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_TOKEN }}
          center={this.state.center}
          zoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          >

              <Marker
                lat={this.state.center.lat}
                lng={this.state.center.lng}
                />
          </GoogleMapReact>

        <div className="panel">
          <div className="panel-header">
            <div className="travel-date">12/10/2021
              <div className="arrow-container">
                <span className="previous"><i className="fas fa-caret-left left-arrow"></i></span>
                  <span className="next"><i className="fas fa-caret-right right-arrow"></i></span>
            </div>
          </div>
        </div>
    </div>
      </div>
    );
  }
}
