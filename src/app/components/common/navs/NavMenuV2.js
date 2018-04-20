import React from 'react';
import { Link } from 'react-router';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  Input,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import { SoldBookCounter } from '../';

const LinkButton = ({ text, to }) => (
  <Link to={to}>
    <div className="navbar-auth-link d-flex justify-content-center align-items-center">
      {text}
    </div>
  </Link>
);

const NavBarIconLink = ({ to, iconProps }) => (
  <div className="navbar-action-icon">
    <Link to={to}>
      <FontAwesomeIcon {...iconProps} />
    </Link>
  </div>
);

const AuthBar = props => (
  <div className="navbar-auth-wrapper">
    <div className="d-none d-sm-block">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="navbar-auth navbar-bar-spacing d-flex align-items-center">
              <div className="nav-item mr-auto">
                <span>Join and Get Your Next Order Shipped For Free!</span>
              </div>
              <div className="nav-item d-flex flex-row">
                <LinkButton text="Sign Up" to="/accounts/signup" />
                <LinkButton text="Login" to="/accounts/login" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ActionBar = props => (
  <div className="navbar-action-wrapper">
    <div className="d-block d-sm-none">
      <div className="navbar-action navbar-bar-spacing">
        <div className="navbar-action-icons d-flex flex-row justify-content-around align-items-center">
          <NavBarIconLink to="#" iconProps={{ icon: faBars, size: 'lg' }} />
          <NavBarIconLink to="#" iconProps={{ icon: faSearch, size: 'lg' }} />
          <Link to='/' alt="GoRead Home">
            <img className="navbar-logo" src='/image/logo.png' />
          </Link>
          <NavBarIconLink to="#" iconProps={{ icon: faShoppingCart, size: 'lg' }} />
          <NavBarIconLink to="#" iconProps={{ icon: faHeart, size: 'lg' }} />
        </div>
      </div>
    </div>
    <div className="d-none d-sm-block">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="navbar-action navbar-bar-spacing d-flex flex-row justify-content-start">
              <div className="nav-item-group mr-auto d-flex flex-row justify-content-start align-items-center">
                <div className="nav-item">
                  <Link to="/" alt="GoRead Home">
                    <img className="navbar-logo" src="/image/logo.png" />
                  </Link>
                </div>
              </div>
              <div className="nav-item-group d-flex flex-row justify-content-end align-items-center">
                <div className="navbar-action-search">
                  <InputGroup>
                    <Input placeholder="Enter your search term... " />
                    <InputGroupAddon addonType="append">
                      <select className="custom-select">
                        <option value="0" defaultValue>All products</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </select>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                      <Button color="secondary">
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <div className="navbar-action-icons d-flex flex-row justify-content-end align-items-center">
                  <NavBarIconLink to="#" iconProps={{ icon: faShoppingCart, size: 'lg' }} />
                  <NavBarIconLink to="#" iconProps={{ icon: faHeart, size: 'lg' }} />
                  <div className="navbar-action-icon d-flex flex-column justify-content-center">
                    <Link to="#">
                      My Book Collection
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MenuLinks = [
  { id: 0, text: 'Books', action: '#', isLink: false },
  { id: 1, text: 'Best Sellers', action: '#', isLink: false },
  { id: 2, text: 'New Releases', action: '#', isLink: false },
  { id: 3, text: 'Articles', action: '#', isLink: false },
  { id: 4, text: 'For Authors', action: '#', isLink: false },
  { id: 5, text: 'For Readers', action: '#', isLink: false },
  { id: 6, text: 'Buy a Book, Give a Book!', action: '#', isLink: false },
];

const LinkBar = props => (
  <div className="navbar-links-wrapper">
    <div className="d-none d-sm-block">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="navbar-links navbar-bar-spacing d-flex flex-row justify-content-between">
              {
                MenuLinks.map(({ text, action, isLink, id }) => (
                  isLink ?
                    <Link key={id} to={action}>{text}</Link> :
                    <a key={id} href={action}>{text}</a>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Notifications = props => (
  <div className="navbar-notifications">
    <div className="navbar-notification bar children-literacy d-flex flex-row justify-content-center">
      <span>
        { 'Total Books Given To Kids: ' }
        <SoldBookCounter useDefaultColor={false} />
      </span>
    </div>
  </div>
);

const NotificationBar = props => (
  <div className="navbar-notifications-wrapper">
    <div className="d-block d-sm-none">
      <Notifications />
    </div>
    <div className="d-none d-sm-block">
      <div className="container">
        <div className="row">
          <div className="col">
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NavMenuV2 = props => (
  <div id="navbar">
    <AuthBar />
    <ActionBar />
    <LinkBar />
    <NotificationBar />
  </div>
);

export default NavMenuV2;
