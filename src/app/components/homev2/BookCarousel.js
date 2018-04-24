import React from 'react';
import { Link } from 'react-router';

const BookCarouselItem = ({ image, title, author, rating, url }) => (
  <div className="book-carousel-item d-flex flex-column justify-content-start align-items-start">
    <Link to={url}>
      <img className="book-carousel-item-cover" src={image} alt="name" />
    </Link>
    <span className="book-carousel-item-name">{title}</span>
    <span className="book-carousel-item-author">{author}</span>
    {/* <div className="book-carousel-item-rating">{rating}</div> */}
  </div>
);

const BookCarousel = ({ sectionTitle, books, displayAmount }) => (
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
    <div className="book-carousel-list d-flex flex-row justify-content-between">
      <a className="book-carousel-list-control" href="#">
        <i className="arrow left align-self-start" />
      </a>
      {
        books.slice(0, displayAmount).map(el => (
          <BookCarouselItem {...el} />
        ))
      }
      <a className="book-carousel-list-control" href="#">
        <i className="arrow right align-self-start" />
      </a>
    </div>
  </div>
);

export default BookCarousel;
