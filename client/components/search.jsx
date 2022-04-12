import React from 'react';

const regions = [
  { number: '01', name: 'Hokkaido' },
  { number: '02', name: 'Tohoku' },
  { number: '03', name: 'Kanto' },
  { number: '04', name: 'Aichi' },
  { number: '05', name: 'Kansai' },
  { number: '06', name: 'Chugoku' },
  { number: '07', name: 'Shikoku' },
  { number: '08', name: 'Kyushu' },
  { number: '09', name: 'Okinawa' }
];

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onFocus: false,
      setArea: '',
      setCategory: '',
      keyword: ''
    };

    this.onFocus = this.onFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onFocus() {

    this.setState({
      onFocus: true
    });
  }

  handleClick(areaName) {
    this.setState({
      setArea: areaName,
      onFocus: false
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

    const newPlace = this.state.setArea;
    this.props.onSubmit(newPlace);
    this.setState({
      setArea: ''
    });

  }

  render() {

    const areas = regions.map(area =>
      <li onClick={() => this.handleClick(area.name)} key={area.number} className="area-item">{area.name}</li>
    );
    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid justify-content-start">
          <a className="navbar-brand logo" href="#">
            GotoJapan
          </a>
          <form onSubmit={this.handleSubmit}>
          <div className="search-container">
            <div>
              <label htmlFor="area"></label>
                <input
                onFocus={this.onFocus}
                className="area"
                type="search"
                name="setArea"
                id="area"
                placeholder="Area"
                onChange={this.handleInputChange}
                value={this.state.setArea}/>
              <ul className={this.state.onFocus ? 'area-menu' : 'hidden'}>
                {areas}
              </ul>
            </div>
            <div>
              <label htmlFor="catogory"></label>
                <input
                className="catogory"
                type="search" name="setCategory"
                id="catogory" placeholder="Catogory"
                onChange={this.handleInputChange}
                value={this.state.setCategory}/>
            </div>
            <div>
              <label htmlFor="keyword"></label>
                <input
                className="keyword"
                type="search"
                name="keyword"
                id="keyword"
                placeholder="Tokyo Tower"
                onChange={this.handleInputChange}
                value={this.state.keyword}/>
                <span className="search-icon"><button><i className="fas fa-search icon-size"></i></button></span>
            </div>
        </div>
          </form>
        </div>
      </nav>
    );
  }
}
