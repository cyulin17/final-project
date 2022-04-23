import React from 'react';

export default class InfoWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  render() {

    return (
      <div>
        <div className="infowindow">infowindow
          <h3>Tokyo Sky tree</h3>
          <div className='image_container'>images</div>
          <div>Hours</div>
          <div>Address</div>
          <div>Website</div>
        </div>
      </div>
    );
  }
}
