import React from 'react';
import GoogleMapReact from 'google-map-react';
import Search from './search';
// import Marker from './marker';
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
      id: null,
      showInfo: false,
      isClosed: false,
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
    this.handleInfowindow = this.handleInfowindow.bind(this);
    this.handleInfowindowClosed = this.handleInfowindowClosed.bind(this);
    // this.handleClick = this.handleClick.bind(this);

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

        const results = [];
        const myLatLng = keyword.results[0].geometry.location;
        const lat = myLatLng.lat;
        const lng = myLatLng.lng;
        const data = keyword.results;
        const info = keyword.results[0];

        const storeId = info.place_id;
        const storeName = info.name;
        const address = info.formatted_address;
        const hours = info.opening_hours.open_now;
        let photo = '';
        // let hours = false;
        // if (info.opening_hours.open_now) {
        //   hours = true;
        // }
        if (info.photos && info.photos.length > 0) {
          photo = info.photos[0].photo_reference;
        }

        results.push({
          storeId, storeName, address, hours, photo
        });
        this.setState({
          searchResults: results,
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

  handleInfowindow(key) {
    this.setState({
      showInfo: true
    });
  }

  handleInfowindowClosed() {
    this.setState({ showInfo: false });
  }

  render() {

    const { places, searchResults } = this.state;

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
          onChildClick={this.handleInfowindow}
         >

              {places.map(place => (
              <Marker
                  onClick={this.handleInfowindow}
                  key={place.place_id}
                  lat={place.geometry.location.lat}
                  lng={place.geometry.location.lng}
                />
              ))}

          </GoogleMapReact>

        {searchResults.map(result => (
          <InfoWindow
            showInfo={this.state.showInfo}
            key={result.storeId}
            result={result}
            handleInfowindowClosed={this.handleInfowindowClosed}
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
