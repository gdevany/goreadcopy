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

const maxLength = 16;

const trimStrings = str => (
  str.length > maxLength ?
    `${str.substring(0, maxLength - 3)}...` :
    str
);

const hasAuthor = authors => (
  authors.length > 0 ?
    authors[0] :
    null
);

const NavigationLink = ({ text, isLink, action, target }) => (
  isLink ?
    <Link to={action}>{text}</Link> :
    <a href={action} target={target}>{text}</a>
);

const mapAuthor = ({ fullname, id, url }) => ({
  text: fullname,
  key: id,
  action: url,
});

const BookCarouselItem = ({ imageUrl, title, authors, rating, url }) => {
  const author = hasAuthor(authors);
  return (
    <div className="book-carousel-item d-flex flex-column justify-content-start align-items-start">
      <Link to={url}>
        <div className="book-carousel-item-cover-wrapper d-flex flex-column justify-content-end align-items-center">
          <img className="book-carousel-item-cover" src={imageUrl} alt={title} />
        </div>
      </Link>
      <span className="book-carousel-item-name" title={title}>{trimStrings(title)}</span>
      {
        author ?
          (
            <span className="book-carousel-item-author" title={author.fullname} >
              { 'by ' }
              <NavigationLink {...mapAuthor(author)} text={trimStrings(author.fullname)} />
            </span>
          ) : null
      }
      <div className="book-carousel-item-rating" title={rating.toFixed(2)}>
        <Rating
          readonly
          initialRate={Math.floor(rating)}
          full={<FontAwesomeIcon icon={faFullStar} />}
          empty={<FontAwesomeIcon icon={faEmptyStar} />}
        />
      </div>
    </div>
  );
};


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
    const { onNext } = this.props;
    const nextIndex = this.state.activeIndex === limit - 1 ? 0 : this.state.activeIndex + 1;

    this.setState({ activeIndex: nextIndex });

    onNext(nextIndex);
  }

  previous = limit => () => {
    if (this.animating) return;
    const { onPrevious } = this.props;

    const nextIndex = this.state.activeIndex === 0 ? limit - 1 : this.state.activeIndex - 1;

    this.setState({ activeIndex: nextIndex });
    onPrevious(nextIndex);
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

    if (limit === 0) {
      return null;
    }

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
            <BookCarouselItem {...item} rating={item.rating.average} />
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
