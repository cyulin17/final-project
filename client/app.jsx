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
      isAuthorizing: true
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
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
    this.setState({ user: null });
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
      const startDate = route.params.get('startDate');
      const nextDate = route.params.get('nextDate');
      return <MyMap startDate={startDate} nextDate={nextDate}/>;
    }

  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { signIn, signOut } = this;
    const contextValue = { user, route, signIn, signOut };
    return (
    <AppContext.Provider value={contextValue}>
        <>
          { this.renderPage()}
        </>
    </AppContext.Provider>
    );
  }
}
