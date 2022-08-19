import React from 'react';
import currentDate from '../lib/get-currentdate';
import nextDate from '../lib/get-nexday';
import AppContext from '../lib/app-context';

export default class Plan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tripStartDate: currentDate(),
      tripEndDate: nextDate()

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const startDate = this.state.tripStartDate;
    const EndDate = this.state.tripEndDate;
    const tripStartDate = new Date(startDate).getTime();
    const tripEndDate = new Date(EndDate).getTime();

    if (tripStartDate > tripEndDate) {
      alert('Trip Dates are not valid.');
    } else {

      if (!this.context.user) {
        window.location.hash = '#login';
      } else if (this.context.user) {
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
            if (date.length === 0) {
              const userToken = window.localStorage.getItem('token');
              fetch('/api/dates',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Access-Token': userToken
                  },
                  body: JSON.stringify(this.state)
                })
                .then(res => res.json())
                .then(date => {
                  this.context.getDate(date);
                  window.location.hash = '#map';
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            } else {
              alert('You have an existing travel plan, please go to My Trips.');

            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }

    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="plan-container">
        <div className="calendar-container">
            <label htmlFor="tripStartDate">Travel Date From</label>
            <input type="date" name="tripStartDate" id="tripStartDate" value={this.state.tripStartDate} onChange={this.handleChange}/>
        </div>
        <div>
            <label htmlFor="tripEndDate">To</label>
            <input type="date" name="tripEndDate" id="tripEndDate" value={this.state.tripEndDate} onChange={this.handleChange} />
        </div>
        <div>
            <button className="plan-button" type="submit">PLAN</button>
          </div>
        </div>
      </form>
    );
  }
}
Plan.contextType = AppContext;
