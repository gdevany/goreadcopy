import React, { Component } from 'react';
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
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import { SoldBookCounter } from '../';
import FloatingSubMenu from './FloatingSubMenu';
import connectLinkBar from '../../containers/HomeNavMenuContainer';
import SearchModal from '../SearchModal';
import R from 'ramda';

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

const hyperLink = (text, action, isLink, id) => (
  isLink ?
    <Link key={id} to={action}>{text}</Link> :
    <a key={id} href={action}>{text}</a>
);

const LinkBar = props => (
  <div className="navbar-links-wrapper">
    <div className="d-none d-sm-block">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="navbar-links d-flex flex-row justify-content-between">
              {
                props.MenuLinks.map(({ text, action, isLink, id, subMenu }) => (
                  subMenu ?
                    <div key={id} className="navbar-link-wrapper d-flex flex-column justify-content-center align-items-center">
                      { hyperLink(text, action, isLink, id) }
                      <FloatingSubMenu menu={subMenu} />
                    </div> :
                    hyperLink(text, action, isLink, id)
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

const LinkBarWithData = connectLinkBar(LinkBar);

export class NavMenuV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchOpen: false,
      term: '',
      filter: 'Book',
    };
  }

  onFieldChange = R.curry((field, e) => {
    this.setState({ [field]: e.target.value });
  })

  onSearchSubmit = e => {
    if (e) e.preventDefault();
    this.setState({ isSearchOpen: true });
  }

  ActionBar = () => (
    <div className="navbar-action-wrapper">
      <div className="d-block d-sm-none">
        <div className="navbar-action navbar-bar-spacing">
          <div className="navbar-action-icons d-flex flex-row justify-content-around align-items-center">
            <div className="navbar-action-icon">
              <FontAwesomeIcon icon={faBars} size='lg' />
            </div>
            <div className="navbar-action-icon">
              <FontAwesomeIcon icon={faSearch} size='lg' onClick={this.onSearchSubmit} />
            </div>
            <Link to='/' alt="GoRead Home">
              <img className="navbar-logo" src='/image/logo.png' />
            </Link>
            <NavBarIconLink to="/shop/cart" iconProps={{ icon: faShoppingCart, size: 'lg' }} />
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
                <div className="nav-item-group d-flex flex-row justify-content-end align-items-center flex-grow-1">
                  <div className="navbar-action-search flex-grow-1">
                    <form onSubmit={this.onSearchSubmit}>
                      <InputGroup>
                        <Input
                          name="term"
                          placeholder="Enter your search term... "
                          value={this.state.term}
                          onChange={this.onFieldChange('term')}
                        />
                        <InputGroupAddon addonType="append">
                          <select
                            name="filter"
                            className="custom-select"
                            value={this.state.filter}
                            onChange={this.onFieldChange('filter')}
                          >
                            <option value="Book" defaultValue>Books</option>
                            <option value="Reader">Readers</option>
                            <option value="Author">Authors</option>
                            <option value="Publisher">Publishers</option>
                          </select>
                        </InputGroupAddon>
                        <InputGroupAddon addonType="append">
                          <Button color="secondary" onClick={this.onSearchSubmit} >
                            <FontAwesomeIcon icon={faSearch} />
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </form>
                  </div>
                  <div className="navbar-action-icons d-flex flex-row justify-content-end align-items-center">
                    <NavBarIconLink to="/shop/cart" iconProps={{ icon: faShoppingCart, size: 'lg' }} />
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

  render() {
    const { isSearchOpen, term, filter } = this.state;
    return (
      <div id="navbar">
        <AuthBar />
        { this.ActionBar() }
        <LinkBarWithData />
        <NotificationBar />
        <SearchModal
          modalOpen={isSearchOpen}
          handleClose={() => this.setState({ isSearchOpen: false, term: '' })}
          term={term}
          filter={filter}
          resetSearch={(filter) => this.setState({ term: '', filter })}
        />
      </div>
    );
  }
}

export default NavMenuV2;
