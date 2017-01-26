import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import routes from '../services/currentEnvRoutes'
import { getGenres } from '../redux/actions/genres'
import { getBooks } from '../redux/actions/books'
import {
  Toolbar,
  ToolbarGroup
} from 'material-ui/Toolbar'
import Book from './Book'

export class BookLanding extends PureComponent {
  componentWillMount = () => {
    this.props.getGenres('landing')
  }

  handleMapGenres = (genres) => {
    return genres.map((genre, index) => {
      return (
        <p className='link nav-item landing-genres' key={index}>
          <a onClick={(event) => this.handleGenreClick(event, genre.id)} >
            {genre.name}
          </a>
        </p>
      )
    })
  }

  handleGenreClick = (event, id) => {
    (event.target.text === 'Popular') ? this.props.getBooks() : this.props.getBooks(id)
  }

  render() {
    const { genres, books } = this.props
    const { bookStore } = routes

    return (
      <div>
      <Toolbar className='general-background'>
        <ToolbarGroup />
        <ToolbarGroup>
          <p className='link nav-item'>
            Shop:
          </p>
          {this.handleMapGenres(genres)}
        </ToolbarGroup>
        <ToolbarGroup>
          <a className='link' href={bookStore()}>
            Shop More
          </a>
        </ToolbarGroup>
      </Toolbar>
      <Toolbar className='general-background books-toolbar'>
        <ToolbarGroup />
        <ToolbarGroup>
          {
            books.map((book, index) => {
              return (
                <Book book={book} key={index}/>
              )
            })
          }
        </ToolbarGroup>
        <ToolbarGroup />
      </Toolbar>
      </div>
    )
  }
}

const mapStateToProps = ({ genres, books }) => {
  return {
    genres,
    books
  }
}

export default connect(mapStateToProps, { getGenres, getBooks })(BookLanding)
