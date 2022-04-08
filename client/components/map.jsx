import React from 'react';
import GoogleMapReact from 'google-map-react';
import Search from './search';

export default class MyMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 36.32,
        lng: 139.63
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
        const location = newLocation.results[0].geometry.location;
        const lat = location.lat;
        const lng = location.lng;
        this.setState({
          center: {
            lat: lat,
            lng: lng
          },
          zoom: 8
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
        />
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
// Old Version
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
// }
