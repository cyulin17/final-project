import React from 'react';

const images = [
  {
    id: 1,
    label: 'image1',
    image: '/images/Japan_01.jpg'
  },
  {
    id: 2,
    label: 'image2',
    image: '/images/Japan_02.jpg'
  },
  {
    id: 3,
    label: 'image3',
    image: '/images/Japan_03.jpg'
  },
  {
    id: 4,
    label: 'image4',
    image: '/images/Japan_04.jpg'
  },
  {
    id: 5,
    label: 'image5',
    image: '/images/Japan_05.jpg'
  }
];

export default class Carousel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastIndex: 2,
      currentId: 0,
      image1: images[0].image,
      image2: images[1].image,
      image3: images[2].image
    };
    this.nextImg = this.nextImg.bind(this);
    this.circleClick = this.circleClick.bind(this);
  }

  nextImg() {
    const { lastIndex, currentId, image2, image3 } = this.state;
    let nextLastIndex = lastIndex + 1;

    if (nextLastIndex >= images.length) {
      nextLastIndex = 0;
    }

    if (currentId === images.length - 1) {
      this.setState({ currentId: 0 });
    } else {
      this.setState({ currentId: currentId + 1 });
    }

    this.setState({
      lastIndex: nextLastIndex,
      image1: image2,
      image2: image3,
      image3: images[nextLastIndex].image
    });
  }

  circleClick(index) {
    clearInterval(this.timer);
    if (index === images.length - 2) {
      this.setState({
        currentId: 3,
        image1: images[3].image,
        image2: images[4].image,
        image3: images[0].image
      });
    }

    if (index === images.length - 1) {
      this.setState({
        currentId: 4,
        image1: images[4].image,
        image2: images[0].image,
        image3: images[1].image
      });
    }

    if (this.state.currentId !== index) {
      this.setState({
        currentId: index,
        image1: images[index].image,
        image2: images[index + 1].image,
        image3: images[index + 2].image

      });
    }
    this.startTimer();
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(
      () => this.nextImg(),
      3000
    );
  }

  render() {
    const button = images.map((dot, index) =>
      <li key={dot.id} onClick={() => this.circleClick(index)}>
        <i className={this.state.currentId === index ? 'fas fa-circle button' : 'far fa-circle button'}></i>
      </li>
    );

    return (
      <div>
        <ul className="image-container">
          <li className="image"><img src={this.state.image1} alt="" /></li>
          <li className="image"><img src={this.state.image2} alt="" /></li>
          <li className="image"><img src={this.state.image3} alt="" /></li>
        </ul>
        <ul className="button-container">
        {button}
        </ul>
      </div>

    );
  }
}
