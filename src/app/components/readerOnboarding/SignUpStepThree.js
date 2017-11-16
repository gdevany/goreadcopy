import React, { PureComponent } from 'react'
import Radium from 'radium'
import R from 'ramda'
import { connect } from 'react-redux'
import SignUpButtons from './SignUpButtons'
import Checkbox from './Checkbox'
import { Recommended } from '../../redux/actions'
import { Collections } from '../../services'
import { Colors, Breakpoints } from '../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'

const styles = {
  container: {
    backgroundColor: Colors.white,
    padding: '50px 150px',
    marginTop: 10,
    marginBottom: 30,
    maxWidth: 900,
    height: '100%',

    [Breakpoints.mobile]: {
      padding: '50px 15px',
      marginTop: 0,
    },
  },

  labelText: {
    fontSize: 14,
    margin: '50px 0 20px',
  },

  readersText: {
    fontSize: 14,
    margin: '50px 0 20px',

    [Breakpoints.mobile]: {
      padding: '10px 0 15px',
      marginTop: 0,
    },
  },

  authorLabelText: {
    fontSize: 14,
    margin: '30px 0 20px',
  },

  selectSection: {
    padding: 0,
  },

  headerText: {
    marginBottom: 15,
  },

  selectText: {
    fontSize: 18,
    marginLeft: 15,
  },

  formWrapper: {
    position: 'relative',
  },

  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

const { pairs } = Collections
const {
  getOnboardingRecommendation,
  searchRecommendation,
  choseRecommendation,
  updateRecommendedLitcoins
} = Recommended

const UsersRow = ([firstUser, secondUser], i) => {
  return (
    <div className='row' key={i + '_users_row'}>
      <div className='small-12 medium-6 columns'>
        {firstUser}
      </div>
      <div className='small-12 medium-6 columns'>
        {secondUser}
      </div>
    </div>
  )
}

class SignUpStepThree extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      chosenReaders: [],
      chosenAuthors: [],
      selectAll: false,
      oldSearchInput: '',
      newSearchInput: '',
      shouldSubmit: false,
      showLoader: false,
      recommended: [],
      randomReaders: false,
      randomAuthors: false,
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.isChosen = this.isChosen.bind(this)
    this.checkBoxesFor = this.checkBoxesFor.bind(this)
  }

  componentWillMount = () => {
    this.props.getOnboardingRecommendation(this.props.RecommendationsAmount)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.recommended) {
      this.setState({
        randomReaders: this.allReaders(nextProps.recommended),
        randomAuthors: this.allAuthors(nextProps.recommended)
      })
    }
  }

  componentDidUpdate = () => {
    const { chosenReaders, chosenAuthors, oldSearchInput, newSearchInput } = this.state
    if (newSearchInput !== '' && newSearchInput !== oldSearchInput) {
      this.props.searchRecommendation(newSearchInput)
    }
    this.setState({ oldSearchInput: newSearchInput })
    this.props.updateRecommendedLitcoins(chosenReaders, 'readers')
    this.props.updateRecommendedLitcoins(chosenAuthors, 'authors')
  }

  handleButtonClick = (event) => {
    event.preventDefault()
    this.setState({ showLoader: true })
    const { chosenReaders, chosenAuthors } = this.state
    const buttonText = event.target.value
    if (buttonText === 'Finish & go explore books') {
      this.props.choseRecommendation(chosenReaders, 'readers')
      this.props.choseRecommendation(chosenAuthors, 'authors')
        .then(() => {
          this.setState({ showLoader: false })
        })
      this.props.handleNext()
    } else if (buttonText === 'Back') {
      this.props.handlePrev()
    }
  }

  handleCheckBoxClick = R.curry((dataType, id) => {
    const state = (dataType === 'readers') ? this.state.chosenReaders : this.state.chosenAuthors
    const stateKey = (dataType === 'readers') ? 'chosenReaders' : 'chosenAuthors'

    if (this.isChosen(id)) {
      const collectionWithoutMember = R.reject(R.equals(id), state)
      this.setState({ [stateKey]: [...collectionWithoutMember] })
    } else {
      this.setState({ [stateKey]: [...state, id] })
    }
  })

  getRandom = (nItems, list) => {
    const NewList = []
    for (let i = 0; i < nItems; i++) {
      const index = Math.floor((Math.random() * list.length))
      const randomItem = list[index]
      list.splice(index, 1)
      NewList.push(randomItem)
    }
    return NewList
  }

  allAuthors = (recommended) => {
    const authors = recommended.length ? recommended[0].authors : false
    let authorsToShow = []

    if (authors) {
      if (R.prop('buzz', authors) || R.prop('nonBuzz', authors)) {
        const buzzAuthors = R.prop('buzz', authors) ? authors.buzz : []
        const nonBuzzAuthors = R.prop('nonBuzz') ? authors.nonBuzz : []
        const buzzAuthorsToShow = buzzAuthors ?
          this.getRandom(this.props.BuzzAuthorsRecommendations, buzzAuthors) : []
        const nonBuzzAuthorsToShow = nonBuzzAuthors ?
          this.getRandom(this.props.NonBuzzAuthorsRecommendations, nonBuzzAuthors) : []
        authorsToShow = R.concat(buzzAuthorsToShow, nonBuzzAuthorsToShow)
      } else authorsToShow = authors.slice(1, 6)
    }
    return authorsToShow
  }

  allReaders = (recommended) => {
    const readers = recommended.length ? recommended[0].readers : false
    let readersToShow = []

    if (readers) {
      if (R.prop('newLastFourteenDays', readers) || R.prop('loggedLastThirtyDays', readers)) {
        const newLastFourteenDays = R.prop('newLastFourteenDays', readers) ?
            readers.newLastFourteenDays : false
        const loggedLastThirtyDays = R.prop('loggedLastThirtyDays', readers) ?
            readers.loggedLastThirtyDays : false
        const newLastFourteenDaysToShow = newLastFourteenDays ?
          this.getRandom(this.props.NewReadersRecommendations, newLastFourteenDays) : []
        const loggedLastThirtyDaysToShow = loggedLastThirtyDays ?
          this.getRandom(this.props.OldReadersRecommendations, loggedLastThirtyDays) : []
        readersToShow = R.concat(newLastFourteenDaysToShow, loggedLastThirtyDaysToShow)
      } else readersToShow = readers.slice(1, 6)
    }
    return readersToShow
  }

  handleSelectAll() {
    const selectAll = !this.state.selectAll
    const { clickedSelectAll } = this.props
    const { chosenReaders, chosenAuthors, randomReaders, randomAuthors } = this.state
    const idAsNumber = R.compose(Number, R.prop('id'))
    const selectedUsersState =
      selectAll ?
      {
        chosenReaders: R.map(idAsNumber, randomReaders),
        chosenAuthors: R.map(idAsNumber, randomAuthors),
      } :
      {
        chosenReaders: [],
        chosenAuthors: [],
      }

    this.setState({
      ...selectedUsersState,
      selectAll,
    })

    this.props.updateRecommendedLitcoins(chosenReaders, 'readers')
    this.props.updateRecommendedLitcoins(chosenAuthors, 'authors')

    clickedSelectAll()
  }

  isChosen(id) {
    // TODO: right now this assumes that authors and readers don't have any
    // id overlap, i.e. they are on the same table.
    // If this changes, behavior may be buggy
    const allIds = this.state.chosenAuthors.concat(this.state.chosenReaders)
    const result = R.contains(id, allIds)
    return result
  }

  handleSearchTyping = () => {
    const search = this.refs.search.value
    this.setState({
      newSearchInput: search,
      randomReaders: false,
    })
    if (search === '') {
      this.props.getOnboardingRecommendation()
    }
  }

  checkBoxesFor(dataType, users) {
    return users.map(user => {
      if (user) {
        const {
          id,
          booksWritten,
          inspiredBy,
        } = user

        return (
          <Checkbox
            key={id}
            id={id}
            fullname={user.fullname ? user.fullname : `${user.firstName} ${user.lastName}`}
            imageUrl={user.imageUrl ? user.imageUrl : user.image}
            booksWritten={booksWritten}
            inspiredBy={inspiredBy}
            onClick={this.handleCheckBoxClick(dataType)}
            isChecked={this.isChosen(id)}
            dataType={dataType}
          />
        )
      }
      return null
    })
  }

  rowsOf(users) {
    const rows = pairs(users)
    return rows.map(UsersRow)
  }

  handleEnterButton = (event) => {
    if (event.which === 13) {
      event.preventDefault()
    }
  }

  render() {
    const { stepIndex } = this.props
    const {
      newSearchInput,
      selectAll,
      shouldSubmit,
      showLoader,
      randomAuthors,
      randomReaders
    } = this.state
    let readers
    let authors
    if (randomReaders && randomAuthors) {
      readers = this.checkBoxesFor('readers', randomReaders)
      authors = this.checkBoxesFor('authors', randomAuthors)
    }
    return (
      <div style={styles.container} className='card front-card'>

        <h1 className='center-text' style={styles.headerText}>
          Create your Read Feed
        </h1>

        <p className='center-text subheader-text'>
          {`We recommend following these authors and readers to bring you books
             and articles you'll love`}
        </p>
        <p>
          To earn 8,400 litcoins follow 6 authors and 6 readers:
        </p>
        <h5 style={styles.labelText}> Add Your Own </h5>

        <div className='small-12'>
          <form
            style={styles.formWrapper}
            className='form-input-wrapper'
            onKeyPress={this.handleEnterButton}
          >
            <div className='search-icon' />
            <input
              value={newSearchInput}
              className='form-input'
              type='text'
              ref='search'
              onChange={this.handleSearchTyping}
            />
          </form>
        </div>

        <div>
          <input
            type='checkbox'
            checked={selectAll}
            onClick={this.handleSelectAll}
          />
          <label style={styles.selectText}>
            Select all
        </label>
        </div>

        <div>
          <form>

            <div className='row'>
              <div style={styles.selectSection} className='small-12 columns'>
                <h5 style={styles.authorLabelText}> Authors </h5>

                <div className='row'>
                  <fieldset className='small-12 columns'>
                    { authors && authors.length ?
                      this.rowsOf(authors) : <div className='loading-animation'/>
                    }
                  </fieldset>
                </div>

              </div>
            </div>

            <div className='row'>
              <div style={styles.selectSection} className='small-12 columns'>
                <h5 style={styles.readersText}> Readers </h5>

                <div className='row'>
                  <fieldset className='small-12 columns'>
                    { readers && readers.length ?
                      this.rowsOf(readers) : <div className='loading-animation'/>
                    }
                  </fieldset>
                </div>

              </div>
            </div>

          </form>
        </div>
        <SignUpButtons
          handleButtonClick={this.handleButtonClick}
          stepIndex={stepIndex}
          shouldSubmit={shouldSubmit}
        />
        {
          showLoader ? (
            <div className='form-input-wrapper center-text'>
              <RefreshIndicator
                size={50}
                left={0}
                top={0}
                loadingColor={Colors.blue}
                status='loading'
                style={styles.refresh}
              />
            </div>
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = ({ recommended }) => {
  return { recommended }
}

const mapDispatchToProps = {
  getOnboardingRecommendation,
  searchRecommendation,
  choseRecommendation,
  updateRecommendedLitcoins,
}

SignUpStepThree.defaultProps = {
  RecommendationsAmount: 40,
  BuzzAuthorsRecommendations: 3,
  NonBuzzAuthorsRecommendations: 3,
  NewReadersRecommendations: 2,
  OldReadersRecommendations: 4,
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SignUpStepThree))
