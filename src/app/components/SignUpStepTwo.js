import React, { PureComponent } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { Chip } from 'material-ui'
import CheckIcon from 'material-ui/svg-icons/navigation/check'
import SignUpButtons from './SignUpButtons'
import { Genres } from '../redux/actions'

const { getGenres, createChosenReaderGenres } = Genres

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
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

  handleButtonClick = (event) => {
    event.preventDefault()
    const buttonText = document.activeElement.getAttribute('value')

    if (buttonText === 'Next') {
      if (this.state.chosenGenres.length > 0) {
        this.props.createChosenReaderGenres({ chosenGenres: this.state.chosenGenres })
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
      if (chosenGenres.length === 1) this.setState({ showDisabled: true })
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
          style={styles.chip}
          onTouchTap={this.handleSelectGenre}
        >
          {isChosen ? <CheckIcon color={'white'}/> : '+'} {genre.name}
        </Chip>
      )
    })
  }

  render() {
    const { genres, stepIndex } = this.props

    return (
      <div className='center-text'>
        <h1>
          Add your favorite genres
        </h1>
        <p>
          {"We'll use this information to suggest new books and authors for you"}
        </p>
        <div>
          { this.handleGenreMap(genres) }
        </div>
        <div>
          <SignUpButtons
            handleButtonClick={this.handleButtonClick}
            stepIndex={stepIndex}
            disabled={this.state.showDisabled}
          />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStepTwo)
