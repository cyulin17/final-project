import React from 'react';
// import InfoWindow from './infowindow';

export default class Marker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
  }

  render() {
    return (
      <div>
      <div className="map-marker"></div>
        </div>
    );
  }
}
