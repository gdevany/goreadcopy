import React, { PureComponent } from 'react'
import R from 'ramda'
import S from 'underscore.string.fp'
import Radium from 'radium'
import { connect } from 'react-redux'
import { ExternalRoutes as routes } from '../../constants'
import { Genres, Books } from '../../redux/actions'
import Book from './Book'
import { Colors, Breakpoints } from '../../constants/style'

const { getGenres } = Genres
const { getBooks } = Books

const styles = {
  shopSection: {
    backgroundColor: '#F9F9FC',
    padding: '0 40px 50px 40px',
    margin: '-100px auto 0',
    maxWidth: 1150,
    width: '98%',
    boxShadow: '0px 2px 30px 0px rgba(0,0,0,0.08)',

    [Breakpoints.mobile]: {
      padding: '0 20px 50px 20px',
      width: '92%',
    },
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
    color: Colors.blue,
  },

  shopMoreMobileText: {
    color: Colors.blue,
    float: 'right',
    fontWeight: 300,
    marginRight: 10,
  },

  shopMoreContainer: {
    padding: 0,
  },

  shopLinkSection: {
    paddingTop: 50,
    margin: '0 auto',
    maxWidth: 1000,
    [Breakpoints.mobile]: {
      paddingTop: 30,
    },
  },

  shopText: {
    color: '#979797',
  },

  bookSection: {
    marginTop: 35,
    maxWidth: 1050,
    [Breakpoints.mobile]: {
      maxWidth: 640,
    }
  },

  shopContainer: {
    [Breakpoints.mobile]: {
      display: 'none',
    },
  },

  mobileShopTitle: {
    display: 'none',

    [Breakpoints.mobile]: {
      display: 'inline',
      fontWeight: 700,
      marginLeft: 10,
    },
  },
}

class BookLanding extends PureComponent {
  componentWillMount = () => {
    const { books, genres, getBooks, getGenres } = this.props
    if (R.isEmpty(books)) { getBooks() }
    if (R.isEmpty(genres)) { getGenres() }
  }

  handleMapGenres = (genres) => {
    return R.take(8, genres.map((genre, index) => {
      return (
        <li style={styles.shopList} className='link nav-item' key={index}>
          <a onClick={(event) => this.handleGenreClick(event, genre.id)} >
            {S.titleize(genre.name)}
          </a>
        </li>
      )
    }))
  }

  handleMapBooks = (books) => {
    const deviceType = this.checkScreenSize()
    let result = []
    if (deviceType === 'phone') {
      result = R.take(3, books.map((book, index) => {
        return (
          <div key={index} className='small-4 columns'>
            {<Book book={book} />}
          </div>
        )
      }))
    } else if (deviceType === 'laptop') {
      result = R.take(6, books.map((book, index) => {
        return (
          <div key={index} className='small-2 columns'>
            {<Book book={book} />}
          </div>
        )
      }))
    }

    return result
  }

  handleGenreClick = (event, genreId) => {
    (event.target.text === 'Popular') ? this.props.getBooks() :
      this.props.getBooks({ genreIds: genreId })
  }

  checkScreenSize = () => {
    return window.screen.width > 680 ? 'laptop' : 'phone'
  }

  render() {
    const { genres, books } = this.props
    const { bookStore } = routes

    return (
      <div style={styles.shopSection}>
        <div>
          <div style={styles.shopLinkSection}>
            <div style={styles.mobileShopTitle}>
              <a>Shop popular titles</a>
              <a style={styles.shopMoreMobileText} className='link nav-item' href={bookStore()}>
                Shop more
              </a>
            </div>

            <div style={styles.shopContainer} className='row'>
              <div style={styles.shopTitleContainer} className='small-1 columns'>
                <span style={styles.shopText} className='nav-item'>
                Shop:
                </span>
              </div>

              <div className='small-10 columns'>
                <ul style={styles.shopUl}>
                  <li style={styles.shopList} />
                  <li style={styles.shopList} className='link nav-item' >
                    <a onClick={(event) => this.handleGenreClick(event, 'Popular')} >
                      Popular
                    </a>
                  </li>
                  {this.handleMapGenres(genres)}
                </ul>
              </div>

              <div style={styles.shopMoreContainer} className='small-1 columns'>
                <a style={styles.shopMoreText} className='link nav-item' href={bookStore()}>
                  Shop more
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='row' style={styles.bookSection}>
          {this.handleMapBooks(books)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ genres, books }) => {
  return {
    genres,
    books: books.payload,
  }
}

export default connect(mapStateToProps, { getGenres, getBooks })(Radium(BookLanding))
