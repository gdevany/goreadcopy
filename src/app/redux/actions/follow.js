import { CURRENT_READER as A } from '../const/actionTypes'
import { Promise } from '../../services'

export function getFollowers() {
  return dispatch => {
    const data = {
      count: 12,
      result: [
        {
          id: 0,
          title: 'Michael Pineapple',
          image: './image/portrait2.png',
          description: 'Books! Books Boooooks!!!'
        },
        {
          id: 6,
          title: 'James the Mermaid',
          image: './image/portrait3.png',
          description: 'WOOOOO! BOOOKS!'
        },
        {
          id: 2,
          title: 'Michael Pineapple',
          image: './image/portrait.jpg',
          description: 'Big Book Fan...Oooh yeaah'
        },
        {
          id: 7,
          title: 'James the Mermaid',
          image: './image/portrait3.png',
          description: 'Books! Books Boooooks!!!'
        },
        {
          id: 15,
          title: 'Michael Pineapple',
          image: './image/portrait2.png',
          description: 'WOOOOO! BOOOKS!'
        },
        {
          id: 4,
          title: 'Michael Pineapple',
          image: './image/portrait.jpg',
          description: 'Big Book Fan...Oooh yeaah'
        },
        {
          id: 3,
          title: 'James the Mermaid',
          image: './image/portrait2.png',
          description: 'Books! Books Boooooks!!!'
        },
        {
          id: 8,
          title: 'Michael Pineapple',
          image: './image/portrait3.png',
          description: 'Books! Books Boooooks!!!'
        },
        {
          id: 5,
          title: 'Michael Pineapple',
          image: './image/portrait2.png',
          description: 'WOOOOO! BOOOKS!'
        },
        {
          id: 9,
          title: 'James the Mermaid',
          image: './image/portrait2.png',
          description: 'Books! Books Boooooks!!!'
        },
        {
          id: 14,
          title: 'Michael Pineapple',
          image: './image/portrait.jpg',
          description: 'Big Book Fan...Oooh yeaah'
        },
        {
          id: 11,
          title: 'Michael Pineapple',
          image: './image/portrait3.png',
          description: 'WOOOOO! BOOOKS!'
        },
        {
          id: 13,
          title: 'Michael Pineapple',
          image: './image/portrait2.png',
          description: 'Books! Books Boooooks!!!'
        },
        {
          id: 10,
          title: 'Michael Pineapple',
          image: './image/portrait2.png',
          description: 'Big Book Fan...Oooh yeaah'
        },
        {
          id: 12,
          title: 'Michael Pineapple',
          image: './image/portrait.jpg',
          description: 'Books! Books Boooooks!!!'
        },
      ]
    }

    return Promise.resolve(
      dispatch({
        type: A.GET_FOLLOWERS,
        payload: data
      })
    ).catch(err => console.log(`Error in getFollowers ${err}`))
  }
}

export function getFollowed() {
  return dispatch => {
    const data = {
      count: 15,
      result: [
        {
          authors: [
            {
              id: 3,
              title: 'James the Mermaid',
              image: './image/portrait2.png',
              description: 'Books! Books Boooooks!!!'
            },
            {
              id: 8,
              title: 'Michael Pineapple',
              image: './image/portrait3.png',
              description: 'Books! Books Boooooks!!!'
            },
            {
              id: 5,
              title: 'Michael Pineapple',
              image: './image/portrait2.png',
              description: 'WOOOOO! BOOOKS!'
            },
            {
              id: 9,
              title: 'James the Mermaid',
              image: './image/portrait2.png',
              description: 'Books! Books Boooooks!!!'
            },
            {
              id: 14,
              title: 'Michael Pineapple',
              image: './image/portrait.jpg',
              description: 'Big Book Fan...Oooh yeaah'
            },
            {
              id: 11,
              title: 'Michael Pineapple',
              image: './image/portrait3.png',
              description: 'WOOOOO! BOOOKS!'
            },
            {
              id: 13,
              title: 'Michael Pineapple',
              image: './image/portrait2.png',
              description: 'Books! Books Boooooks!!!'
            },
            {
              id: 10,
              title: 'Michael Pineapple',
              image: './image/portrait2.png',
              description: 'Big Book Fan...Oooh yeaah'
            },
            {
              id: 12,
              title: 'Michael Pineapple',
              image: './image/portrait.jpg',
              description: 'Books! Books Boooooks!!!'
            },
          ],
          readers: [
            {
              id: 0,
              title: 'Michael Pineapple',
              image: './image/portrait2.png',
              description: 'Books! Books Boooooks!!!'
            },
            {
              id: 6,
              title: 'James the Mermaid',
              image: './image/portrait3.png',
              description: 'WOOOOO! BOOOKS!'
            },
            {
              id: 2,
              title: 'Michael Pineapple',
              image: './image/portrait.jpg',
              description: 'Big Book Fan...Oooh yeaah'
            },
            {
              id: 7,
              title: 'James the Mermaid',
              image: './image/portrait3.png',
              description: 'Books! Books Boooooks!!!'
            },
            {
              id: 15,
              title: 'Michael Pineapple',
              image: './image/portrait2.png',
              description: 'WOOOOO! BOOOKS!'
            },
            {
              id: 4,
              title: 'Michael Pineapple',
              image: './image/portrait.jpg',
              description: 'Big Book Fan...Oooh yeaah'
            },
          ]
        }
      ]
    }

    return Promise.resolve(
      dispatch({
        type: A.GET_FOLLOWED,
        payload: data
      })
    ).catch(err => console.log(`Error in getFollowed ${err}`))
  }
}

export function updateFollowed(followed) {
  // update social
  // TODO: Test if readers isn't overwritten with real data when following new authors
  return dispatch => {
    return Promise.resolve(
      // TODO: update current_reader endpoint or wherever these are saved
      // with an array of ids of authors followed
    ).then(() => {
      // call the call getFollowed() to get an updated followed array of objects
    })
  }
}

export function updateFollowers(followers) {
  // TODO: update current_reader endpoint or wherever these are saved
  return dispatch => {
    return Promise.resolve(
      // TODO: update current_reader endpoint or wherever these are saved
      // with an array of ids of authors followed
    ).then(() => {
      // call the call getFollowers() to get an updated followed array of objects
    })
  }
}

export default {
  getFollowers,
  getFollowed,
  updateFollowed,
  updateFollowers,
}
