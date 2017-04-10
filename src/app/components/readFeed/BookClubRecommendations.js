import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Books } from '../../redux/actions'
import { ExternalRoutes } from '../../constants'
import R from 'ramda'

const styles = {
  bookClubText: {
    textAlign: 'left',
    fontSize: 14,
  },

  bookClubImg: {
    float: 'left',
    width: '30%',
    marginRight: 15,
  },

  recContainer: {
    marginTop: 20,
  },
}

const { myBookClubs } = ExternalRoutes
const { getBookClubRecommendations } = Books

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
          >

            <a href={bookClub.link}>
              <img style={styles.bookClubImg} src={bookClub.image} />

              <div style={styles.bookClubText}>
                <span> {bookClub.name} </span>
              </div>
            </a>

          </div>
        </div>
      )
    })
  }

  render() {
    const { recommended } = this.props
    const bookClubs = recommended ? recommended.bookClubs : null

    return (
      <div className='left-container small-12 box columns' style={styles.recContainer}>
        <div className='rec-header'>
          <h4> Check out these Book Clubs </h4>
        </div>
        {/** Derrick, feel free to change how it's rendered in different views: **/}
        <div className='row small-up-1'>
          { bookClubs ?
            this.renderBookClubs(bookClubs) : <div className='loading-animation'/>
          }
        </div>
        <div className='sub-link'>
          <a href={myBookClubs()}>
            See more Book Clubs
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
