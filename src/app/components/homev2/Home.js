import React, { Component } from 'react';
import Helmet from 'react-helmet';
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
      target: slide.actionUrlTargetBlank,
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
            onStock={false}
          />
          <Top5Articles articles={Articles} />
        </div>
      </div>
    </div>
    <AdWithCMS target="_blank" adKey="home.ads.ads1" />
    <div className="container">
      <div className="row">
        <div className="col">
          <NewReleasesBooks
            maxPrice={40}
            sectionTitle="New Releases"
            displayAmount={getAmount(screenWidth, breakpoints)}
            perPage={24}
            limit={24}
            oneByFamily={true}
          />
        </div>
      </div>
    </div>
    <AdWithCMS target="_blank" adKey="home.ads.ads2" />
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
    <AdWithCMS target="_blank" adKey="home.footer.footer1" />
    <AdWithCMS target="_blank" adKey="home.footer.footer2" />
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
            onStock={false}
          />
          <NewReleasesBooks
            maxPrice={40}
            sectionTitle="New Releases"
            books={Books}
            displayAmount={getAmount(screenWidth, breakpoints)}
            perPage={24}
            limit={24}
            oneByFamily={true}
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
            maxPrice={40}
            sectionTitle="Coming Soon"
            displayAmount={getAmount(screenWidth, breakpoints, true)}
            perPage={24}
            limit={24}
            oneByFamily={true}
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
        <Helmet>
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1985177905097090');
              fbq('track', 'PageView');
            `}
          </script>
          <noscript>
            {`
              <img
                height="1"
                width="1"
                style="display:none"
                src="https://www.facebook.com/tr?id=1985177905097090&ev=PageView&noscript=1"
              />
            `}
          </noscript>
        </Helmet>
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
