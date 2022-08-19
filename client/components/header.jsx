import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.checkDate = this.checkDate.bind(this);
  }

  checkDate() {

    const userToken = window.localStorage.getItem('token');
    const userId = this.context.user.userId;

    fetch(`/api/dates/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': userToken
        }
      })
      .then(res => res.json())
      .then(date => {
        if (date.length !== 0) {
          const tripStartDate = date[0].tripStartDate;
          const tripEndDate = date[0].tripEndDate;
          this.context.getDate({ tripStartDate, tripEndDate });
          window.location.hash = '#map';
        } else {
          alert('Please select a start date and end date.');
        }

      });

  }

  render() {
    const { user, signOut } = this.context;
    return (
      <header>
        <nav className="navbar navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand logo" href="#">
              GotoJapan
            </a>
            { user === null &&
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <a className="nav-link sign-up" href="#signup">Sign Up</a>
              </li>
              <li className="nav-item">
                <a className="nav-link log-in" href="#login">Log In</a>
              </li>
              </ul>
              }
              { user !== null &&
              <ul className="nav justify-content-end">
              <li className="nav-item">
                <a onClick={this.checkDate} className="nav-link my-trips">My Trips</a>
              </li>
              <li className="nav-item">
                  <a onClick={signOut} className="nav-link log-out" href="#">Log Out</a>
              </li>
            </ul>
              }
          </div>
        </nav>
      </header>
    );
  }
}

Header.contextType = AppContext;
