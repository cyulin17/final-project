import React from 'react';

export default class InfoWindow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      button: false,
      date: ''
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
  }

  render() {

    const { result } = this.props;

    return (
      <div>
        <div key={result.storeName} className={this.props.showInfo === false ? '' : 'infowindow'}>
          <div className='destination-name'><h3>{result.storeName}</h3></div>
          <div className='img-container'><img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${result.photo}=&key=${process.env.GOOGLE_TOKEN}`} /></div>
          <div className='destination-hours'>{result.hours === true ? 'Open' : 'Closed' }</div>
          <div className='destination-address'>Address: {result.address}</div>

          <form onSubmit={this.handleSubmit}action="">
          <div onClick={this.handleClick} className='add'>Add to Itenerary</div>
          <div className={this.state.isClicked === true ? 'date-time' : 'hidden'}>
            <div>
                <label htmlFor="add-date"></label>
                <input type="date" name="add-date" id="add-date" value={this.state.addDate} onChange={this.handleInputChange}/>
            </div>
            <div>
                <label htmlFor="add-time"></label>
                <input type="time" name="add-time" id="add-time" value={this.state.addTime} onChange={this.handleInputChange}/>
            </div>
            <button>Add</button>
          </div>
          </form>
        </div>
      </div>
    );
  }

}
