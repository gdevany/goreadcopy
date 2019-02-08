import React, { PureComponent } from 'react';
import Done from 'material-ui/svg-icons/action/done';
import BooksSection from '../profile/BooksSection';


const author = {
  img: 'https://34slpa7u66f159hfp1fhl9aur1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/generic-profile.png',
  title: 'Bob Peterson',
  fanCount: '24,316',
  isFollowing: true,
  hasFacebook: true,
  hasTwitter: true,
  hasLinkedin: true,
  hasInstagram: true,
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et ante ut nunc tempor porttitor. Quisque ac efficitur nisl. Aliquam ultrices, velit ac suscipit porttitor, nulla augue tempus quam, in sodales quam risus consectetur felis. Suspendisse imperdiet urna nec molestie pharetra. Nam mattis, velit auctor scelerisque ultrices, justo quam placerat est, a euismod erat lectus in mi. Donec imperdiet ut orci in mollis. Phasellus quis est eleifend, bibendum ex ut, semper quam. Duis vel nibh tortor. Donec venenatis nisl eu libero lacinia vehicula. Fusce porta ipsum sem, nec molestie justo sagittis vel. Donec lorem erat, ultricies quis nunc quis, sollicitudin iaculis urna. Maecenas sit amet mauris ultricies, tincidunt magna eu, hendrerit ligula. Proin iaculis ligula id ante dictum ullamcorper. Integer lobortis id odio non aliquet. Nulla maximus tellus ac facilisis viverra.',
  id: 22856,
  currentReader: true,
  tweets: [
    {
      name: 'Bob Peterson',
      img: 'https://34slpa7u66f159hfp1fhl9aur1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/generic-profile.png',
      id: '@bobpete17',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in laoreet erat. Donec at consectetur arcu.',
    },
    {
      name: 'Bob Peterson',
      img: 'https://34slpa7u66f159hfp1fhl9aur1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/generic-profile.png',
      id: '@bobpete17',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in laoreet erat. Donec at consectetur arcu.',
    },
    {
      name: 'Bob Peterson',
      img: 'https://34slpa7u66f159hfp1fhl9aur1-wpengine.netdna-ssl.com/wp-content/uploads/2016/11/generic-profile.png',
      id: '@bobpete17',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in laoreet erat. Donec at consectetur arcu.',
    },
  ],
};

const social = {
  fb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/600px-Facebook_logo_%28square%29.png',
  tw: 'https://image.flaticon.com/icons/png/512/23/23931.png',
  in: 'https://cdn1.iconfinder.com/data/icons/logotypes/32/square-linkedin-512.png',
  ig: 'https://image.flaticon.com/icons/png/512/87/87390.png',
};

class AuthorMainContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFollowingHover: false,
    };
  }

  handleFollowingHover = () => {
    const { isFollowingHover } = this.state;
    this.setState({ isFollowingHover: !isFollowingHover });
  }

  handleTweets = () => {
    console.log(author.tweets);
    return author.tweets.map((item) => (
      <div className="tweet">
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
            some functions
          </div>
        </div>
      </div>
    ));
  }

  render() {
    const { children } = this.props;
    const { isFollowingHover } = this.state;
    return (
      <div className="author-main-container">
        <div className="left-content-container">
          <div className="author-profile-image">
            <img src={author.img} alt="" />
          </div>
          <div className="author-profile-info">
            <h4 className="author-title">
              {author.title}
            </h4>
            <div className="author-social-data">
              <div className="author-fan-counter">
                Fans
                <br />
                {author.fanCount}
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
                  <img className="social-img" src={social.fb} alt="" />
                </div>
              ) : null}
              {author.hasTwitter ? (
                <div className="author-social-tw social-container">
                  <img className="social-img" src={social.tw} alt="" />
                </div>
              ) : null}
              {author.hasLinkedin ? (
                <div className="author-social-in social-container">
                  <img className="social-img" src={social.in} alt="" />
                </div>
              ) : null}
              {author.hasInstagram ? (
                <div className="author-social-ig social-container">
                  <img className="social-img" src={social.ig} alt="" />
                </div>
              ) : null}
            </div>
          </div>
          <div className="author-profile-bio">
            <div className="author-bio-title">
              Bio
            </div>
            <div className="author-bio-description">
              {author.bio}
            </div>
          </div>
          <div className="author-library">
            <div className="author-library-title">
              Books by {author.title}
            </div>
            <BooksSection
              id={author.id}
              isCurrentReader={author.currentReader}
            />
          </div>
          <div className="author-tweets">
            <div className="author-tweets-title">
              Tweets by @BobPete
            </div>
            {this.handleTweets()}
          </div>
        </div>
        <div className="right-content-container">
          {children}
        </div>
      </div>
    );
  }
}

export default AuthorMainContainer;
