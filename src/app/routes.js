import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/apps/App';
import FoundationApp from './components/apps/FoundationApp';
import BootstrapApp from './components/apps/BootstrapApp';
import { SignUpFlow } from './components/readerOnboarding';
import IncomingRedirect from './components/incomingRedirect/IncomingRedirect';
import { HomeWrapper } from './components/home';
import { SignUpModal, LogInModal } from './components/common';
import { Profile } from './components/profile';
import {
  BookStore,
  BookPage,
  CategoriesPage,
  CartPage,
  CheckoutPage,
  orderSuccess,
  Orders,
} from './components/store';
import { PublicWrapper } from './components/public';
import { ReferralHome } from './components/referral';
import { Literacy } from './components/literacy';
import { Settings } from './components/settings';
import {
  AboutUs,
  Career,
  Investors,
  OurMission,
  SellYourBooks,
  AffiliatePage,
  AdvertiseYourProduct,
  PublishWithUs,
  AdvertiseYourBusiness,
  PublishYourBook,
  PromoteYourBusiness,
} from './components/homev2/templates';
import { Auth } from './services';

const isUserLoggedIn = Auth.currentUserExists();

const useFoundationFor = PassedComponent => (
  props => (
    <FoundationApp>
      <PassedComponent {...props} />
    </FoundationApp>
  )
);

const useBootstrapFor = PassedComponent => (
  props => (
    <BootstrapApp>
      <PassedComponent {...props} />
    </BootstrapApp>
  )
);

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute isUserLoggedIn={isUserLoggedIn} component={HomeWrapper} />
    <Route path="/profile/settings" component={Settings} />
    <Route path="/profile/:slug" component={Profile} />
    <Route path="/profile/welcome/" component={Profile} />
    <Route path="/me/:slug" component={ReferralHome} />
    <Route path="/store" component={BookStore} />
    <Route path="/book/:slug" component={BookPage} />
    <Route path="/categories/:slug" component={CategoriesPage} />
    <Route path="/categories/:slug/:subCategory" component={CategoriesPage} />
    <Route path="/shop/cart" component={CartPage} />
    <Route path="/shop/checkout" component={CheckoutPage} />
    <Route path="/shop/success" component={orderSuccess} />
    <Route path="/store/orders" component={Orders} />
    <Route path="/literacy" component={useBootstrapFor(Literacy)} />
    <Route path="/signup" component={SignUpFlow} />
    <Route path="/redirect" component={IncomingRedirect} />
    <Route path="/antispam" context="antispam" component={PublicWrapper} />
    <Route path="/terms" context="terms" component={PublicWrapper} />
    <Route path="/privacy" context="privacy" component={PublicWrapper} />
    <Route path="/accounts/signup" component={SignUpModal} />
    <Route path="/accounts/login" component={LogInModal} />
    <Route path="/about-us" component={useBootstrapFor(AboutUs)} />
    <Route path="/career" component={useBootstrapFor(Career)} />
    <Route path="/investor-relations" component={useBootstrapFor(Investors)} />
    <Route path="/our-mission" component={useBootstrapFor(OurMission)} />
    <Route path="/sell-your-books" component={useBootstrapFor(SellYourBooks)} />
    <Route path="/affiliate-page" component={useBootstrapFor(AffiliatePage)} />
    <Route path="/advertise-your-product" component={useBootstrapFor(AdvertiseYourProduct)} />
    <Route path="/publish-with-us" component={useBootstrapFor(PublishWithUs)} />
    <Route path="/advertise-your-business" component={useBootstrapFor(AdvertiseYourBusiness)} />
    <Route path="/publish-your-book" component={useBootstrapFor(PublishYourBook)} />
    <Route path="/promote-your-business" component={useBootstrapFor(PromoteYourBusiness)} />
  </Route>
);

export default Routes;
