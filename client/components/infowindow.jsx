import React from 'react';

export default class InfoWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  render() {

    const { place } = this.props;

    return (
      <div>
        <div className="infowindow">infowindow
          <h3>{place.name}</h3>
          <div className='image_container'>images</div>
          <div>Hours</div>
          <div>Address</div>
        </div>
      </div>
    );
  }
}
