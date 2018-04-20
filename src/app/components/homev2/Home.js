import React, { Component } from 'react';
import { Link } from 'react-router';
import { withBreakpoints } from 'react-breakpoints';
import { MainNavView } from '../views';
import { UncontrolledCarousel } from 'reactstrap';

import '../../../client/styles/app/views/home/index.scss';

const CarouselItems = [
  {
    src: 'http://via.placeholder.com/1279x720',
    altText: 'Slide 1',
    caption: 'Slide 1',
  },
  {
    src: 'http://via.placeholder.com/720x1280',
    altText: 'Slide 2',
    caption: 'Slide 2',
  },
  {
    src: 'http://via.placeholder.com/1000x1000',
    altText: 'Slide 3',
    caption: 'Slide 3',
  },
];

const Ads = [
  {
    id: 1,
    image: "http://via.placeholder.com/800x400",
    classes: "home-ad img-cover",
    url: "#",
    alt: "Homepage Ad #1",
    isLink: true,
    target: "_blank",
  },
  {
    id: 2,
    image: "http://via.placeholder.com/400x400",
    classes: "home-ad img-cover",
    url: "#",
    alt: "Homepage Ad #2",
    isLink: true,
    target: null,
  },
  {
    id: 3,
    image: "http://via.placeholder.com/1400x280",
    classes: "home-ad img-cover",
    url: "#",
    alt: "GoRead Children's Literacy Fund",
    isLink: true,
    target: null,
  },
  {
    id: 4,
    image: "http://via.placeholder.com/720x320",
    classes: "home-ad img-cover",
    url: "#",
    alt: "Build your Following by Publishing Articles",
    isLink: true,
    target: null,
  },
  {
    id: 5,
    image: "http://via.placeholder.com/720x320",
    classes: "home-ad img-cover",
    url: "#",
    alt: "Earn Income by Writing Articles from Home",
    isLink: true,
    target: null,
  },
];

const Ad = ({ item: { id, classes, image, url, alt, isLink, target }}) => (
  isLink ? (
    <Link to={url} target={target}>
      <img className={classes} src={image} alt={alt} />
    </Link>
  ) : (
    <a href={url} target={target}>
      <img className={classes} src={image} alt={alt} />
    </a>
  )
);

const Hero = props => (
  <div className="hero section-spacing">
    <UncontrolledCarousel items={CarouselItems} />
  </div>
);

