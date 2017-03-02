import { BOOKS as A } from '../const/actionTypes'
import { Deserialization } from '../../services'
import { Books } from '../../services/api'
import { Promise } from '../../services'
import CurrentReaderRecommendation from '../../services/api/currentReader/recommendation'
import { updateCurrentReaderRecommendation } from './currentReader'

const { fromPaginated } = Deserialization

export function getBooks(params) {
  return (dispatch, getState) => {
    dispatch({ type: A.GET_BOOKS })

    return Books.getBooks(params)
      .then(res => dispatch(getBooksSuccess(fromPaginated(res))))
      .catch((err) => console.log(`Error in getBooks api call: ${err}`))
  }
}

export function getBookRecommendations() {
  return dispatch => {
    //TODO: implement API endpoint here
    const books = [
      {
        id: 12,
        title: 'Harry Potter',
        imageUrl: './image/example2.png',
        link: 'www.goread.com',
        rating: {
          average: 5
        },
        authors: [
          {
            id: 10,
            firstName: 'JK',
            lastName: 'Rowling',
          }
        ]
      },
      {
        id: 2,
        title: 'Guilty',
        imageUrl: './image/example1.png',
        link: 'www.goread.com',
        rating: {
          average: 3
        },
        authors: [
          {
            id: 5,
            firstName: 'David',
            lastName: 'Baldacci',
          }
        ]
      },
      {
        id: 7,
        title: 'The Nest',
        imageUrl: './image/example3.png',
        link: 'www.goread.com',
        rating: {
          average: 4
        },
        authors: [
          {
            id: 1,
            firstName: 'Some',
            lastName: 'Rowling',
          }
        ]
      },
      {
        id: 3,
        title: 'Harry Potter',
        imageUrl: './image/example2.png',
        link: 'www.goread.com',
        rating: {
          average: 5
        },
        authors: [
          {
            id: 15,
            firstName: 'JK',
            lastName: 'Rowling',
          }
        ]
      },
      {
        id: 1,
        title: 'Guilty',
        imageUrl: './image/example1.png',
        link: 'www.goread.com',
        rating: {
          average: 3
        },
        authors: [
          {
            id: 19,
            firstName: 'David',
            lastName: 'Baldacci',
          }
        ]
      },
      {
        id: 8,
        title: 'The Nest',
        imageUrl: './image/example3.png',
        link: 'www.goread.com',
        rating: {
          average: 4
        },
        authors: [
          {
            id: 30,
            firstName: 'Some',
            lastName: 'Rowling',
          }
        ]
      },
    ]

    return Promise.resolve(dispatch(updateCurrentReaderRecommendation({ books })))
      .catch(err => console.log(`Error in getBookRecommendations ${err}`))

  }
}

export function getBookClubRecommendations(amount) {
  return dispatch => {
    CurrentReaderRecommendation.getBookClubRecommenation({ perPage: amount })
      .then(res => dispatch(updateCurrentReaderRecommendation({ bookClubs: res.data.results })))
      .catch(err => console.log(`Error in getBookClubRecommenation: ${err}`))
  }
}

export function getBooksSuccess(books) {
  return {
    type: A.GET_BOOKS_SUCCESS,
    payload: books,
  }
}

export default {
  getBooks,
  getBooksSuccess,
  getBookRecommendations,
  getBookClubRecommendations,
}
