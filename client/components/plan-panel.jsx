import React from 'react';
import AppContext from '../lib/app-context';

export default class PlanPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);

  }

  componentDidMount() {
    this.setState({
      startDate: this.context.date.startDate,
      endDate: this.context.date.nextDate
    });
  }

  handleNext() {

    const firstDay = new Date(this.state.startDate);
    if (this.state.startDate !== this.state.endDate) {
      this.setState({
        startDate: new Date(firstDay.setDate(firstDay.getDate() + 1)).toISOString().slice(0, 10)
      });
    }

  }

  handlePrev() {
    const currentDay = new Date(this.state.startDate);
    if (this.state.startDate !== this.context.date.startDate) {
      this.setState({
        startDate: new Date(currentDay.setDate(currentDay.getDate() - 1)).toISOString().slice(0, 10)
      });
    }
  }

  render() {

    const { itinerary } = this.props;
    // let tripDate = '';
    // if (itinerary.length !== 0) {
    //   tripDate = itinerary[0].tripDate;
    // }

    let prevButton = '';
    let nextButton = '';
    if (this.state.startDate === this.context.date.startDate) {
      prevButton = 'fas fa-caret-left left-arrow hidden';
      nextButton = 'fas fa-caret-right right-arrow';
    } else if (this.state.startDate === this.context.date.nextDate) {
      prevButton = 'fas fa-caret-left left-arrow';
      nextButton = 'fas fa-caret-right right-arrow hidden';
    } else {
      prevButton = 'fas fa-caret-left left-arrow';
      nextButton = 'fas fa-caret-right right-arrow';
    }

    const schedules = itinerary.map(schedule =>
      <li key={schedule.destination} className="schedule-box">
        <div className="schedule-container">
          <div className="time-container">
            {schedule.tripStartTime}
            <div className="duration"></div>
            {schedule.tripEndTime}
          </div>
          <div className="photo-container">
            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${schedule.photo}&key=${process.env.GOOGLE_TOKEN}`} />
          </div>
          <div className="place-container">
            {schedule.destination}
          </div>
          <div className="trash-container">
            <i onClick={() => this.props.onHandleDelete(schedule.placeId)} className="fas fa-trash-alt"></i>
          </div>
        </div>
      </li>

    );

    return (
    <div className="panel">
      <div className="panel-header">
        {/* { startDate !== undefined && */}
        <div className="travel-date">
          <div>
          {this.state.startDate}
          </div>
          <div className="arrow-container">
              <span className="previous"><i onClick={this.handlePrev} className={prevButton}></i></span>
              <span className="next"><i onClick={this.handleNext} className={nextButton}></i></span>
          </div>
        </div>
          {/* { startDate === undefined &&
            <div className="travel-date">
              <div>
              {this.state.startDate}
              </div>
              <div className="arrow-container">
                <span className="previous"><i onClick={this.handlePrev} className="fas fa-caret-left left-arrow"></i></span>
                <span className="next"><i onClick={this.handleNext} className="fas fa-caret-right right-arrow"></i></span>
              </div>
            </div>
          } */}
        </div>
        <ul className="ul-padding">
          {schedules}
        </ul>
    </div>
    );
  }
}
PlanPanel.contextType = AppContext;
