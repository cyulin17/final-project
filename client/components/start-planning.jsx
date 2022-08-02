import React from 'react';
import AppContext from '../lib/app-context';

export default class Plan extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: currentDate(),
      nextDate: nextDate()

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

    this.context.getDate(this.state);

    // const searchParams = new URLSearchParams({ startDate, nextDate });

    if (!this.context.user) {
      window.location.hash = '#login';
    // const newHash = `#login?${searchParams}`;
    // window.location.hash = '#login';
    } else {
      window.location.hash = '#map';
    }
    // } else {
    //   const newHash = `#map?${searchParams}`;
    //   window.location.hash = newHash;
    // }

  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="plan-container">
        <div className="calendar-container">
            <label htmlFor="startDate">Travel Date From</label>
            <input type="date" name="startDate" id="startDate" value={this.state.startDate} onChange={this.handleChange}/>
        </div>
        <div>
            <label htmlFor="nextDate">To</label>
            <input type="date" name="nextDate" id="nextDate" value={this.state.nextDate} onChange={this.handleChange} />
        </div>
        <div>
            <button className="plan-button" type="submit">PLAN</button>
          </div>
        </div>
      </form>
    );
  }
}

function currentDate() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
}

function nextDate() {

  const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const year = nextDay.getFullYear();
  let month = nextDay.getMonth() + 1;
  let day = nextDay.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }
  return `${year}-${month}-${day}`;
}

Plan.contextType = AppContext;
