import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getGenres } from '../redux/actions/genres'
import { updateUserData } from '../redux/actions/userData'
import {
  Chip,
  FlatButton,
  RaisedButton
} from 'material-ui'
import StepperIndex from '../redux/const/stepperIndex'
import CheckIcon from 'material-ui/svg-icons/navigation/check'

const styles = {
  chip: {
    margin: 4,
  },
  chipChosen: {
    margin: 4,
    background: 'blue',
    color: 'white'
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
      showError: false
    }
  }

  componentWillMount = () => {
    this.props.getGenres('signup')
  }

  handleButtonClick = (event) => {
    event.preventDefault()
    if (this.state.chosenGenres.length > 0) {
      this.props.handleSubmit({ chosenGenres: this.state.chosenGenres }, 'two')
      this.props.handleNext()
    } else {
      this.setState({ showError: true })
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
          style={isChosen ? styles.chipChosen : styles.chip}
          onTouchTap={this.handleSelectGenre}
        >
          {isChosen ? <CheckIcon color={'white'}/> : '+'} {genre.name}
        </Chip>
      )
    })
  }

  handleSelectGenre = () => {
    const genreID = Number(document.activeElement.getAttribute('value'))
    const indexOfGenre = this.state.chosenGenres.indexOf(genreID)

    if (this.state.chosenGenres.length === 0) this.setState({ showError: true })

    if (indexOfGenre >= 0) {
      const updatedGenres = this.state.chosenGenres.filter((genre) => (genre !== genreID))
      this.setState({ chosenGenres: [...updatedGenres] })
    } else {
      this.setState({ showError: false })
      this.setState({
        chosenGenres: [...this.state.chosenGenres, genreID]
      })
    }
  }

  render() {
    const { genres, stepIndex } = this.props
    const isFinished = (stepIndex === StepperIndex.TWO) ? 'Finish' : 'Next'
    const isDisabled = stepIndex === StepperIndex.ZERO

    return (
      <div className='center-text'>
        <h1>
          Add your favorite genres
        </h1>
        <p>
          {"We'll use this information to suggest new books and authors for you"}
        </p>
        {
          this.state.showError ? (
            <div>
              <p>Please, select at least one genre of your preference!</p>
            </div>
          ) : null
        }
        <div>
          { this.handleGenreMap(genres) }
        </div>
        <div>
          <div style={{ marginTop: 24, marginBottom: 12 }} className='center-text'>
            {/** If using regular button KEEP VALUE below **/}
            <FlatButton
              label='Back'
              value='Back'
              disabled={ isDisabled }
              style={{ marginRight: 12 }}
            />
            {/** If using regular button KEEP VALUE below **/}
            <RaisedButton
              label={ isFinished }
              value={ isFinished }
              primary={true}
              onTouchTap={this.handleButtonClick}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ genres }) => {
  return { genres }
}

export default connect(mapStateToProps, { getGenres, updateUserData })(SignUpStepTwo)
