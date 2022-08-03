import React from 'react';
import Header from '../components/header';
import Carousel from '../components/carousel';
import Plan from '../components/start-planning';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {

  render() {
    const { getDate } = this.context;
    return (
      <>
        <Header />
        <Carousel />
        <Plan getDate={getDate}/>
      </>
    );
  }

}

Home.contextType = AppContext;
