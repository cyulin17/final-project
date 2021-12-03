import React from 'react';

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
    this.setState({
      startDate: event.target.startDate,
      nextDate: event.target.nextDate
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="plan-container">
        <div className="calendar-container">
            <label htmlFor="from">Travel Date From</label>
            <input className="calender" type="date" name="from" id="from" value={this.state.startDate} onChange={this.handleChange}/>
        </div>
        <div>
            <label htmlFor="to">To</label>
            <input className="calender" type="date" name="to" id="to" value={this.state.nextDate} onChange={this.handleChange} />
        </div>
        <div>
          <button className="plan-button"><a href='#plan'>PLAN</a></button>
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
