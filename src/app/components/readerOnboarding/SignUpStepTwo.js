import React, { PureComponent } from 'react'
import Radium from 'radium'
import R from 'ramda'
import { connect } from 'react-redux'
import { Chip } from 'material-ui'
import { Genres } from '../../redux/actions'
import SignUpButtons from './SignUpButtons'
import { Colors, Breakpoints } from '../../constants/style'

const { getGenres, createChosenReaderGenres, updateGenreLitcoins } = Genres

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

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  container: {
    backgroundColor: Colors.white,
    padding: '50px 100px',
    marginTop: 10,
    maxWidth: 900,

    [Breakpoints.mobile]: {
      padding: '50px 15px',
      marginTop: 0,
    },
  },

  chipText: {
    color: Colors.blue,
    fontSize: 16,
  },

  chosenChip: {
    color: Colors.white,
  },

  genreSection: {
    marginBottom: 100,
  },

  checkmark: {
    marginRight: 7,
  },
}

class SignUpStepTwo extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      chosenGenres: [],
      showDisabled: true
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  componentWillMount = () => {
    this.props.getGenres('signup')
  }

  componentDidUpdate = () => {
    if (this.state.chosenGenres.length) {
      this.props.updateGenreLitcoins({ genreIds: this.state.chosenGenres })
    }
  }

  handleButtonClick = (event) => {
    event.preventDefault()
    const buttonText = document.activeElement.getAttribute('value')

    if (buttonText === 'Next') {
      if (this.state.chosenGenres.length > 0) {
        this.props.createChosenReaderGenres({ genreIds: this.state.chosenGenres })
        this.props.handleNext()
      } else {
        this.setState({ showDisabled: true })
      }
      this.props.handleNext()
    } else if (buttonText === 'Back') {
      this.props.handlePrev()
    }

  }

  handleSelectGenre = () => {
    const { chosenGenres } = this.state
    const genreID = Number(document.activeElement.getAttribute('value'))
    const indexOfGenre = chosenGenres.indexOf(genreID)

    if (chosenGenres.length === 0) this.setState({ showDisabled: true })

    if (indexOfGenre >= 0) {
      const updatedGenres = R.reject(R.equals(genreID), chosenGenres)
      this.setState({ chosenGenres: [...updatedGenres] })
      if (chosenGenres.length === 1) {
        this.setState({ showDisabled: true })
        this.props.updateGenreLitcoins({ genreIds: [] })
      }
    } else {
      this.setState({ showDisabled: false })
      this.setState({ chosenGenres: [...chosenGenres, genreID] })
    }

  }

  handleGenreMap = (genres) => {
    return genres.map((genre, index) => {
      const { chosenGenres } = this.state
      const isChosen = chosenGenres.indexOf(genre.id) !== -1

      return (
        <Chip
          key={index}
          value={genre.id}
          className={isChosen ? 'chosenGenre' : null}
          labelStyle={styles.chipText}
          style={styles.chip}
          onClick={this.handleSelectGenre}
        >
          {isChosen ?
            <img style={styles.checkmark} src='./image/checkmark.png' /> :
            <img style={styles.checkmark} src='./image/plus.png' />
          }
            {genre.name}
        </Chip>
      )
    })
  }

  render() {
    const { genres, stepIndex } = this.props

    return (
      <div>
        <div style={styles.container} className='card center-text front-card'>

          <h1>
            Add your favorite genres
          </h1>

          <p>
            {"We'll use this information to suggest new books and authors for you"}
          </p>

          {
            this.state.showError ? (
              <div>
                <p>Please select one genre</p>
              </div>
            ) : null
          }

          <div style={styles.genreSection}>
            { this.handleGenreMap(genres) }
          </div>

          <div>
            <div style={{ marginTop: 24, marginBottom: 12 }} className='center-text'>
              <SignUpButtons
                handleButtonClick={this.handleButtonClick}
                stepIndex={stepIndex}
                disabled={this.state.showDisabled}
              />
            </div>
          </div>

        </div>

        <div className='behind-card-container'>
          <div style={styles.container} className='card behind-card' />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ genres }) => {
  return { genres }
}

const mapDispatchToProps = {
  createChosenReaderGenres,
  getGenres,
  updateGenreLitcoins,
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SignUpStepTwo))
