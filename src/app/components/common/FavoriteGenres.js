import React, { PureComponent } from 'react'
import { Chip } from 'material-ui'
import S from 'underscore.string.fp'
import { Colors } from '../../constants/style'
import FavoriteGenresModal from './FavoriteGenresModal'
import R from 'ramda'

const styles = {
  chip: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.lightMedGrey}`,
    borderRadius: 25,
    color: Colors.black,
    display: 'inline-block',
    margin: '30px 15px 0px 0px',
    padding: 7,
  },

  chipText: {
    color: Colors.black,
    fontSize: 14,
  },

  checkmark: {
    marginRight: 7,
  },

  container: {
    marginTop: 50,
  },
}

class FavoriteGenres extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      modalOpen: false
    }

    this.handleClose = this.handleClose.bind(this)
  }

  componentWillReceiveProps = ({ genres, genreIds }) => {
    this.setState({ chosenGenres: genreIds })
  }

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  renderChosenGenres = (genres) => {
    return R.take(3, genres).map((genre, index) => {
      return (
        <div key={`${genre}-${index}`}>
          <Chip
            key={index}
            labelStyle={styles.chipText}
            style={styles.chip}
          >
            {S.titleize(genre.name)}
          </Chip>
        </div>
      )
    })
  }

  render() {
    const {
      genreIds,
      isCurrentReader,
      fullname,
      context
    } = this.props
    const { modalOpen } = this.state

    return (
      <div style={styles.container} className='text-left'>
        <span className='small-header'>
          { isCurrentReader ? 'Your' : `${fullname}'s'` } Favorite Categories
        </span>
        <div style={styles.genreSection}>
          {genreIds ? this.renderChosenGenres(genreIds) : <div className='loading-animation'/>}
          <br />
          {
            isCurrentReader ?
              <a className='sublink' onClick={this.handleOpen}>
                Add or edit Categories >
              </a> : null
          }
        </div>
        {isCurrentReader ?
          (
            <FavoriteGenresModal
              modalOpen={modalOpen}
              handleClose={this.handleClose}
              genreIds={genreIds}
              context={context}
            />
          ) : null}

      </div>
    )
  }
}

export default FavoriteGenres