const HomeHero = props => (
  <div className="hero-wrapper">
    <div className="d-block d-sm-none">
      <Hero />
    </div>
    <div className="d-none d-sm-block">
      <div className="container">
        <div className="row">
          <div className="col">
            <Hero />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HomeAds = props => (
  <div className="container">
    <div className="row section-spacing">
      <div className="col-sm-8">
        <Ad item={Ads[0]} />
      </div>
      <div className="col-sm-4">
        <Ad item={Ads[1]} />
      </div>
    </div>
  </div>
);

const HomeImageLinks = props => (
  <div className="container">
    <div className="row section-spacing">
      <div className="col">
        <Ad item={Ads[2]} />
      </div>
    </div>
    <div className="row section-spacing">
      <div className="col-sm-6">
        <Ad item={Ads[3]} />
      </div>
      <div className="col-sm-6">
        <Ad item={Ads[4]} />
      </div>
    </div>
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
        <i className="arrow left align-self-start"></i>
      </a>
      {
        books.slice(0, displayAmount).map(({ id, image, title, author, rating, url }) => (
          <div key={id} className="book-carousel-item d-flex flex-column justify-content-start align-items-start">
            <Link to={url}>
              <img className="book-carousel-item-cover" src={image} alt="name" />
            </Link>
            <span className="book-carousel-item-name">{title}</span>
            <span className="book-carousel-item-author">{author}</span>
            <div className="book-carousel-item-rating">{rating}</div>
          </div>
        ))
      }
      <a className="book-carousel-list-control" href="#">
        <i className="arrow right align-self-start"></i>
      </a>
    </div>
  </div>
);

const Top5Articles = ({ articles }) => (
  <div className="top-articles d-flex flex-column justify-content-start">
    <span className="home-page section-title">Top 5 Articles This Week:</span>
    <hr className="divider home-page-section d-none d-sm-block" />
    <div className="top-article d-flex flex-column justify-content-start">
      {
        articles.map(({ id, image, category, title, author, url }, idx) => (
          <div key={id} className="top-article">
            <div className="d-flex flex-row justify-content-start">
              <Link to={url}>
                <img className="top-article-image" src={image} alt="Article Main Image"/>
              </Link>
              <div className="d-flex flex-column justify-content-start align-items-start">
                <span className="top-article-category">{category}</span>
                <span className="top-article-title">{title}</span>
                <span className="top-article-author">{author}</span>
              </div>
            </div>
            {
              idx < articles.length - 1 ?
                <hr className="divider home-page-section d-block d-sm-none" /> :
                null
            }
          </div>
        ))
      }
    </div>
  </div>
);

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
  {
    id: 4,
    image: 'http://via.placeholder.com/200x300',
    title: 'Harry Potter and the Goblet of Fire',
    author: 'J. K. Rowling',
    rating: '5',
    url: '#',
  },
  {
    id: 5,
    image: 'http://via.placeholder.com/200x300',
    title: 'Black',
    author: 'Ted Dekker',
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

const getAmount = (screenWidth, breakpoints, isFullOnDesktop) => {
  if (screenWidth <= breakpoints.mobile) return 1;
  if (screenWidth <= breakpoints.mobileLandscape) return 2;
  if (screenWidth < breakpoints.tablet) return 3;
  return isFullOnDesktop ? 6 : 4;
};

const HomeContent = ({ screenWidth, breakpoints }) => (
  <div className="home-content-wrapper">
    <div className="d-block d-sm-none">
      <div className="container">
        <div className="row">
          <div className="col">
            <BookCarousel
              sectionTitle="Best-Selling Books This Week"
              books={Books}
              displayAmount={getAmount(screenWidth, breakpoints)}
            />
            <Top5Articles articles={Articles} />
          </div>
        </div>
      </div>
      <Ad item={Ads[0]} />
      <div className="container">
        <div className="row">
          <div className="col">
            <BookCarousel
              sectionTitle="New Releases"
              books={Books}
              displayAmount={getAmount(screenWidth, breakpoints)}
            />
          </div>
        </div>
      </div>
      <Ad item={Ads[1]} />
      <div className="container">
        <div className="row">
          <div className="col">
            <BookCarousel
              sectionTitle="#Trending"
              books={Books}
              displayAmount={getAmount(screenWidth, breakpoints, true)}
            />
          </div>
        </div>
      </div>
      <Ad item={Ads[2]} />
      <Ad item={Ads[4]} />
    </div>
    <div className="d-none d-sm-block">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-9">
            <BookCarousel
              sectionTitle="Best-Selling Books This Week"
              books={Books}
              displayAmount={getAmount(screenWidth, breakpoints)}
            />
            <BookCarousel
              sectionTitle="New Releases"
              books={Books}
              displayAmount={getAmount(screenWidth, breakpoints)}
            />
          </div>
          <div className="col-sm-3">
            <Top5Articles articles={Articles} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <BookCarousel
              sectionTitle="#Trending"
              books={Books}
              displayAmount={getAmount(screenWidth, breakpoints, true)}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <HomeAds />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <BookCarousel
              sectionTitle="Coming Soon"
              books={Books}
              displayAmount={getAmount(screenWidth, breakpoints, true)}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <HomeImageLinks />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DividedHomeContent = withBreakpoints(HomeContent);

class Home extends Component {
  render() {
    return (
      <MainNavView>
        <div className="page-content add-b-margin">
          <HomeHero />
          <DividedHomeContent />
        </div>
      </MainNavView>
    );
  }
}

export default Home;
