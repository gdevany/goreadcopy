import React, { Component } from 'react';
import { Link } from 'react-router';
import { MainNavView } from '../views';
import { UncontrolledCarousel } from 'reactstrap';

import '../../../client/styles/app/views/home/index.scss';

const HomeHero = props => (
  <div className="container">
    <div className="row">
      <div className="col">
        <div className="hero section-spacing">
          <UncontrolledCarousel items={CarouselItems} />
        </div>
      </div>
    </div>
  </div>
);

const HomeAds = props => (
  <div className="container">
    <div className="row section-spacing">
      <div className="col-sm-8">
        <img className="img-cover" src="http://via.placeholder.com/800x400" alt="Homepage Ad #1" />
      </div>
      <div className="col-sm-4">
        <img className="img-cover" src="http://via.placeholder.com/400x400" alt="Homepage Ad #2" />
      </div>
    </div>
  </div>
);

const HomeImageLinks = props => (
  <div className="container">
    <div className="row section-spacing">
      <div className="col">
        <img src="http://via.placeholder.com/1400x280" alt="GoRead Children's Literacy Fund" />
      </div>
    </div>
    <div className="row section-spacing">
      <div className="col-sm-6">
        <img src="http://via.placeholder.com/720x320" alt="Build your Following by Publishing Articles" />
      </div>
      <div className="col-sm-6">
        <img src="http://via.placeholder.com/720x320" alt="Earn Income by Writing Articles from Home" />
      </div>
    </div>
  </div>
);

const BookSuggestions = ({ sectionTitle, books }) => (
  <div className="book-suggestions d-flex flex-column justify-content-start section-spacing">
    <span className="home-page section-title">{sectionTitle}</span>
    <hr className="divider home-page-section" />
    <div className="book-suggestions-list d-flex flex-row justify-content-between">
      <a className="book-suggestions-list-control" href="#">
        <i className="arrow left align-self-start"></i>
      </a>
      {
        books.map(({ id, image, title, author, rating, url }) => (
          <div key={id} className="book-suggestion d-flex flex-column justify-content-start align-items-start">
            <Link to={url}>
              <img className="book-suggestion-cover" src={image} alt="name" />
            </Link>
            <span className="book-suggestion-name">{title}</span>
            <span className="book-suggestion-author">{author}</span>
            <div className="book-suggestion-rating">{rating}</div>
          </div>
        ))
      }
      <a className="book-suggestions-list-control" href="#">
        <i className="arrow right align-self-start"></i>
      </a>
    </div>
  </div>
);

const Top5Articles = ({ articles }) => (
  <div className="top-articles d-flex flex-column justify-content-start">
    <span className="home-page section-title">Top 5 Articles This Week:</span>
    <hr className="divider home-page-section" />
    <div className="top-article d-flex flex-column justify-content-start">
      {
        articles.map(({ id, image, category, title, author, url }) => (
          <div key={id} className="top-article d-flex flex-row justify-content-start">
            <Link to={url}>
              <img className="top-article-image" src={image} alt="Article Main Image"/>
            </Link>
            <div className="d-flex flex-column justify-content-start align-items-start">
              <span className="top-article-category">{category}</span>
              <span className="top-article-title">{title}</span>
              <span className="top-article-author">{author}</span>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

const CarouselItems = [
  {
    src: 'http://via.placeholder.com/1279x720',
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src: 'http://via.placeholder.com/1280x720',
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src: 'http://via.placeholder.com/1281x720',
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
];

const Books = [
  {
    id: 0,
    image: 'http://via.placeholder.com/200x300',
    title: 'How To Stop Time',
    author: 'Matt Haig',
    rating: '5',
    url: '#',
  },
  {
    id: 1,
    image: 'http://via.placeholder.com/200x300',
    title: 'Surprise Me',
    author: 'Sophie Kinsella',
    rating: '5',
    url: '#',
  },
  {
    id: 2,
    image: 'http://via.placeholder.com/200x300',
    title: 'The Great Alone',
    author: 'Kristi Hannah',
    rating: '5',
    url: '#',
  },
  {
    id: 3,
    image: 'http://via.placeholder.com/200x300',
    title: 'The Woman in the Window',
    author: 'A.J. Finn',
    rating: '5',
    url: '#',
  },
];

const Articles = [
  {
    id: 0,
    image: 'http://via.placeholder.com/500x500',
    category: 'Personal Development',
    title: 'A Love Letter to Myself',
    author: 'Megan Burgess',
    url: '#',
  },
  {
    id: 1,
    image: 'http://via.placeholder.com/500x500',
    category: 'Pets',
    title: 'The Lucky Cat',
    author: 'Kevin Coolidge',
    url: '#',
  },
  {
    id: 2,
    image: 'http://via.placeholder.com/500x500',
    category: 'Arts and Entertainment',
    title: 'Skye\'s Big Adventure',
    author: 'Kevin Coolidge',
    url: '#',
  },
  {
    id: 3,
    image: 'http://via.placeholder.com/500x500',
    category: 'Leadership',
    title: 'Public Speaking Tips',
    author: 'Jeremy Bhimji',
    url: '#',
  },
  {
    id: 4,
    image: 'http://via.placeholder.com/500x500',
    category: 'Personal Development',
    title: 'In the Stillness',
    author: 'Shari Reinhart',
    url: '#',
  },
];

const HomeContent = props => (
  <div className="container">
    <div className="row">
      <div className="col-sm-9">
        <BookSuggestions sectionTitle="Best-Selling Books This Week:" books={Books}/>
        <BookSuggestions sectionTitle="New Releases:" books={Books}/>
      </div>
      <div className="col-sm-3">
        <Top5Articles articles={Articles} />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <BookSuggestions sectionTitle="#Trending:" books={Books}/>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <HomeAds />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <BookSuggestions sectionTitle="Coming Soon:" books={Books}/>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <HomeImageLinks />
      </div>
    </div>
  </div>
);

class Home extends Component {
  render() {
    return (
      <MainNavView>
        <div className="page-content add-b-margin">
          <HomeHero />
          <HomeContent />
        </div>
      </MainNavView>
    );
  }
}

export default Home;
