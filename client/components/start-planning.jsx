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
    if (!this.context.user) {
      window.location.hash = '#login';
      this.context.getDate(this.state);
    } else {
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
