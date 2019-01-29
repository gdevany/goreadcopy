import React, { PureComponent } from 'react';

class AuthorTabMenu extends PureComponent {
  handleMenuList() {
    const menuList = [
      'Wall',
      'Store',
      'Videos',
      'Articles',
      'Photos',
      'Events',
      'Admin',
    ];

    return menuList.map(item => (
      <div className="author-tab-menu-item">
        {item}
      </div>
    ));
  }

  render() {
    return (
      <div className="author-tab-menu-container">
        {this.handleMenuList()}
      </div>
    );
  }
}

export default AuthorTabMenu;
