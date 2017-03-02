import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ExternalRoutes } from '../../constants'
import { AvatarSummary } from '../common'
import { Follow } from '../../redux/actions'
import R from 'ramda'

const { updateFollowed } = Follow
const { findAuthors } = ExternalRoutes

class AuthorRecommendations extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      followed: []
    }

    this.handleChipClick = this.handleChipClick.bind(this)
    this.isChosen = this.isChosen.bind(this)
  }

  componentDidUpdate = () => {
    const { followed } = this.state
    if (followed.length) this.props.updateFollowed(followed)
    else {
      const followedExists = this.props.followed.result ?
        this.props.followed.result[0].authors : null
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

  isChosen = (id) => {
    return R.contains(id, this.state.followed)
  }

  renderAuthors = (authors) => {
    return authors.map(author => {
      const {
        id,
        firstName,
        lastName,
        image,
        booksWritten,
        description // TODO: temporary while we have fake data. should delete this.
      } = author
      return (
        <div className='column column-block' key={id}>
          <AvatarSummary
            id={id}
            key={id}
            title={`${firstName} ${lastName}`}
            image={image}
            description={description}
            booksWritten={booksWritten || description}
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
    const authors = recommended[0] ? recommended[0].authors : null

    return (
      <div className='left-container small-12 columns'>
        <div className='lead'>
          <h4> Recommended Authors </h4>
        </div>
        {/** Derrick, feel free to change how it's rendered in different views: **/}
        <div className='row small-up-1'>
          { authors ? this.renderAuthors(authors) : null }
        </div>
        <div>
          <a href={findAuthors()}>
            See more authors >
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  recommended = [],
  social: {
    followed
  }
}) => {
  return {
    recommended,
    followed
  }
}

export default connect(mapStateToProps, { updateFollowed })(AuthorRecommendations)
