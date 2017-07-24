import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import { SignUpFlow } from './components/readerOnboarding'
import IncomingRedirect from './components/incomingRedirect/IncomingRedirect'
import { HomeWrapper } from './components/home'
import { Profile } from './components/profile'
import {
  BookStore,
  BookPage,
  CategoriesPage,
  CartPage,
  CheckoutPage,
  orderSuccess,
  Orders,
} from './components/store'
import { ReferralHome } from './components/referral'
import { Settings } from './components/settings'

const Routes = (
  <Route path='/' component={App}>
    <IndexRoute component={HomeWrapper} />
    <Route path='/vid' component={HomeWrapper} />
    <Route path='/profile/settings' component={Settings} />
    <Route path='/profile/:slug' component={Profile} />
    <Route path='/me/:slug' component={ReferralHome} />
    <Route path='/browse' component={BookStore} />
    <Route path='/book/:slug' component={BookPage} />
    <Route path='/categories/:slug' component={CategoriesPage} />
    <Route path='/categories/:slug/:subCategory' component={CategoriesPage} />
    <Route path='/shop/cart' component={CartPage} />
    <Route path='/shop/checkout' component={CheckoutPage} />
    <Route path='/shop/success' component={orderSuccess} />
    <Route path='/store/orders' component={Orders} />
    <Route path='/signup' component={SignUpFlow} />
    <Route path='/redirect' component={IncomingRedirect} />
  </Route>
)

export default Routes
