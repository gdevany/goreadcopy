import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Books } from '../../redux/actions'
import { ExternalRoutes } from '../../constants'
import R from 'ramda'

const { myBookClubs } = ExternalRoutes
const { getBookClubRecommendations } = Books

const styles = {
  bookClubImage: {
    position: 'relative',
    textAlign: 'center',
  },
}

class BookClubRecommendations extends PureComponent {
  componentWillMount = () => {
    this.props.getBookClubRecommendations(3)
  }

  renderBookClubs(bookClubs) {
    return R.take(3, bookClubs).map(bookClub => {
      return (
        <div className='column column-block' key={bookClub.id}>
          <div
            data-tip data-for={bookClub.link}
            style={styles.bookClubImage}
            className='book-container'
          >
            <a href={bookClub.link}>
              <img className='book' src={bookClub.image} />
            </a>
            {bookClub.name}
          </div>
        </div>
      )
    })
  }

  render() {
    const { recommended } = this.props
    const bookClubs = recommended ? recommended.bookClubs : null

    return (
      <div className='left-container small-12 columns'>
        <div className='lead'>
          <h4> Check out these Book Clubs </h4>
        </div>
        {/** Derrick, feel free to change how it's rendered in different views: **/}
        <div className='row small-up-1'>
          { bookClubs ? this.renderBookClubs(bookClubs) : null }
        </div>
        <div>
          <a href={myBookClubs()}>
            See more Book Clubs >
          </a>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    recommended
  }
}) => {
  return { recommended }
}

export default connect(mapStateToProps, { getBookClubRecommendations })(BookClubRecommendations)
