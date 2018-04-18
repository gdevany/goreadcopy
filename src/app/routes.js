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
import { Auth } from './services';

const isUserLoggedIn = Auth.currentUserExists();

const useFoundationFor = PassedComponent => (
  props => (
    <FoundationApp>
      <PassedComponent />
    </FoundationApp>
  )
);

const useBootstrapFor = PassedComponent => (
  props => (
    <BootstrapApp>
      <PassedComponent />
    </BootstrapApp>
  )
);

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute isUserLoggedIn={isUserLoggedIn} component={HomeWrapper} />
    <Route path="/vid" isUserLoggedIn={isUserLoggedIn} component={HomeWrapper} />
    <Route path="/profile/settings" component={useFoundationFor(Settings)} />
    <Route path="/profile/:slug" component={useFoundationFor(Profile)} />
    <Route path="/me/:slug" component={useFoundationFor(ReferralHome)} />
    <Route path="/store" component={useFoundationFor(BookStore)} />
    <Route path="/book/:slug" component={useFoundationFor(BookPage)} />
    <Route path="/categories/:slug" component={useFoundationFor(CategoriesPage)} />
    <Route path="/categories/:slug/:subCategory" component={useFoundationFor(CategoriesPage)} />
    <Route path="/shop/cart" component={useFoundationFor(CartPage)} />
    <Route path="/shop/checkout" component={useFoundationFor(CheckoutPage)} />
    <Route path="/shop/success" component={useFoundationFor(orderSuccess)} />
    <Route path="/store/orders" component={useFoundationFor(Orders)} />
    <Route path="/signup" component={useFoundationFor(SignUpFlow)} />
    <Route path="/redirect" component={useFoundationFor(IncomingRedirect)} />
    <Route path="/antispam" context="antispam" component={useFoundationFor(PublicWrapper)} />
    <Route path="/terms" context="terms" component={useFoundationFor(PublicWrapper)} />
    <Route path="/privacy" context="privacy" component={useFoundationFor(PublicWrapper)} />
    <Route path="/accounts/signup" component={useFoundationFor(SignUpModal)} />
    <Route path="/accounts/login" component={useFoundationFor(LogInModal)} />
  </Route>
);

export default Routes;
