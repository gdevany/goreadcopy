import React, { Component } from 'react';
import { Link } from 'react-router';
import Rating from 'react-rating';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFullStar from '@fortawesome/fontawesome-free-solid/faStar';
import faEmptyStar from '@fortawesome/fontawesome-free-regular/faStar';
import {
  Carousel,
  CarouselItem,
} from 'reactstrap';
import R from 'ramda';

const BookCarouselItem = ({ image, title, author, rating, url }) => (
  <div className="book-carousel-item d-flex flex-column justify-content-start align-items-start">
    <Link to={url}>
      <img className="book-carousel-item-cover" src={image} alt="name" />
    </Link>
    <span className="book-carousel-item-name">{title}</span>
    <span className="book-carousel-item-author">{author}</span>
    <div className="book-carousel-item-rating">
      <Rating
        readonly
        initialRate={Math.floor(rating)}
        full={<FontAwesomeIcon icon={faFullStar} />}
        empty={<FontAwesomeIcon icon={faEmptyStar} />}
      />
    </div>
  </div>
);

class BookCarouselV2 extends Component {
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
    const nextIndex = this.state.activeIndex === limit - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = limit => () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? limit - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;
    const { books, sectionTitle, displayAmount } = this.props;
    const itemLists = R.splitEvery(displayAmount, books);
    const limit = itemLists.length;

    if (itemLists[itemLists.length - 1].length !== displayAmount) {
      itemLists[itemLists.length - 1] = Array.concat(
        itemLists[itemLists.length - 2]
          .slice(itemLists[itemLists.length - 1].length - displayAmount),
        itemLists[itemLists.length - 1],
      );
    }

    const items = itemLists.map((list, idx) => (
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={idx}
        className="flex-row justify-content-center align-items-center"
      >
        {
          list.map(item => (
            <BookCarouselItem {...item} />
          ))
        }
      </CarouselItem>
    ));

    return (
      <div className="book-carousel d-flex flex-column justify-content-start section-spacing">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center justify-content-sm-start">
              <span className="home-page section-title">{sectionTitle}</span>
              <span className="d-none d-sm-block">:</span>
            </div>
          </div>
        </div>
        <hr className="divider home-page-section d-none d-sm-block" />
        <Carousel
          activeIndex={activeIndex}
          next={R.curry(this.next)(limit)}
          previous={R.curry(this.previous)(limit)}
          interval={false}
        >
          {items}
          <a className="carousel-control-prev" role="button" tabIndex="0" onClick={R.curry(this.previous)(limit)}>
            <i className="arrow left" />
            <span className="sr-only">Prev</span>
          </a>
          <a className="carousel-control-next" role="button" tabIndex="0" onClick={R.curry(this.next)(limit)}>
            <i className="arrow right" />
            <span className="sr-only">Next</span>
          </a>
        </Carousel>
      </div>
    );
  }
}

export default BookCarouselV2;
