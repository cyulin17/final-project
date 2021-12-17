import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

const render = Status => {
  return <h1>{Status}</h1>;
};

const Map = ({
  onIdle
}) => {
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
    if (map) {
      map.setOptions({ zoom: 3, center: { lat: 0, lng: 0 } });
    }
  }, [ref, map]);
  return <div ref={ref} style={{ height: '100vh' }} />;

};

// const onIdle = m => {
//   setZoom(m.getZoom());
//   setCenter(m.getCenter().toJSON());

// };

export default function MyMap() {
  return (
      <div>
      <Wrapper apiKey={process.env.GOOGLE_TOKEN} render={render}>
          <Map />
        </Wrapper>
      <div className="panel">
        <div className="panel-header">
          <div className="travel-date">12/10/2021
            <div className="arrow-container">
              <span className="previous"><i className="fas fa-caret-left left-arrow"></i></span>
              <span className="next"><i className="fas fa-caret-right right-arrow"></i></span>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}
