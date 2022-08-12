import React from 'react';
import currentDate from '../lib/get-currentdate';
import nextDate from '../lib/get-nexday';
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
    this.handleDate = this.handleDate.bind(this);
  }

  // componentDidMount() {
  //   this.handleDate();
  // }

  handleChange(event) {

    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleDate() {
    this.context.getDate(this.state);
    // this.context.saveTripDate(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();

    // if (!this.context.user) {
    //   window.location.hash = '#login';
    // } else {
    //   const { startDate, nextDate } = this.state;
    //   const searchParams = new URLSearchParams({ startDate, nextDate });
    //   const newHash = `#map?${searchParams}`;
    //   window.location.hash = newHash;
    // }
    // const { startDate, nextDate } = this.state;
    // const searchParams = new URLSearchParams({ startDate, nextDate });
    // const newHash = `#map?${searchParams}`;
    // const

    // this.handleDate();
    if (!this.context.user) {
      window.location.hash = '#login';
    } else {
      this.handleDate();
      window.location.hash = '#map';
    }

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

Plan.contextType = AppContext;
