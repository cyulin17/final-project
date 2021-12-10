import React from 'react';

export default class Map extends React.Component {

  render() {
    return (
      <div className="map-container">
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
        <div id="map">Map</div>
      </div>
    );
  }
}
