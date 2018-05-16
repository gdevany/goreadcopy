import React from 'react';
import { Carousel } from 'reactstrap';
import Hero from './Hero';
import { Link } from 'react-router';

export function Ad({ item: { id, classes, image, url, alt, isLink, target }}) {
  return isLink ? (
    <Link to={url} target={target}>
      <img className={classes} src={image} alt={alt} />
    </Link>
  ) : (
    <a href={url} target={target}>
      <img className={classes} src={image} alt={alt} />
    </a>
  );
}

export function HomeHero({ items }) {
  return (
    <div className="hero-wrapper">
      <div className="d-block d-sm-none">
        <Hero items={items} />
      </div>
      <div className="d-none d-sm-block">
        <div className="container">
          <div className="row">
            <div className="col">
              <Hero items={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeAds({ ads }) {
  return (
    <div className="container">
      <div className="row section-spacing">
        <div className="col-sm-8">
          <Ad item={ads[0]} />
        </div>
        <div className="col-sm-4">
          <Ad item={ads[1]} />
        </div>
      </div>
    </div>
  );
}

export function HomeImageLinks({ ads }) {
  return (
    <div className="container">
      <div className="row section-spacing">
        <div className="col">
          <Ad item={ads[2]} />
        </div>
      </div>
      <div className="row section-spacing">
        <div className="col-sm-6">
          <Ad item={ads[3]} />
        </div>
        <div className="col-sm-6">
          <Ad item={ads[4]} />
        </div>
      </div>
    </div>
  );
}
