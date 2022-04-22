import React from 'react';

export default class infoWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false
    };
  }

  render() {
    return (
      <div>
        <div className="infowindow">infowindow</div>
      </div>
    );
  }
}
