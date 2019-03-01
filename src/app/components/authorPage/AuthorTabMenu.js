import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Popover, Menu, MenuItem } from 'material-ui';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';

class AuthorTabMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  handleToggle = (event) => {
    const { open } = this.state;
    this.setState({
      open: !open,
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMenuList = () => {
    const { ownPage } = this.props;
    const menuList = [
      'Wall',
      'Store',
      'Videos',
      'Articles',
      'Photos',
      'Events',
    ];
    ownPage ? menuList.push('Admin') : menuList.push('Contact');
    const menuItems = menuList.map(item => (
      <Link
        className={this.handleSelectedTab(item) ? 'author-tab-menu-item highlighted' : 'author-tab-menu-item'}
        to={`/author/testing/${item.toLowerCase()}`}
        key={`id${item}`}
      >
        {item}
      </Link>
    ));

    return (
      <div className="author-tab-menu">
        {menuItems}
      </div>
    );
  }

  handleSelectedTab = (currentTab) => {
    const { tab } = this.props;
    const selectedTab = tab ? tab : 'wall';
    return selectedTab === currentTab.toLowerCase();
  }

  handleMobileMenuList = () => {
    const { open, anchorEl } = this.state;
    const { name, ownPage } = this.props;
    const menuList = [
      'Wall',
      'Store',
      'Videos',
      'Articles',
      'Photos',
      'Events',
    ];
    ownPage ? menuList.push('Admin') : menuList.push('Contact');
    const menuItems = menuList.map(item => (
      <Link
        className="author-tab-redirection"
        to={`/author/testing/${item.toLowerCase()}`}
        key={`id${item}`}
      >
        <MenuItem className="author-tab-menu-item" onClick={this.handleClose}>
          {item}
        </MenuItem>
      </Link>
    ));

    return (
      <div className="author-tab-mobile-container">
        <div
          className="author-tab-menu-mobile"
          onClick={this.handleToggle}
        >
          {name}
          {open ? (
            <KeyboardArrowUp />
          ) : (
            <KeyboardArrowDown />
          )}
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          className="author-mobile-menu"
          onRequestClose={this.handleClose}
        >
          <Menu>
            {menuItems}
          </Menu>
        </Popover>
      </div>
    );
  }

  render() {
    return (
      <div className="author-tab-menu-container">
        {this.handleMenuList()}
        {this.handleMobileMenuList()}
      </div>
    );
  }
}

export default AuthorTabMenu;
