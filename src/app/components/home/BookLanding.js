import React, { PureComponent } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { ExternalRoutes as routes } from '../../constants'
import { Genres, Books } from '../../redux/actions'
import Book from './Book'

const { getGenres } = Genres
const { getBooks } = Books

const styles = {
  shopSection: {
    backgroundColor: '#F9F9FC',
    padding: '0 40px 50px 40px',
    margin: '-100px auto 0',
    width: '98%',
    boxShadow: '0px 2px 30px 0px rgba(0,0,0,0.08)',
  },

  shopList: {
    float: 'left',
    paddingRight: 20,
  },

  shopUl: {
    margin: 0,
    listStyle: 'none',
  },

  shopMoreText: {
    float: 'right',
  },

  shopLinkSection: {
    paddingTop: 50,
    margin: '0 auto',
    maxWidth: 1000,
  },

  shopText: {
    color: '#979797',
  },

  bookSection: {
    marginTop: 15,
    maxWidth: 1050,
  },
}

class BookLanding extends PureComponent {
  componentWillMount = () => {
    if (R.isEmpty(this.props.books)) { this.props.getBooks({ sort: 'popular' }) }
    this.props.getGenres({ landingIs: true })
  }

  handleMapGenres = (genres) => {
    return genres.map((genre, index) => {
      return (
        <li style={styles.shopList} className='link nav-item' key={index}>
          <a onClick={(event) => this.handleGenreClick(event, genre.id)} >
            {genre.name}
          </a>
        </li>
      )
    })
  }

  handleGenreClick = (event, genreId) => {
    (event.target.text === 'Popular') ? this.props.getBooks() : this.props.getBooks({ genreId })
  }

  render() {
    const { genres, books } = this.props
    const { bookStore } = routes

    return (
      <div style={styles.shopSection}>
        <div>
          <div style={styles.shopLinkSection}>
            <div className='row'>
              <ul style={styles.shopUl}>
                <li style={styles.shopList}>
                  <p style={styles.shopText} className='nav-item'>
                    Shop:
                  </p>
                </li>
                {this.handleMapGenres(genres)}
                <li className='link nav-item' style={{ float: 'right' }}>
                  <a href={bookStore()}>
                    Shop More
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='row' style={styles.bookSection}>
          {
            books.map((book, index) => {
              return (
                <div key={index} className='small-2 columns'>
                  {<Book book={book} />}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ genres, books }) => {
  return {
    genres,
    books: books.payload
  }
}

export default connect(mapStateToProps, { getGenres, getBooks })(BookLanding)
