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
      tripStartDate: null,
      tripEndDate: null,
      tripId: null
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getDate = this.getDate.bind(this);
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
    });
  }

  signOut() {
    window.localStorage.removeItem('token');
    this.setState({
      user: null,
      tripId: null
    });
  }

  getDate(date) {
    const tripStartDate = date.tripStartDate;
    const tripEndDate = date.tripEndDate;

    this.setState({
      tripStartDate: tripStartDate,
      tripEndDate: tripEndDate
    });

  }

  renderPage() {
    const { route } = this.state;

    if (route.path === '') {
      if (this.state.user) {
        const userId = this.state.user.userId;
        return <Home userId={userId}/>;
      } else {
        return <Home />;
      }

    }
    if (route.path === 'login') {
      return <Login onSignIn={this.signIn} />;
    }
    if (route.path === 'signup') {
      return <SignUp />;
    }
    if (route.path === 'map') {
      return <MyMap />;
    }

  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route, tripStartDate, tripEndDate, tripId } = this.state;
    const { signIn, signOut, getDate } = this;
    const contextValue = {
      user,
      route,
      tripStartDate,
      tripEndDate,
      tripId,
      signIn,
      signOut,
      getDate
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
