import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Litcoins } from '../../constants'
import { AuthorRecSummary } from '../common'
import { Recommended, Follow } from '../../redux/actions'

const { getRecommendedAuthors } = Recommended
const { getFollowersAndFollowed } = Follow
const { CONTEXTS: { READ_FEED } } = Litcoins

const styles = {
  recContainer: {
    marginTop: 20,
  },
}

class AuthorRecommendations extends PureComponent {
  constructor(props) {
    super(props)

    this.handleAuthorClick = this.handleAuthorClick.bind(this)
  }

  componentDidMount = () => {
    this.props.getRecommendedAuthors(3)
  }

  handleAuthorClick = () => {
    this.props.getFollowersAndFollowed(this.props.currentReaderId)
  }

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  renderAuthors = (authors) => {
    return authors.map(author => {
      const {
        id,
        fullname,
        imageUrl,
        booksWritten,
        url,
        shortBio,
      } = author
      return (
        <div className='column column-block' key={id}>
          <AuthorRecSummary
            id={id}
            key={id}
            title={fullname}
            image={imageUrl}
            link={url}
            description={shortBio ? this.truncInfo(shortBio, 50) : 'Nothing about me yet'}
            booksWritten={booksWritten}
            context={READ_FEED}
            onClick={this.handleAuthorClick}
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
          { authors ?
            this.renderAuthors(authors.buzz.results) : <div className='loading-animation'/>
          }
        </div>
        {/* <div className='sub-link'>
          <a>
            See more authors
          </a>
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    id,
    recommended,
  },
  social: {
    followed
  }
}) => {
  return {
    currentReaderId: id,
    recommended,
    followed
  }
}

const mapDispatchToProps = {
  getRecommendedAuthors,
  getFollowersAndFollowed,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorRecommendations)
