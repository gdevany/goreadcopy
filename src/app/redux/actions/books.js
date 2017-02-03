import { default as A } from '../const/actionTypes'
// import Readers from '../../services/readers'

export function getBooks(
  genreId = null,
  page = undefined,
  perPage = undefined,
  sort = 'popular',
  imageSize = 'average',
  landing,
) {
  return dispatch => {
    // Readers.getLandingBooks({ landing: landing.landingIs })
    // .then(response => dispatch(updateBook(response.result)))
    // .catch((error) => console.log(`Error in getBooks api call: ${error}`))

    const books = [
      {
        id: 0,
        slug: '#',
        author: 'J K Rowling',
        title: 'Harry Potter',
        imageUrl: 'example2.png'
      },
      {
        id: 1,
        slug: '#',
        author: 'David Baldacci',
        title: 'Guilty',
        imageUrl: 'example1.png'
      },
      {
        id: 2,
        slug: '#',
        author: 'Cynthia D\'Aprix',
        title: 'The Nest',
        imageUrl: 'example3.png'
      },
      {
        id: 3,
        slug: '#',
        author: 'J K Rowling',
        title: 'Harry Potter',
        imageUrl: 'example2.png'
      },
      {
        id: 4,
        slug: '#',
        author: 'David Baldacci',
        title: 'Guilty',
        imageUrl: 'example1.png'
      },
      {
        id: 5,
        slug: '#',
        author: 'Cynthia D\'Aprix',
        title: 'The Nest',
        imageUrl: 'example3.png'
      },
    ]

    dispatch(updateBooks(books))
  }
}

export function updateBooks(books) {
  return {
    type: A.GET_BOOKS,
    payload: books,
  }
}
