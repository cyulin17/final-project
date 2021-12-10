import React from 'react';

const regions = [
  { number: '01', name: 'Hokkaido' },
  { number: '02', name: 'Tohoku' },
  { number: '03', name: 'Kanto' },
  { number: '04', name: 'Chubu' },
  { number: '05', name: 'Kansai' },
  { number: '06', name: 'Chugoku' },
  { number: '07', name: 'Shikoku' },
  { number: '08', name: 'Kyushu/Okinawa' }
];

export default class Search extends React.Component {

  render() {

    const areas = regions.map(area =>
      <li key={area.number}>{area.name}</li>
    );
    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid justify-content-start">
          <a className="navbar-brand logo" href="#">
            GotoJapan
          </a>
          <div className="search-container">
            <div>
              <label htmlFor="area"></label>
              <input className="area" type="search" name="area" id="area" placeholder="Area" />
              <ul className='area-menu'>
                <li>{areas}</li>
              </ul>
            </div>
            <div>
              <label htmlFor="catogory"></label>
              <input className="catogory" type="search" name="catogory" id="catogory" placeholder="Catogory" />
            </div>
            <div>
              <label htmlFor="keyword"></label>
              <input className="keyword" type="search" name="keyword" id="keyword" placeholder="Tokyo Tower" />
              <span className="search-icon"><i className="fas fa-search icon-size"></i></span>
            </div>
        </div>
        </div>
      </nav>
    );
  }
}
