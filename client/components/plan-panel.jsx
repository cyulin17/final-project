import React from 'react';

export default class PlanPanel extends React.Component {

  render() {
    const { schedule, startDate } = this.props;

    const schedules = schedule.map(schedule =>
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
            <i onClick={() => this.props.onHandleDelete(schedule)} className="fas fa-trash-alt"></i>
          </div>
        </div>
      </li>
    );

    return (
    <div className="panel">
      <div className="panel-header">
        <div className="travel-date">{startDate}
          <div className="arrow-container">
            <span className="previous"><i className="fas fa-caret-left left-arrow"></i></span>
            <span className="next"><i className="fas fa-caret-right right-arrow"></i></span>
          </div>
        </div>
        </div>
        <ul className="ul-padding">
          {schedules}
        </ul>
    </div>
    );
  }
}
