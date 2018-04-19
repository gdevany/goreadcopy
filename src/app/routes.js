import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
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
import { Settings } from './components/settings';
import { Auth } from './services';

const isUserLoggedIn = Auth.currentUserExists();

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute isUserLoggedIn={isUserLoggedIn} component={HomeWrapper} />
    <Route path="/vid" isUserLoggedIn={isUserLoggedIn} component={HomeWrapper} />
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
    <Route path="/signup" component={SignUpFlow} />
    <Route path="/redirect" component={IncomingRedirect} />
    <Route path="/antispam" context="antispam" component={PublicWrapper} />
    <Route path="/terms" context="terms" component={PublicWrapper} />
    <Route path="/privacy" context="privacy" component={PublicWrapper} />
    <Route path="/accounts/signup" component={SignUpModal} />
    <Route path="/accounts/login" component={LogInModal} />
  </Route>
);

export default Routes;
