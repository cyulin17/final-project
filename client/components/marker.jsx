import React from 'react';
// import InfoWindow from './infowindow';

export default class Marker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  render() {

    // let infowindowStatus = '';
    // let background = '';
    // if (this.state.isClosed) {
    //   infowindowStatus = 'infowindow closed';
    // } else {
    //   infowindowStatus = 'infowindow opened';
    //   background = 'shadow';
    // }
    return (
      <div>
      <div className="map-marker"></div>
        </div>
    );
  }
}
