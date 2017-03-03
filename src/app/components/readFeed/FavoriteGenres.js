import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
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
    const { genreIds } = this.props
    const { modalOpen } = this.state
    return (
      <div style={styles.container} className='text-left'>
        <span className='small-header'> Your Genres </span>
        <div onClick={this.handleOpen} style={styles.genreSection}>
          {genreIds ? this.renderChosenGenres(genreIds) : null}
          <br />
          <a className='sublink'>
            Add or edit genres >
          </a>
        </div>
        <FavoriteGenresModal
          modalOpen={modalOpen}
          handleClose={this.handleClose}
          genreIds={genreIds}
        />
      </div>
    )
  }
}

const mapStateToProps = ({
  currentReader: {
    genreIds = []
  }
}) => {
  return { genreIds }
}

export default connect(mapStateToProps)(FavoriteGenres)
