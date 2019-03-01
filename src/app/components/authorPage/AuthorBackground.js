import React, { PureComponent } from 'react';

class AuthorBackground extends PureComponent {
  render() {
    const { tab } = this.props;
    const openSection = tab === undefined || tab === 'wall';
    return (
      <div
        className={openSection ? 'author-page-background' : 'author-page-background hide-mobile'}
      >
        <img
          className="author-background-img"
          src="http://backgroundcheckall.com/wp-content/uploads/2017/12/background-img-8.jpg"
          alt=""
        />
      </div>
    );
  }
}

export default AuthorBackground;
