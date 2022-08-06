import React from 'react';
import Home from './pages/home';
import Login from './pages/login';
import MyMap from '../client/components/my-map';
import parseRoute from './lib/parse.route';
import jwtDecode from 'jwt-decode';
import AppContext from './lib/app-context';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: null,
      isAuthorizing: true,
      date: {},
      startDate: null,
      endDate: null,
      itinerary: []
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getUserItinerary = this.getUserItinerary.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.addItinerary = this.addItinerary.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });

    const token = window.localStorage.getItem('token');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user, isAuthorizing: false });

  }

  signIn(info) {
    const { user, token } = info;
    window.localStorage.setItem('token', token);
    this.setState({
      user: user,
      startDate: null,
      endDate: null
    });
    this.setDate();
  }

  signOut() {
    window.localStorage.removeItem('token');
    this.setState({ user: null, date: {} });
  }

  getDate(date) {

    this.setState({
      date: date
    });

  }

  setDate() {
    const userToken = window.localStorage.getItem('token');

    fetch('/api/places',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': userToken
        }
      })
      .then(res => res.json())
      .then(result => {
        if (result.length !== 0) {
          result.sort((a, b) => {
            if (a.tripDate < b.tripDate) {
              return -1;
            }
            if (a.tripDate > b.tripDate) {
              return 1;
            }
            return 0;
          }
          );
          this.setState({
            date: {
              startDate: result[0].tripDate,
              nextDate: result[result.length - 1].tripDate
            },
            startDate: result[0].tripDate,
            endDate: result[result.length - 1].tripDate
          });
        } else {
          this.setState({
            date: {
              startDate: this.state.date.startDate,
              nextDate: this.state.date.nextDate
            },
            startDate: this.state.date.startDate,
            endDate: this.state.date.nextDate
          });

        }

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  getUserItinerary() {
    const userToken = window.localStorage.getItem('token');
    const dateFilteredResult = [];

    fetch('/api/places',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': userToken
        }
      })
      .then(res => res.json())
      .then(result => {

        result.forEach(itinerary => {
          if (itinerary.tripDate === this.state.startDate) {
            dateFilteredResult.push(itinerary);
          }
          this.setState({
            itinerary: dateFilteredResult
          });

        });

      }
      )
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleNext() {

    const firstDay = new Date(this.state.startDate);
    if (this.state.startDate !== this.state.endDate) {
      this.setState({
        startDate: new Date(firstDay.setDate(firstDay.getDate() + 1)).toISOString().slice(0, 10)
      });
    }
    this.getUserItinerary();
  }

  handlePrev() {
    const currentDay = new Date(this.state.startDate);
    if (this.state.startDate !== this.state.date.startDate) {
      this.setState({
        startDate: new Date(currentDay.setDate(currentDay.getDate() - 1)).toISOString().slice(0, 10)
      });
    }
    this.getUserItinerary();
  }

  addItinerary(addInfo) {

    this.setState({
      itinerary: this.state.itinerary.concat(addInfo).sort((a, b) => {
        if (a.tripStartTime < b.tripStartTime) {
          return -1;
        }
        if (a.tripStartTime > b.tripStartTime) {
          return 1;
        }
        return 0;
      }
      )
    });
  }

  handleDelete(placeId) {

    const userToken = window.localStorage.getItem('token');

    const newItineraryArray = [...this.state.itinerary];
    const deleteItemIndex = newItineraryArray.findIndex(scheduleObject => scheduleObject.placeId === placeId);
    newItineraryArray.splice(deleteItemIndex, 1);

    fetch(`/api/places/${placeId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Token': userToken
        }
      })
      .then(res => {
        this.setState({
          itinerary: newItineraryArray
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'login') {
      return <Login onSignIn={this.signIn}/>;
    }
    if (route.path === 'map') {
      return <MyMap />;
    }

  }

  render() {

    if (this.state.isAuthorizing) return null;
    const { user, route, date, startDate, endDate, itinerary } = this.state;
    const { signIn, signOut, getDate, getUserItinerary, handleNext, handlePrev, addItinerary, handleDelete, setDate } = this;
    const contextValue = {
      user,
      route,
      date,
      startDate,
      endDate,
      itinerary,
      signIn,
      signOut,
      getDate,
      getUserItinerary,
      handleNext,
      handlePrev,
      addItinerary,
      handleDelete,
      setDate
    };
    return (
    <AppContext.Provider value={contextValue}>
        <>
          { this.renderPage()}
        </>
    </AppContext.Provider>
    );
  }
}
