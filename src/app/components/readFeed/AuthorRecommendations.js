import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ExternalRoutes } from '../../constants'
import { AuthorRecSummary } from '../common'
import { Follow, Recommended } from '../../redux/actions'
import R from 'ramda'

const { updateFollowed } = Follow
const { findAuthors } = ExternalRoutes
const { getRecommendedAuthors } = Recommended

const styles = {
  recContainer: {
    marginTop: 20,
  },
}

class AuthorRecommendations extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      followed: []
    }

    this.handleChipClick = this.handleChipClick.bind(this)
    this.isChosen = this.isChosen.bind(this)
  }

  componentDidMount = () => {
    this.props.getRecommendedAuthors(3)
  }

  componentDidUpdate = () => {
    const { followed } = this.state
    if (followed.length) this.props.updateFollowed(followed)
    else {
      const followedExists = this.props.followed ? followedAuthorExists : null
      const followedAuthorExists = this.props.followed.results.length ?
        this.props.followed.results[0].authors : null
      if (followedExists) this.setState({ followed: R.pluck('id', followedExists) })
    }
  }

  handleChipClick = (event, id, firstName, lastName, image, booksWritten) => {
    event.preventDefault()
    const { followed } = this.state
    if (this.isChosen(id)) {
      const collectionWithoutMember = R.reject(R.equals(id), followed)
      this.setState({ followed: [...collectionWithoutMember] })
    } else {
      this.setState({ followed: [...followed, id] })
    }
  }

  isChosen = (id) => R.contains(id, this.state.followed)

  renderAuthors = (authors) => {
    return authors.map(author => {
      const {
        id,
        firstName,
        lastName,
        imageUrl,
        booksWritten,
      } = author
      return (
        <div className='column column-block' key={id}>
          <AuthorRecSummary
            id={id}
            key={id}
            title={`${firstName} ${lastName}`}
            image={imageUrl}
            description={'Nothing about me yet'}
            booksWritten={booksWritten}
            isChosen={this.isChosen}
            handleChipClick={event => {
              this.handleChipClick(event, id, firstName, lastName, image, booksWritten)
            }}
          />
        </div>
      )
    })
  }

  render() {
    const { recommended } = this.props
    const authors = recommended ? recommended.authors : null

    return (
      <div style={styles.recContainer} className='left-container small-12 columns box'>
        <div className='rec-header'>
          <h4> Recommended Authors </h4>
        </div>
        {/** Derrick, feel free to change how it's rendered in different views: **/}
        <div className='row small-up-1'>
          { authors ? this.renderAuthors(authors) : null }
        </div>
        <div className='sub-link'>
          <a href={findAuthors()}>
            See more authors
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    recommended
  },
  social: {
    followed
  }
}) => {
  return {
    recommended,
    followed
  }
}

const mapDispatchToProps = {
  getRecommendedAuthors,
  updateFollowed
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorRecommendations)
