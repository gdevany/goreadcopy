import React, { Component } from 'react';
import { withBreakpoints } from 'react-breakpoints';
import { MainNavView } from '../views';
import Top5Articles from './Top5Articles';
import BookCarousel from './BookCarousel';
import { HomeAds, HomeImageLinks, Ad, HomeHero } from './HomeContentItems';
import { CarouselItems, Ads, Books, Articles } from './Placeholders';
import '../../../client/styles/app/views/home/index.scss';

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
            <HomeAds ads={Ads} />
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
            <HomeImageLinks ads={Ads} />
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
          <HomeHero items={CarouselItems}/>
          <DividedHomeContent />
        </div>
      </MainNavView>
    );
  }
}

export default Home;
