import React, { Component } from 'react';
import { withBreakpoints } from 'react-breakpoints';
import CMSProvider from '../cms/CMSProvider';
import withCMS from '../cms/HOC/withCMSData';
import { getSection, getEntity } from '../../redux/selectors/cms';
import { MainNavView } from '../views';
import Top5Articles from './Top5Articles';
import {
  BestSellingBooks,
  ComingSoonBooks,
  NewReleasesBooks,
  TrendingBooks,
} from './carousels';
import { HomeAds, HomeImageLinks, Ad, HomeHero } from './HomeContentItems';
import { CarouselItems, Ads, Books, Articles } from './Placeholders';
import '../../../client/styles/app/views/home/index.scss';

const getAmount = (screenWidth, breakpoints, isFullOnDesktop) => {
  if (screenWidth <= breakpoints.mobile) return 1;
  if (screenWidth <= breakpoints.mobileLandscape) return 2;
  if (screenWidth < breakpoints.tablet) return 3;
  return isFullOnDesktop ? 7 : 5;
};

const mapCMSSlidesToHeroItems = (cms) => {
  const slidesFromCMS = getSection(cms, 'home', 'slide');
  const slides = slidesFromCMS.map((slide) => {
    const actionUrl = slide.actionUrl || '/';

    return ({
      src: slide.imageUrl,
      altText: slide.name,
      caption: slide.description,
      isLink: !actionUrl.includes('http'),
      action: actionUrl,
    });
  });

  return { items: slides };
}

const mapCMSEntitiesToAds = (cms) => {
  const adsFromCMS = getSection(cms, 'home', 'ads');
  const ads = adsFromCMS.map((ad) => {
    const actionUrl = ad.actionUrl || '/';

    return ({
      image: ad.imageUrl,
      alt: ad.name,
      classes: 'home-ad img-cover',
      id: ad.slug,
      isLink: !actionUrl.includes('http'),
      target: actionUrl.includes('http') ? '_blank' : null,
      url: actionUrl,
    });
  });

  return { ads };
}


const mapCMSFooterEntitiesToAds = (cms) => {
  const adsFromCMS = getSection(cms, 'home', 'footer');
  const ads = adsFromCMS.map((ad) => {
    const actionUrl = ad.actionUrl || '/';

    return ({
      image: ad.imageUrl,
      alt: ad.name,
      classes: 'home-ad img-cover',
      id: ad.slug,
      isLink: !actionUrl.includes('http'),
      target: actionUrl.includes('http') ? '_blank' : null,
      url: actionUrl,
    });
  });

  return { ads };
}


const mapCMSEntityToAd = (cms, props) => {
  const adFromCMS = getEntity(cms, props.adKey);

  if (!adFromCMS) {
    return { item: null };
  }

  const actionUrl = adFromCMS.actionUrl || '';

  return ({
    item: {
      image: adFromCMS.imageUrl,
      alt: adFromCMS.name,
      classes: 'home-ad img-cover',
      id: adFromCMS.slug,
      isLink: !actionUrl.includes('http'),
      target: actionUrl.includes('http') ? '_blank' : null,
      url: actionUrl,
    },
  });
};

const HomeAdsWithCMS = withCMS(mapCMSEntitiesToAds)(HomeAds);
const HomeHeroWithCMS = withCMS(mapCMSSlidesToHeroItems)(HomeHero);
const AdWithCMS = withCMS(mapCMSEntityToAd)(Ad);
const HomeImageLinksWithCMS = withCMS(mapCMSFooterEntitiesToAds)(HomeImageLinks);

const MobileBreakpoint = ({ screenWidth, breakpoints }) => (
  <div className="d-block d-sm-none">
    <div className="container">
      <div className="row">
        <div className="col">
          <BestSellingBooks
            sectionTitle="Best-Selling Books This Week"
            displayAmount={getAmount(screenWidth, breakpoints)}
            perPage={24}
            limit={24}
          />
          <Top5Articles articles={Articles} />
        </div>
      </div>
    </div>
    <AdWithCMS adKey="home.ads.ads1" />
    <div className="container">
      <div className="row">
        <div className="col">
          <NewReleasesBooks
            sectionTitle="New Releases"
            displayAmount={getAmount(screenWidth, breakpoints)}
            perPage={24}
            limit={24}
          />
        </div>
      </div>
    </div>
    <AdWithCMS adKey="home.ads.ads2" />
    <div className="container">
      <div className="row">
        <div className="col">
          <TrendingBooks
            sectionTitle="#Trending"
            displayAmount={getAmount(screenWidth, breakpoints, true)}
            perPage={24}
            limit={24}
          />
        </div>
      </div>
    </div>
    <AdWithCMS adKey="home.footer.footer1" />
    <AdWithCMS adKey="home.footer.footer2" />
  </div>
);

const DesktopBreakpoint = ({ screenWidth, breakpoints }) => (
  <div className="d-none d-sm-block">
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-9">
          <BestSellingBooks
            sectionTitle="Best-Selling Books This Week"
            displayAmount={getAmount(screenWidth, breakpoints)}
            perPage={24}
            limit={24}
          />
          <NewReleasesBooks
            sectionTitle="New Releases"
            books={Books}
            displayAmount={getAmount(screenWidth, breakpoints)}
            perPage={24}
            limit={24}
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
          <TrendingBooks
            sectionTitle="#Trending"
            displayAmount={getAmount(screenWidth, breakpoints, true)}
            perPage={24}
            limit={24}
          />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col">
          <HomeAdsWithCMS />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col">
          <ComingSoonBooks
            sectionTitle="Coming Soon"
            displayAmount={getAmount(screenWidth, breakpoints, true)}
            perPage={24}
            limit={24}
          />
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col">
          <HomeImageLinksWithCMS />
        </div>
      </div>
    </div>
  </div>
);

const HomeContent = ({ screenWidth, breakpoints }) => {
  if (!screenWidth) {
    return null;
  }

  return (
    <div className="home-content-wrapper">
      {
        screenWidth > breakpoints.tablet ?
          <DesktopBreakpoint {...{ screenWidth, breakpoints }} /> :
          <MobileBreakpoint {...{ screenWidth, breakpoints }} />
      }
    </div>
  )
};

const DividedHomeContent = withBreakpoints(HomeContent);

class Home extends Component {

  render() {
    return (
      <MainNavView>
        <CMSProvider page="home">
          <div className="page-content add-b-margin">
            <HomeHeroWithCMS />
            <DividedHomeContent />
          </div>
        </CMSProvider>
      </MainNavView>
    );
  }
}

export default Home;
