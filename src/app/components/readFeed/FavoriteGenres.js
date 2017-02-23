import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Chip } from 'material-ui'
import S from 'underscore.string.fp'
import { Colors } from '../../constants/style'
import FavoriteGenresModal from './FavoriteGenresModal'

const styles = {
  chip: {
    backgroundColor: Colors.white,
    border: `1px solid ${Colors.blue}`,
    borderRadius: 25,
    color: Colors.blue,
    display: 'inline-block',
    margin: '30px 15px 0px 0px',
    padding: 7,
  },

  chipText: {
    color: Colors.blue,
    fontSize: 16,
  },

  checkmark: {
    marginRight: 7,
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
    return genres.map((genre, index) => {
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
      <div>
        <h5> Your Genres </h5>
        <div onClick={this.handleOpen} style={styles.genreSection}>
          {genreIds ? this.renderChosenGenres(genreIds) : null}
          <br />
          <span>
            Add or edit genres >
          </span>
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
