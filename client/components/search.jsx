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

const catogory = [
  { number: '01', name: 'Attractions' },
  { number: '02', name: 'Shopping' },
  { number: '03', name: 'Restaurants' }
];

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      onFocus: null,
      setArea: '',
      setCategory: '',
      keyword: ''
    };

    this.onFocus = this.onFocus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  onFocus(event) {
    const target = event.target;
    const value = target.id;

    if (this.state.onFocus === value) {
      this.setState({
        onFocus: null
      });
    } else {
      this.setState({
        onFocus: value
      });
    }

  }

  handleClick(selected) {

    if (this.state.onFocus === 'area') {
      this.setState({
        setArea: selected,
        onFocus: null
      });
    }

    if (this.state.onFocus === 'category') {
      this.setState({
        setCategory: selected,
        onFocus: null
      });
    }

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

    const newArea = this.state.setArea;
    // const newCategory = this.state.setCategory;

    if (this.state.setArea !== '') {
      const query = newArea;
      // console.log(query);
      this.props.onSubmit(query);
    } else {
      alert('Please select an area.');
      // const query = this.state.setCategory + 'in' + this.state.lat + '&' + 'radius=100000';
      // this.props.onSubmit(query);
      // console.log(query);
    }

    this.setState({
      setArea: ''
    });
  }

  render() {

    const areas = regions.map(area =>
      <li onClick={() => this.handleClick(area.name)} key={area.number} className="area-item">{area.name}</li>
    );

    const categories = catogory.map(myCategory =>
      <li onClick={() => this.handleClick(myCategory.name)} key={myCategory.number} className="area-item">{myCategory.name}</li>
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
              <ul className={this.state.onFocus === 'area' ? 'area-menu' : 'hidden'}>
                {areas}
              </ul>
            </div>
            <div>
              <label htmlFor="catogory"></label>
                <input
                onFocus={this.onFocus}
                className="catogory"
                type="search"
                name="setCategory"
                id="category"
                placeholder="Catogory"
                onChange={this.handleInputChange}
                value={this.state.setCategory}/>
                <ul className={this.state.onFocus === 'category' ? 'category-menu' : 'hidden'}>
                  {categories}
                </ul>
            </div>
            <div>
              <label htmlFor="keyword"></label>
                <input
                onFocus={this.onFocus}
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
