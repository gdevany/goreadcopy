import React, { PureComponent } from 'react';
import Done from 'material-ui/svg-icons/action/done';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faRetweet, faShare } from '@fortawesome/fontawesome-free-solid/';
import { faStar } from '@fortawesome/fontawesome-free-regular';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import BooksSection from '../profile/BooksSection';

class AuthorMainContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFollowingHover: false,
      openBio: false,
      openBooks: false,
    };
  }

  handleFollowingHover = () => {
    const { isFollowingHover } = this.state;
    this.setState({ isFollowingHover: !isFollowingHover });
  }

  handleSvgIcon = (icon) => {
    let result;
    switch (icon) {
      case 'fb':
        result = (
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" className="svg-inline--fa fa-facebook-f fa-w-9" role="img" viewBox="0 0 264 512"><path fill="currentColor" d="M215.8 85H264V3.6C255.7 2.5 227.1 0 193.8 0 124.3 0 76.7 42.4 76.7 120.3V192H0v91h76.7v229h94V283h73.6l11.7-91h-85.3v-62.7c0-26.3 7.3-44.3 45.1-44.3z" /></svg>
        );
        break;
      case 'tw':
        result = (
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg>
        );
        break;
      case 'in':
        result = (
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" className="svg-inline--fa fa-linkedin-in fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM448 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448h-.1z" /></svg>
        );
        break;
      case 'ig':
        result = (
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" className="svg-inline--fa fa-instagram fa-w-14" role="img" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
        );
        break;
      default:
        result = null;
    }
    return result;
  }

  handleProfileImage = (author, openSection) => {
    return (
      <div
        className={openSection ? 'author-profile-image' : 'author-profile-image hide-mobile'}
      >
        <img src={author.img} alt="" />
      </div>
    );
  }

  handleProfileInfo = (author, openSection) => {
    const { isFollowingHover } = this.state;
    return (
      <div
        className={openSection ? 'author-profile-info' : 'author-profile-info hide-mobile'}
      >
        <h4 className="author-title">
          {author.title}
        </h4>
        <div className="author-social-data">
          <div className="author-fan-counter">
            Fans
            <br />
            <span className="author-followers">
              {author.fanCount}
            </span>
          </div>
          {author.isFollowing ? (
            <div className="author-following">
              <div
                className={isFollowingHover ? 'follow-btn-on' : 'follow-btn-off'}
                onMouseEnter={this.handleFollowingHover}
                onMouseLeave={this.handleFollowingHover}
              >
                {isFollowingHover ? (
                  <div className="following-items">
                    UnFollow
                  </div>
                ) : (
                  <div className="following-items">
                    <Done className="done-icon" />
                    Following
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="author-not-following">
              Follow
            </div>
          )}
        </div>
        <div className="author-divider" />
        <div className="author-social-media-container">
          <div className="author-social-title">
            Follow
          </div>
          {author.hasFacebook ? (
            <div className="author-social-fb social-container">
              <div className="social-img">
                {this.handleSvgIcon('fb')}
              </div>
            </div>
          ) : null}
          {author.hasTwitter ? (
            <div className="author-social-tw social-container">
              <div className="social-img">
                {this.handleSvgIcon('tw')}
              </div>
            </div>
          ) : null}
          {author.hasLinkedin ? (
            <div className="author-social-in social-container">
              <div className="social-img">
                {this.handleSvgIcon('in')}
              </div>
            </div>
          ) : null}
          {author.hasInstagram ? (
            <div className="author-social-ig social-container">
              <div className="social-img">
                {this.handleSvgIcon('ig')}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  handleProfileBio = (author, openSection) => {
    const { openBio } = this.state;
    return (
      <div
        className={openSection ? 'author-profile-bio' : 'author-profile-bio hide-mobile'}
      >
        <div className="author-bio-title">
          Bio
        </div>
        <div className="author-bio-description">
          {author.bio}
        </div>
        <div className="author-bio-title-mobile" onClick={this.handleBioToggle}>
          Bio
          {openBio ? (
            <KeyboardArrowUp />
          ) : (
            <KeyboardArrowDown />
          )}
        </div>
        {openBio ? (
          <div className="author-bio-description-mobile">
            {author.bio}
          </div>
        ) : null}
      </div>
    );
  }

  handleBioToggle = () => {
    const { openBio } = this.state;
    this.setState({
      openBio: !openBio,
    });
  }

  handleAuthorLibrary = (author, openSection) => {
    const { openBooks } = this.state;
    const booksSection = (
      <BooksSection
        id={author.id}
        isCurrentReader={author.currentReader}
      />
    );
    return (
      <div
        className={openSection ? 'author-library' : 'author-library hide-mobile'}
      >
        <div className="author-library-title">
          Books by {author.title}
        </div>
        <div className="author-books">
          {booksSection}
        </div>
        <div className="author-library-title-mobile" onClick={this.handleBooksToogle}>
          Books by {author.title}
          {openBooks ? (
            <KeyboardArrowUp />
          ) : (
            <KeyboardArrowDown />
          )}
        </div>
        <div
          className={openBooks ? 'author-books-mobile' : 'author-books-mobile not-visible'}
        >
          {booksSection}
        </div>
      </div>
    );
  }

  handleBooksToogle = () => {
    const { openBooks } = this.state;
    this.setState({
      openBooks: !openBooks,
    })
  }

  handleAuthorTweets = (openSection) => {
    return (
      <div
        className={openSection ? 'author-tweets' : 'author-tweets hide-mobile' }
      >
        <div className="author-tweets-title">
          Tweets by @BobPete
        </div>
        {this.handleTweets()}
      </div>
    );
  }

  handleTweets = () => {
    const { author } = this.props;
    return author.tweets.map((item) => (
      <div className="tweet" key={`${item.tweet_id}`}>
        <div className="tweet-img-container">
          <img className="tweet-img" src={item.img} alt="" />
        </div>
        <div className="tweet-info-container">
          <div className="tweet-name">
            {item.name}
            <span className="tweet-id">
              {item.id}
            </span>
          </div>
          <div className="tweet-description">
            {item.content}
          </div>
          <div className="tweet-functions">
            <FontAwesomeIcon icon={faRetweet} />
            <FontAwesomeIcon icon={faShare} />
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { children, author, tab } = this.props;
    const openSection = tab === undefined || tab === 'wall';
    console.log(openSection)
    return (
      <div className="author-main-container">
        <div className="left-content-container">
          {this.handleProfileImage(author, openSection)}
          {this.handleProfileInfo(author, openSection)}
          {this.handleProfileBio(author, openSection)}
          {this.handleAuthorLibrary(author, openSection)}
          {this.handleAuthorTweets(openSection)}
        </div>
        <div className="right-content-container">
          {children}
        </div>
      </div>
    );
  }
}

export default AuthorMainContainer;
