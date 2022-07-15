import React from 'react';
import Home from './pages/home';
import Login from './pages/login';
import MyMap from '../client/components/my-map';
import parseRoute from './lib/parse.route';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      user: {}
    };
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  signIn(user) {
    this.setState({
      user: user.payload
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'login') {
      return <Login signIn={this.signIn}/>;
    }
    if (route.path === 'map') {
      const startDate = route.params.get('startDate');
      const nextDate = route.params.get('nextDate');
      return <MyMap startDate={startDate} nextDate={nextDate}/>;
    }

  }

  render() {
    return (
    <>
    { this.renderPage()}
    </>
    );
  }
}
