import React, { PropTypes } from 'react'

const MeetAuthor = ({ profilePic, description, followers, books, fullname, url }) => {

  const truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  return (
    <div className='row'>
      <div className='large-12 columns bookpage-meet-author-main-container'>
        <h3 className='bookpage-meet-author-title'>Meet the Author</h3>
        <section className='bookpage-meet-author-container'>
          <div className='bookpage-meet-author-content'>
            <figure className='bookpage-meet-author-content-figure'>
              <img src={profilePic}/>
            </figure>
            <div className='bookpage-meet-author-content-section'>
              <h4>{fullname}</h4>
              <div className='bookpage-meet-author-numbers-container'>
                <div className='bookpage-meet-author-numbers-section'>
                  <span className='bookpage-meet-author-numbers-title'>
                    Followers
                  </span>
                  <span className='bookpage-meet-author-numbers'>
                    {followers.toLocaleString()}
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
          <div className='bookpage-meet-author-description-container'>
            <p className='bookpage-meet-author-description'>
              {description ? truncInfo(description, 500) : null}
              {/*<a className='bookpage-meet-author-description-readmore'>*/}
                {/*See more*/}
              {/*</a>*/}
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
MeetAuthor.propTypes = {
  profilePic: PropTypes.string,
  description: PropTypes.string,
  followers: PropTypes.number,
  books: PropTypes.number,
  fullname: PropTypes.string,
  url: PropTypes.string,
}

export default MeetAuthor
