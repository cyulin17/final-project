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
          zoom: 10
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    // const renderMarkers = (map, maps) => {
    //   const marker = new maps.Marker({
    //     position: this.state.center,
    //     map
    //   });
    //   return marker;
    // };

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

/* // Old Version
// import React from 'react';
// import { Wrapper } from '@googlemaps/react-wrapper';
// import Search from './search';

// const render = Status => {
//   return <h1>{Status}</h1>;
// };

// const Map = ({
//   onIdle
// }) => {
//   const ref = React.useRef(null);
//   const [map, setMap] = React.useState();
//   const [center] = React.useState({ lat: 36.328497997295536, lng: 139.63055490097025 });

//   React.useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}));
//     }
//     if (map) {
//       map.setOptions({ zoom: 5, center });
//     }
//   }, [ref, map]);
//   return <div ref={ref} style={{ height: '100vh' }} />;

//   // const Marker = options => {
//   //   const [marker, setMarker] = React.useState();

//   //   React.useEffect(() => {
//   //     if (map) {
//   //       setMarker(new window.google.maps.Marker());
//   //     }
//   //   });
//   // };
//   // const onIdle = m => {
//   //   setZoom(m.getZoom());
//   //   setCenter(m.getCenter().toJSON());

// };

// export default class MyMap extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       lat: '',
//       lng: ''
//     };
//     this.updateLocation = this.updateLocation.bind(this);
//   }

//   updateLocation() {
//     const googleURL = encodeURIComponent(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${this.state.setArea}&key=${process.env.GOOGLE_TOKEN}`);

//     fetch('https://lfz-cors.herokuapp.com/?url=' + googleURL, { method: 'GET' })
//       .then(res => res.json())
//       .then(newLocation => {
//         const location = newLocation.results[0].geometry.location;
//         const lat = location.lat;
//         const lng = location.lng;
//         console.log(location);
//         this.setState({ lat: lat, lng: lng });
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });
//     console.log('updateLocation method called');
//   }

//   render() {
//     console.log(this.state);
//     return (
//     <div>
//       <Wrapper apiKey={process.env.GOOGLE_TOKEN} render={render}>
//         <Search onSubmit={this.updateLocation} />
//         <Map lat={this.state.lat} lng={this.state.lng} />
//       </Wrapper>
//       <div className="panel">
//         <div className="panel-header">
//           <div className="travel-date">12/10/2021
//             <div className="arrow-container">
//               <span className="previous"><i className="fas fa-caret-left left-arrow"></i></span>
//               <span className="next"><i className="fas fa-caret-right right-arrow"></i></span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     );
//   }
// } */
//
// onGoogleApiLoaded = {({ map, maps }) => renderMarkers(map, maps)}
// handleApiLoaded(map, maps) {

//   this.setState({
//     mapsLoaded: true,
//     map,
//     maps
//   });
// }
//   places.forEach(place => {
//     places.push(new maps.Marker({
//       position: {
//         lat: place.geometry.location.lat,
//         lng: place.geometry.location.lng
//       },
//       map
//     }));
//   });
// }
