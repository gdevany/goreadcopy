// import axios from 'axios'
//import base from '../../services/base'
import A from '../const/actionTypes'

//const { backendUrl, apiUrl, appUrl } = base
export function getBooks(
  genreId = null,
  page = undefined,
  perPage = undefined,
  sort = 'popular',
  imageSize = 'average'
) {
  return dispatch => {
    /* example url until endpoint is finalized
    axios.get(apiUrl('books', { landing: true }))
      .then(response => {
        dispatch(updateBooks(response.results)))
      }.catch(error => console.log(error))
    */

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
      {
        id: 6,
        slug: '#',
        author: 'J K Rowling',
        title: 'Harry Potter',
        imageUrl: 'example2.png'
      },
    ]

    dispatch(updateBooks(books))
  }
}

export function updateBooks(books) {
  return {
    type: A.GET_BOOKS,
    books
  }
}
