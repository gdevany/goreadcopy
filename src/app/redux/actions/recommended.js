import { CURRENT_READER as A } from '../const/actionTypes'
import { Promise } from '../../services'
import CurrentReaderRecommendation from '../../services/currentReader/recommendation'

export function getRecommendation(perUserType = 1) {
  return (dispatch, getState) => {
    /**
    uncomment this code when api endpoint is set up and delete the
    recomendation const
    const chosenGenres = getState().readerData.chosenGenres

    CR_Recommendation.findRecommendation({
      genreIds: chosenGenres,
      perUserType: perUserType.count
    })
      .then(response => dispatch(updateRecommended(response.result)))
      .catch((error) => console.log(`Error in getRecommendation api call: ${error}`))
    **/

    // In this example the user would have chosen two genres,
    // Young Adult and Health, and this would be their result?
    const recommendation = [
      {
        id: 0,
        name: 'Young Adult',
        authors: [
          {
            id: 3,
            firstName: 'JK',
            lastName: 'Rowling1',
            image: './image/example1.png',
            booksWritten: ['Harry Potter1', 'Harry Potter 2'],
          },
          {
            id: 2,
            firstName: 'LM',
            lastName: 'Mowers1',
            image: './image/example1.png',
            booksWritten: ['Some Book'],
          },
          {
            id: 4,
            firstName: 'JK',
            lastName: 'Rowling2',
            image: './image/example1.png',
            booksWritten: ['Harry Potter1', 'Harry Potter 2'],
          }
        ],
        readers: [
          {
            id: 7,
            firstName: 'Dude',
            lastName: 'Awesome',
            image: './image/example1.png',
            aboutSlogan: 'Loves Harry Potter',
          },
          {
            id: 5,
            firstName: 'LM',
            lastName: 'Mowers2',
            image: './image/example1.png',
            aboutSlogan: 'Young Adult Book Lover',
          },
          {
            id: 1,
            firstName: 'JK',
            lastName: 'Rowling3',
            image: './image/example1.png',
            aboutSlogan: 'Edward for the Win + Comics all day!!',
          }
        ]
      },
      {
        id: 1,
        name: 'Health',
        authors: [
          {
            id: 6,
            firstName: 'JK',
            lastName: 'Healthing',
            image: './image/example1.png',
            booksWritten: ['Harry Plays Basketball', 'Harry Wins a Soccer Game'],
          },
          {
            id: 9,
            firstName: 'Mr',
            lastName: 'Healthy',
            image: './image/example1.png',
            booksWritten: ['Book About Health'],
          },
          {
            id: 10,
            firstName: 'JK',
            lastName: 'Healthing2',
            image: './image/example1.png',
            booksWritten: ['Harry Plays Basketball', 'Harry Wins a Soccer Game'],
          },
        ],
        readers: [
          {
            id: 8,
            firstName: 'Dude',
            lastName: 'Surfboard',
            image: './image/example1.png',
            aboutSlogan: 'Loves Surfing',
          },
          {
            id: 11,
            firstName: 'LM',
            lastName: 'Mowers3',
            image: './image/example1.png',
            aboutSlogan: 'Loves mowing lawns for exercise',
          },
          {
            id: 12,
            firstName: 'JK',
            lastName: 'Rollin',
            image: './image/example1.png',
            aboutSlogan: 'Drives to exercise',
          }
        ]
      }
    ]

    return dispatch(updateRecommended(recommendation))
  }
}

export function choseRecommendation(data, type) {
  return dispatch => {
    switch (type) {
      case 'readers':
        return CurrentReaderRecommendation.likedReaders({ readerIds: data })
          .then(response => dispatch({ type: A.CHOSE_RECOMMENDATION }))
          .catch((error) => console.log(`Error in choseRecommendation api call: ${error}`))
      case 'authors':
        return CurrentReaderRecommendation.likedAuthors({ authorIds: data })
          .then(response => dispatch({ type: A.CHOSE_RECOMMENDATION }))
          .catch((error) => console.log(`Error in choseRecommendation api call: ${error}`))
      default:
        return Promise.reject('Error in choseRecommendation')
    }
  }
}

export function updateRecommended(recommendation) {
  return {
    type: A.GET_RECOMMENDATION,
    payload: recommendation,
  }
}

export default {
  choseRecommendation,
  getRecommendation,
  updateRecommended,
}
