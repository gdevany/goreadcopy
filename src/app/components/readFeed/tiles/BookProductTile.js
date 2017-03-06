import React, { PureComponent } from 'react'
import TileDefault from '../TileDefault'
import Rating from 'react-rating'

const name = 'JK Rowling'
const description = 'added a new Book to his Library'
const profileImage = './image/portrait3.png'
const timestamp = '3 hours ago' // TODO: Need to know how time will be sent over
const likes = {
  count: 10,
  likedByCurrentUser: false
}
const comments = {
  count: 12,
  commentedByCurrentUser: false,
  results: [{
    id: 2,
    name: 'Julia Jules',
    authorImage: '.../image/path',
    commentImage: '.../commentImage/path', // if they posted an image with their post
    timestamp: '3 minutes ago',
    content: 'sooo cool!'
  },
  {
    id: 3,
    name: 'Larry Rules',
    authorImage: '.../image/path',
    commentImage: '.../commentImage/path', // if they posted an image with their post
    timestamp: '2 hours ago',
    content: 'This is wow, just wow!',
  },
  {
    id: 5,
    name: 'Berry Shmules',
    authorImage: '.../image/path',
    commentImage: '.../commentImage/path', // if they posted an image with their post
    timestamp: '5 seconds ago',
    content: 'AMAAAAZING.',
  }
  ]
}

const content = {
  title: 'Best 5 Books in the industry',
  media: './image/bookclub.jpg',
  details: 'These are the 5 best books in the industry!'
}

class BookProductTile extends PureComponent {

  renderRating = (rating) => {
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='rating-icon' src='./image/star.svg' />}
        empty={<img className='rating-icon' src='./image/star-empty.svg' />}
      />
    )
  }

  render() {
    return (
      <TileDefault
        name={name}
        description={description}
        profileImage={profileImage}
        timestamp={timestamp}
        likes={likes}
        comments={comments}
        content={content}
      >
        <div className='book-tile-container'>
          <figure className='book-figure'>
            <img className='book-img' src='./image/example2.png' alt=''/>
          </figure>
          <div className='book-content'>
            <h2 className='book-title'>Book Title</h2>
            <h4 className='book-author'>by Ken Dunn</h4>
            <div className='book-rating-container'>
              {this.renderRating(Math.round(4.2))}
            </div>
          </div>
        </div>
        <div className='post-excerpt-container'>
          <p className='post-excerpt-pharagraph'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur dicta laudantium odio illo asperiores. Eos nesciunt
            quibusdam odio fuga nam. At rerum consequatur aliquam quasi, totam
            magni! Modi accusantium, nostrum.
            <a href='#' className='post-readmore-anchor'>
              Read more
            </a>
          </p>
        </div>
      </TileDefault>
    )
  }
}

export default BookProductTile
