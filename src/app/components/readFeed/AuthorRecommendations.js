import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ExternalRoutes, Litcoins } from '../../constants'
import { AuthorRecSummary } from '../common'
import { Recommended } from '../../redux/actions'

const { findAuthors } = ExternalRoutes
const { getRecommendedAuthors } = Recommended
const { CONTEXTS: { READ_FEED } } = Litcoins

const styles = {
  recContainer: {
    marginTop: 20,
  },
}

class AuthorRecommendations extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    this.props.getRecommendedAuthors(3)
  }

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
            context={READ_FEED}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorRecommendations)
