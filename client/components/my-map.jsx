import React from 'react';
import GoogleMapReact from 'google-map-react';
import Search from './search-bar';
import InfoWindow from './infowindow';
import PlanPanel from './plan-panel';
import AppContext from '../lib/app-context';

function Marker() {
  return <div className="map-marker" />;
}

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      info: [],
      showInfo: false,
      isClosed: false,
      startDate: null,
      endDate: null,
      itinerary: [],
      center: {
        lat: 38.19773060427947,
        lng: 137.638514642288
      },
      zoom: 5
    };
    this.areaSearch = this.areaSearch.bind(this);
    this.apiLoaded = this.apiLoaded.bind(this);
    this.categorySearch = this.categorySearch.bind(this);
    this.keywordSearch = this.keywordSearch.bind(this);
    this.handleInfowindow = this.handleInfowindow.bind(this);
    this.handleInfowindowClosed = this.handleInfowindowClosed.bind(this);
    this.getUserItinerary = this.getUserItinerary.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.addItinerary = this.addItinerary.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.setDate = this.setDate.bind(this);

  }

  apiLoaded(map, maps) {
    this.setState({
      map,
      maps
    });
  }

  // componentDidMount() {
  //   this.getUserItinerary();
  // }

  componentDidMount() {
    const userToken = window.localStorage.getItem('token');

    fetch('/api/places',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': userToken
        }
      })
      .then(res => res.json())
      .then(result => {
        if (result.length !== 0) {
          result.sort((a, b) => {
            if (a.tripDate < b.tripDate) {
              return -1;
            }
            if (a.tripDate > b.tripDate) {
              return 1;
            }
            return 0;
          }
          );
          this.setState({
            // date: {
            //   startDate: result[0].tripDate,
            //   nextDate: result[result.length - 1].tripDate
            // },
            startDate: result[0].tripDate,
            endDate: result[result.length - 1].tripDate
          });
        } else {
          this.setState({
            // date: {
            //   startDate: this.state.date.startDate,
            //   nextDate: this.state.date.nextDate
            // },
            startDate: this.context.date.startDate,
            endDate: this.context.date.nextDate
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
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

  handleInfowindow(key) {
    if (key) {
      const results = [];

      const info = encodeURIComponent(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${key}&key=${process.env.GOOGLE_TOKEN}`);

      fetch('https://lfz-cors.herokuapp.com/?url=' + info, { method: 'GET' })
        .then(res => res.json())
        .then(info => {
          const storeInfo = info.result;
          const storeId = storeInfo.place_id;
          const storeName = storeInfo.name;
          const address = storeInfo.formatted_address;
          const phone = storeInfo.formatted_phone_number;
          let hours = '';
          let storeHours = '';
          let photo = '';
          let website = '';
          if (storeInfo.opening_hours) {
            hours = storeInfo.opening_hours.open_now;
            storeHours = storeInfo.opening_hours.weekday_text;
          }
          if (storeInfo.website) {
            website = storeInfo.website;
          }
          if (storeInfo.photos && storeInfo.photos.length > 0) {
            photo = storeInfo.photos[0].photo_reference;
          }
          results.push({
            storeId,
            storeName,
            address,
            hours,
            storeHours,
            phone,
            website,
            photo
          });
          this.setState({
            showInfo: true,
            info: results
          });
        });
    }

  }

  handleInfowindowClosed() {
    this.setState({ showInfo: false });
  }

  getUserItinerary() {
    const userToken = window.localStorage.getItem('token');
    const dateFilteredResult = [];

    fetch('/api/places',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': userToken
        }
      })
      .then(res => res.json())
      .then(result => {

        result.forEach(itinerary => {
          if (itinerary.tripDate === this.state.startDate) {
            dateFilteredResult.push(itinerary);
          }
          this.setState({
            itinerary: dateFilteredResult
          });

        });

      }
      )
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleNext() {

    const firstDay = new Date(this.state.startDate);
    if (this.state.startDate !== this.state.endDate) {
      this.setState({
        startDate: new Date(firstDay.setDate(firstDay.getDate() + 1)).toISOString().slice(0, 10)
      });
    }
    this.getUserItinerary();
  }

  handlePrev() {
    const currentDay = new Date(this.state.startDate);
    if (this.state.startDate !== this.context.date.startDate) {
      this.setState({
        startDate: new Date(currentDay.setDate(currentDay.getDate() - 1)).toISOString().slice(0, 10)
      });
    }
    this.getUserItinerary();
  }

  addItinerary(addInfo) {

    this.setState({
      itinerary: this.state.itinerary.concat(addInfo).sort((a, b) => {
        if (a.tripStartTime < b.tripStartTime) {
          return -1;
        }
        if (a.tripStartTime > b.tripStartTime) {
          return 1;
        }
        return 0;
      }
      )
    });
  }

  handleDelete(placeId) {

    const userToken = window.localStorage.getItem('token');

    const newItineraryArray = [...this.state.itinerary];
    const deleteItemIndex = newItineraryArray.findIndex(scheduleObject => scheduleObject.placeId === placeId);
    newItineraryArray.splice(deleteItemIndex, 1);

    fetch(`/api/places/${placeId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': userToken
        }
      })
      .then(res => {
        if (res.length !== 0) {
          this.setState({
            itinerary: newItineraryArray
          });
        } else {
          this.setState({
            startDate: res[0].tripDate
          });
        }

      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  render() {

    const { places, info, startDate } = this.state;
    // const { startDate } = this.context;
    return (
      <div>
        <Search onAreaSearch={this.areaSearch} onCategorySearch={this.categorySearch} onKeywordSearch={this.keywordSearch}/>
        <div style={ { height: '100vh' }}>
          {info.map(result => (
            <InfoWindow
              showInfo={this.state.showInfo}
              key={result.storeId}
              result={result}
              handleInfowindowClosed={this.handleInfowindowClosed}
              onAddItinerary={this.addItinerary}
              tripDate={startDate}
            />
          ))}
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
                  key={place.place_id}
                  lat={place.geometry.location.lat}
                  lng={place.geometry.location.lng}
                />
              ))}

          </GoogleMapReact>
         </div>
        <PlanPanel
        onHandleNext={this.handleNext}
        onHandlePrev={this.handlePrev}
        onHandleDelete={this.handleDelete}
        itinerary={this.state.itinerary}
        startDate={startDate}/>
      </div>

    );
  }
}

MyMap.contextType = AppContext;
