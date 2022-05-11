import React from 'react';

export default class PlanPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    // const { schedule } = this.props;

    return (
    <div className="panel">
      <div className="panel-header">
        <div className="travel-date">12/10/2021
          <div className="arrow-container">
            <span className="previous"><i className="fas fa-caret-left left-arrow"></i></span>
            <span className="next"><i className="fas fa-caret-right right-arrow"></i></span>
          </div>
        </div>
        <ul className="ul-padding">
          <li className="schedule-box">
            <div className="schedule-container">
              <div className="time-container">
                <div>9:00</div>
                <div className="duration"></div>
                <div>10:00</div>
              </div>
              <div className="photo-container">
                {/* <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photo_reference=${schedule.photo}&key=${process.env.GOOGLE_TOKEN}`} /> */}
              </div>
              <div className="place-container">
                Tokyo SkyTree
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    );

  }
}
