import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  Carousel,
  CarouselItem,
} from 'reactstrap';
import R from 'ramda';



const HeroCarouselItem = ({ src, altText, caption, isLink, action, target }) => (
  isLink ?
    <Link to={action}><img src={src} alt={altText} caption={caption} /></Link> :
    <a href={action} target={target}><img src={src} alt={altText} caption={caption} /></a>
);

class HeroCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  next = limit => () => {
    if (this.animating) return;
    const { onNext } = this.props;
    const nextIndex = this.state.activeIndex === limit - 1 ? 0 : this.state.activeIndex + 1;

    this.setState({ activeIndex: nextIndex });
  }

  previous = limit => () => {
    if (this.animating) return;
    const { onPrevious } = this.props;

    const nextIndex = this.state.activeIndex === 0 ? limit - 1 : this.state.activeIndex - 1;

    this.setState({ activeIndex: nextIndex })
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { items } = this.props;

    const carouselItems = items.map((item, idx) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={idx}
      >
        <HeroCarouselItem {...item} />
      </CarouselItem>
    ));

    return (
      <Carousel
        activeIndex={activeIndex}
        next={R.curry(this.next)(items.length)}
        previous={R.curry(this.previous)(items.length)}
        interval={5000}
      >
        {carouselItems}
        <a className="carousel-control-prev" role="button" tabIndex="0" onClick={R.curry(this.previous)(items.length)}>
          <i className="arrow left" />
          <span className="sr-only">Prev</span>
        </a>
        <a className="carousel-control-next" role="button" tabIndex="0" onClick={R.curry(this.next)(items.length)}>
          <i className="arrow right" />
          <span className="sr-only">Next</span>
        </a>
      </Carousel>
    );
  }
}

export default HeroCarousel;
