import React from 'react';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/sign-up';
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
      date: {}
      // headerDate: null,
      // startDate: null,
      // endDate: null,
      // itinerary: []
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getDate = this.getDate.bind(this);
    // this.getUserItinerary = this.getUserItinerary.bind(this);
    // this.handleNext = this.handleNext.bind(this);
    // this.handlePrev = this.handlePrev.bind(this);
    // this.addItinerary = this.addItinerary.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    // this.setDate = this.setDate.bind(this);
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
      user: user
      // startDate: null,
      // endDate: null
    });
    // this.setDate();
  }

  signOut() {
    window.localStorage.removeItem('token');
    this.setState({ user: null });
  }

  getDate(date) {

    this.setState({
      date: date
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
    if (route.path === 'signup') {
      return <SignUp />;
    }
    if (route.path === 'map') {
      return <MyMap />;
    }

  }

  render() {
    // console.log(this.state);

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
