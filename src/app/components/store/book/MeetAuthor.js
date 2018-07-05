import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Numbers } from '../../../utils';

const { parseIntToLocale } = Numbers;

class MeetAuthor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDescriptionOpen: false,
    };
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  truncInfo = (text, limit) => {
    const { isDescriptionOpen } = this.state;
    console.log(isDescriptionOpen)
    return !text.length >= limit || isDescriptionOpen ? text : `${text.slice(0, limit)}...`
  }

  toggleDescription = () => {
    const { isDescriptionOpen } = this.state;
    this.setState({
      isDescriptionOpen: !isDescriptionOpen,
    });
  }

  render() {
    const {
      profilePic,
      description,
      followers,
      books,
      fullname,
      url,
    } = this.props;
    const { isDescriptionOpen } = this.state;
    return (
      <div className='columns bookpage-meet-author-main-container'>
        <section className='bookpage-meet-author-container'>
          <h3 className='bookpage-meet-author-title'>Meet the Author</h3>
          <div className='bookpage-meet-author-content'>
            <figure className='bookpage-meet-author-content-figure'>
              <img src={profilePic} />
            </figure>
            <div className='bookpage-meet-author-content-section'>
              <h4>{fullname}</h4>
              <div className='bookpage-meet-author-numbers-container'>
                <div className='bookpage-meet-author-numbers-section'>
                  <span className='bookpage-meet-author-numbers-title'>
                    Followers
                  </span>
                  <span className='bookpage-meet-author-numbers'>
                    {parseIntToLocale(followers)}
                  </span>
                </div>
                <div className='bookpage-meet-author-numbers-section'>
                  <span className='bookpage-meet-author-numbers-title'>
                    Books
                  </span>
                  <span className='bookpage-meet-author-numbers'>
                    {books}
                  </span>
                </div>
              </div>
              <div className='bookpage-meet-author-anchor-container'>
                <a href={url} className='bookpage-meet-author-anchor'>
                  See Profile
                </a>
              </div>
            </div>
          </div>
        </section>
        {description ? (
          <section className="bookpage-meet-author-description-container">
            <h3 className="bookpage-meet-author-title">
              Author Bio
            </h3>
            <p className="bookpage-meet-author-description">
              {description ? this.truncInfo(description, 500) : null}
              <a
                className="bookpage-meet-author-description-readmore"
                onClick={this.toggleDescription}
              >
                {isDescriptionOpen ? ' See Less' : ' See More'}
              </a>
            </p>
          </section>
        ) : null}
      </div>
    );
  }
}

MeetAuthor.defaultProps = {
  profilePic: null,
  description: null,
  followers: null,
  books: null,
  fullname: null,
  url: null,
};

MeetAuthor.propTypes = {
  profilePic: PropTypes.string,
  description: PropTypes.string,
  followers: PropTypes.number,
  books: PropTypes.number,
  fullname: PropTypes.string,
  url: PropTypes.string,
};

export default MeetAuthor;
