import React from 'react';

export default class InfoWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      button: false,
      schedule: [],
      addDate: '',
      addTime: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState({
      isClicked: true,
      button: true
    });
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });

  }

  handleSubmit(event) {
    event.preventDefault();

    const addInfo = [];
    const destination = this.props.result.storeName;
    const photo = this.props.result.photo;
    const tripDate = this.state.addDate;
    const tripTime = this.state.addTime;

    addInfo.push({
      tripDate,
      tripTime,
      destination,
      photo
    });

    this.setState({
      schedule: addInfo
    });

    this.props.onAddItinerary(addInfo);

  }

  render() {

    const { result } = this.props;

    return (
      <div>
        <form onSubmit={this.handleSubmit} action="">
        <div key={result.storeName} className={this.props.showInfo === false ? 'hidden' : 'infowindow'}>
            <div className='destination-name'>
              <div><h3>{result.storeName}</h3></div>
              <div onClick={this.props.handleInfowindowClosed}><i className="fas fa-times close"></i></div>
              </div>
          <div className='img-container'><img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${result.photo}&key=${process.env.GOOGLE_TOKEN}`} /></div>
            <div className='destination-hours'><i className="fas fa-clock"></i> {result.hours === true ? 'Open' : 'Closed' }</div>
          <div className='destination-weekday'>
            <ul className='hours-container'>
              <li>{result.storeHours[0]}</li>
              <li>{result.storeHours[1]}</li>
              <li>{result.storeHours[2]}</li>
              <li>{result.storeHours[3]}</li>
              <li>{result.storeHours[4]}</li>
              <li>{result.storeHours[5]}</li>
              <li>{result.storeHours[6]}</li>
            </ul>
            </div>
            <div className='destination-phone'><i className="fas fa-phone"></i> {result.phone}</div>
            <div className='destination-address'><i className="fas fa-map-marker-alt"></i> {result.address}</div>
            <div className='destination-website'><i className="fas fa-link"></i> {result.website}</div>
          <div onClick={this.handleClick} className='add'>Add to Itenerary</div>
          <div className={this.state.isClicked === true ? 'date-time' : 'hidden'}>
            <div>
                <label htmlFor="add-date"></label>
                <input type="date" name="addDate" id="addDate" value={this.state.addDate} onChange={this.handleInputChange}/>
            </div>
            <div>
                <label htmlFor="add-time"></label>
                <input type="time" name="addTime" id="addTime" value={this.state.addTime} onChange={this.handleInputChange}/>
            </div>
            <button type="submit">Add</button>
          </div>
        </div>
        </form>
      </div>
    );
  }

}
