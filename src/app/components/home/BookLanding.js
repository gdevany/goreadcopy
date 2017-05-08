import React, { PureComponent } from 'react'
import R from 'ramda'
import S from 'underscore.string.fp'
import Radium from 'radium'
import { connect } from 'react-redux'
import { ExternalRoutes as routes } from '../../constants'
import { Genres, Books } from '../../redux/actions'
import { Book } from '../common'
import { Colors, Breakpoints } from '../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const { getHomeGenres } = Genres
const { getBooks } = Books

const styles = {
  shopSection: {
    borderRadius: 5,
    backgroundColor: '#F9F9FC',
    padding: '0 40px 50px 40px',
    position: 'relative',
    margin: '-100px auto 0',
    maxWidth: 1150,
    width: '98%',
    boxShadow: '0px 2px 30px 0px rgba(0,0,0,0.2)',
    zIndex: 9,

    [Breakpoints.mobile]: {
      padding: '0 20px 50px 20px',
      width: '92%',
    },
  },

  shopList: {
    fontSize: 16,
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
    fontSize: 16,
    color: Colors.grey,
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
  genreSelected: {
    fontWeight: '600',
    color: Colors.blue,
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class BookLanding extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      genreSelected: 'Popular',
      genreClicked: false,
    }
  }

  componentWillMount = () => {
    const { books, genres, getBooks, getHomeGenres } = this.props
    if (R.isEmpty(books)) { getBooks() }
    if (R.isEmpty(genres)) { getHomeGenres() }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.books !== this.props.books) {
      this.setState({
        genreClicked: true,
      })
    }
  }

  handleMapGenres = (genres) => {
    return R.take(4, genres.map((genre, index) => {
      return (
        <li style={styles.shopList} className='link shop-nav-item' key={index}>
          <a
            onClick={(event) => this.handleGenreClick(event, genre.id, genre.name)}
            style={this.state.genreSelected === genre.name ? styles.genreSelected : null}
          >
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
      result = R.take(2, books.map((book, index) => {
        return (
          <div key={index} className='small-6 columns'>
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

  handleGenreClick = (event, genreId, genreName) => {
    let genreSelected

    if (event.target.text === 'Popular') {
      this.props.getBooks()
      genreSelected = 'Popular'
    } else {
      this.props.getBooks({ genreIds: [genreId] })
      genreSelected = genreName
    }
    this.setState({
      genreSelected,
      genreClicked: false,
    })
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
              <a
                style={styles.shopMoreMobileText}
                className='link shop-nav-item'
                href={bookStore()}
              >
                Shop more
              </a>
            </div>

            <div style={styles.shopContainer} className='row'>
              <div style={styles.shopTitleContainer} className='small-1 columns'>
                <span style={styles.shopText} className='shop-nav-item'>
                Shop:
                </span>
              </div>

              <div className='small-10 columns'>
                <ul style={styles.shopUl}>
                  <li style={styles.shopList} />
                  <li style={styles.shopList} className='link shop-nav-item' >
                    <a
                      onClick={(event) => this.handleGenreClick(event, 'Popular')}
                      style={this.state.genreSelected === 'Popular' ? styles.genreSelected : null}
                      className='shop-genre-links'
                    >
                      Popular
                    </a>
                  </li>
                  {this.handleMapGenres(genres)}
                </ul>
              </div>

              <div style={styles.shopMoreContainer} className='small-1 columns'>
                <a style={styles.shopMoreText} className='link shop-nav-item' href={bookStore()}>
                  Shop more
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='row slide-up' style={styles.bookSection}>
          {books && this.state.genreClicked ? this.handleMapBooks(books) : (
            <div className='small-12 center-text columns'>
              <RefreshIndicator
                size={50}
                left={0}
                top={0}
                loadingColor={Colors.blue}
                status='loading'
                style={styles.refresh}
              />
            </div>
          )}
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

export default connect(mapStateToProps, { getHomeGenres, getBooks })(Radium(BookLanding))
