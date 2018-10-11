import React, { Component } from 'react';
import { stack as MobileMenu } from 'react-burger-menu';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';
import R from 'ramda';
import { ExternalRoutes as routes } from '../../../constants';
import CMSProvider from '../../cms/CMSProvider';
import FloatingSubMenu from './FloatingSubMenu';
import connectLinkBar from '../../containers/HomeNavMenuContainer';
import SearchModal from '../SearchModal';
import NavMenu from './NavMenu';

const { articles } = routes;

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
    <div className="d-none d-lg-block">
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

const hyperLink = (text, action, isLink, id, target) => (
  isLink ?
    <Link key={id} to={action}>{text}</Link> :
    <a key={id} href={action} target={target}>{text}</a>
);

const LinkBar = props => (
  <div className="navbar-links-wrapper">
    <div className="d-none d-lg-block">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="navbar-links d-flex flex-row justify-content-between">
              {
                props.MenuLinks.map(({ text, action, isLink, id, subMenu, target }) => (
                  subMenu ?
                    <div key={id} className="navbar-link-wrapper d-flex flex-column justify-content-center align-items-center">
                      { hyperLink(text, action, isLink, id, target) }
                      <FloatingSubMenu menu={subMenu} />
                    </div> :
                    hyperLink(text, action, isLink, id, target)
                ))
              }
            </div>
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
      isMobileMenuOpen: false,
      isMobileSubMenuOpen: false,
    };
  }

  onFieldChange = R.curry((field, e) => {
    this.setState({ [field]: e.target.value });
  })

  onSearchSubmit = e => {
    if (e) e.preventDefault();
    this.setState({ isSearchOpen: true });
  }

  handleMenuClick = (event) => {
    event.preventDefault();
    const { isMobileMenuOpen } = this.state;
    isMobileMenuOpen ?
      this.setState({ isMobileMenuOpen: false }) :
      this.setState({ isMobileMenuOpen: true });
  }

  handleCloseMenu = (state) => {
    const { isMobileMenuOpen } = this.state;
    !state.isOpen && isMobileMenuOpen ?
      this.setState({ isMobileMenuOpen: false }) : null;
  }

  handleSubMenuClick = () => {
    const { isMobileSubMenuOpen } = this.state;
    this.setState({ isMobileSubMenuOpen: !isMobileSubMenuOpen });
  }

  isLoggedIn = () => {
    return this.props.currentReader && this.props.currentReader.token;
  }

  ActionBar = () => (
    <div className="navbar-action-wrapper">
      <div className="d-block d-lg-none">
        <div className="navbar-action navbar-bar-spacing">
          <div className="navbar-action-icons d-flex flex-row justify-content-around align-items-center">
            {this.MobileMenu()}
            <div className="navbar-action-icon">
              <FontAwesomeIcon icon={faSearch} size='lg' onClick={this.onSearchSubmit} />
            </div>
            <Link to="/" alt="GoRead Home">
              <img className="navbar-logo" src='/image/logo.png' alt="" />
            </Link>
            <NavBarIconLink to="/shop/cart" iconProps={{ icon: faShoppingCart, size: 'lg' }} />
          </div>
        </div>
      </div>
      <div className="d-none d-lg-block">
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
                      <Link
                        to={this.isLoggedIn() ?
                          `/profile/${this.props.currentReader.slug}?action=library` :
                          '/accounts/login'
                        }
                      >
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

  MobileMenu = () => (
    <div>
      <div className="navbar-action-icon" onClick={this.handleMenuClick}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>
      <MobileMenu
        customBurgerIcon={false}
        customCrossIcon={false}
        id="mobile-menu-container"
        isOpen={this.state.isMobileMenuOpen}
        onStateChange={this.handleCloseMenu}
      >
        <div className="mobile-menu-item menu-sign" onClick={this.handleSubMenuClick}>
          Sign In / Create account
          {this.state.isMobileSubMenuOpen ? (
            <FontAwesomeIcon icon={faAngleUp} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faAngleDown} size="lg" />
          )}
        </div>
        {this.state.isMobileSubMenuOpen ? (
          <div className="submenu-sign slide-down">
            <a className="mobile-submenu-item" href="/accounts/login">
              Sign In
            </a>
            <a className="mobile-submenu-item" href="/accounts/signup">
              Create an Account
            </a>
          </div>
        ) : null}
        <a className="mobile-menu-item" href="/categories/fiction">
          Books
        </a>
        <a className="mobile-menu-item" href="/categories/fiction">
          Best Sellers
        </a>
        <a className="mobile-menu-item" href="/categories/fiction">
          New Releases
        </a>
        <a className="mobile-menu-item" href={articles}>
          Articles
        </a>
        <a className="mobile-menu-item" href="https://www.rebelpress.com/resources">
          For Authors
        </a>
        <a className="mobile-menu-item" href="/accounts/signup">
          For Readers
        </a>
        <a className="mobile-menu-item" href="/literacy">
          Buy a Book, We give a book!
        </a>
      </MobileMenu>
    </div>
  );

  render() {
    const { isSearchOpen, term, filter } = this.state;
    return (
      <div id="navbar">
        <CMSProvider page="submenus">
          {
            !this.isLoggedIn() ?
              <AuthBar /> :
              null
          }
          {
            this.isLoggedIn() ?
              <NavMenu /> :
              this.ActionBar()
          }
          <LinkBarWithData />
          <SearchModal
            modalOpen={isSearchOpen}
            handleClose={() => this.setState({ isSearchOpen: false, term: '' })}
            term={term}
            filter={filter}
            resetSearch={filter => this.setState({ term: '', filter })}
          />
        </CMSProvider>
      </div>
    );
  }
}

const mapStateToProps = ({
  currentReader,
}) => ({
  currentReader,
});

export default connect(mapStateToProps)(NavMenuV2);
