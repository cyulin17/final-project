import React from 'react';
import AppContext from '../lib/app-context';

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

    if (this.state.setArea !== '' && this.state.setCategory === '') {
      const query = this.state.setArea;
      this.props.onAreaSearch(query);
      this.setState({ setArea: '' });

    }

    if (this.state.setArea === '' && this.state.setCategory !== '') {
      const category = this.state.setCategory;
      if (category === 'Attractions') {
        const query = 'tourist_attraction';
        this.props.onCategorySearch(query);
        this.setState({ setCategory: '' });
      }

      if (category === 'Shopping') {
        const query = 'shopping_mall';
        this.props.onCategorySearch(query);
        this.setState({ setCategory: '' });
      }

      if (category === 'Restaurants') {
        const query = 'restaurant';
        this.props.onCategorySearch(query);
        this.setState({ setCategory: '' });
      }

    }

    if (this.state.keyword !== '') {
      const keyword = this.state.keyword;
      this.props.onKeywordSearch(keyword);
      this.setState({ keyword: '' });
    }

  }

  render() {
    const areas = regions.map(area =>
      <li onClick={() => this.handleClick(area.name)} key={area.number} className="area-item">{area.name}</li>
    );

    const categories = catogory.map(myCategory =>
      <li onClick={() => this.handleClick(myCategory.name)} key={myCategory.number} className="area-item">{myCategory.name}</li>
    );

    const { signOut } = this.context;
    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid justify-content-center justify-content-md-start">
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
              <label htmlFor="category"></label>
                <input
                onFocus={this.onFocus}
                className="category"
                type="search"
                name="setCategory"
                id="category"
                placeholder="Category"
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
                <span className="search-icon"><button className="search" type="submit"><i className="fas fa-search icon-size"></i></button></span>
            </div>
          </div>
          </form>
          <a onClick={signOut} className="nav-link log-out log-out-end" href="#">Log Out</a>
        </div>
      </nav>
    );
  }
}

Search.contextType = AppContext;
