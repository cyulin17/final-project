import React from 'react';
import GoogleMapReact from 'google-map-react';
import Search from './search';
import InfoWindow from './infowindow';

function Marker() {
  return <div className="map-marker" />;
}

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapLoaded: false,
      places: [],
      markers: [],
      searchResults: [],
      center: {
        lat: 38.19773060427947,
        lng: 137.638514642288
      },
      placesService: {},
      zoom: 5
    };
    this.areaSearch = this.areaSearch.bind(this);
    this.apiLoaded = this.apiLoaded.bind(this);
    this.categorySearch = this.categorySearch.bind(this);
    this.keywordSearch = this.keywordSearch.bind(this);

  }

  apiLoaded(map, maps) {
    this.setState({
      mapsLoaded: true,
      map,
      maps,
      placesService: new maps.places.PlacesService(map)
    });
  }

  areaSearch(query) {

    const googleURL = encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.GOOGLE_TOKEN}`);

    fetch('https://lfz-cors.herokuapp.com/?url=' + googleURL, { method: 'GET' })
      .then(res => res.json())
      .then(newLocation => {
        const myLatLng = newLocation.results[0].geometry.location;
        const lat = myLatLng.lat;
        const lng = myLatLng.lng;
        this.setState({
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

  categorySearch(query) {

    const lat = this.state.center.lat;
    const lng = this.state.center.lng;
    const latlng = lat + '%2C' + lng;

    const googleURL = encodeURIComponent(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latlng}&radius=500000&type=${query}&key=${process.env.GOOGLE_TOKEN}`);

    fetch('https://lfz-cors.herokuapp.com/?url=' + googleURL, { method: 'GET' })
      .then(res => res.json())
      .then(category => {
        const myLatLng = category.results[0].geometry.location;
        const data = category.results;
        const lat = myLatLng.lat;
        const lng = myLatLng.lng;
        this.setState({
          places: data,
          center: {
            lat: lat,
            lng: lng
          },
          zoom: 12
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  keywordSearch(query) {
    const googleURL = encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.GOOGLE_TOKEN}`);

    fetch('https://lfz-cors.herokuapp.com/?url=' + googleURL, { method: 'GET' })
      .then(res => res.json())
      .then(keyword => {
        const myLatLng = keyword.results[0].geometry.location;
        const lat = myLatLng.lat;
        const lng = myLatLng.lng;
        const data = keyword.results;
        this.setState({
          places: data,
          center: {
            lat: lat,
            lng: lng
          },
          zoom: 18
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {

    const { places } = this.state;

    return (
      <div style={ { height: '100vh' }}>
        <Search onAreaSearch={this.areaSearch} onCategorySearch={this.categorySearch} onKeywordSearch={this.keywordSearch}/>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.GOOGLE_TOKEN,
            libraries: ['places']
          }}
          center={this.state.center}
          zoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this.apiLoaded(map, maps)}
          >

              {places.map(place => (
              <Marker
                  key={place.place_id}
                  lat={place.geometry.location.lat}
                  lng={place.geometry.location.lng}
                />
              ))}
          </GoogleMapReact>

        {places.map(place => (
        <InfoWindow
          info={place}
          key={place.place_id}
        />
        ))}
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
