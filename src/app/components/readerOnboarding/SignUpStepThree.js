import React, { PureComponent } from 'react'
import Radium from 'radium'
import R from 'ramda'
import { connect } from 'react-redux'
import SignUpButtons from './SignUpButtons'
import Checkbox from './Checkbox'
import { Recommended } from '../../redux/actions'
import { Collections, Genres } from '../../services'
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
  getRecommendation,
  searchRecommendation,
  choseRecommendation,
  updateRecommendedLitcoins
} = Recommended

const MAX_USERS_PER_SECTION = 5
const allAuthors = R.compose(R.flatten, R.map(Genres.authors))
const allReaders = R.compose(R.flatten, R.map(Genres.readers))

// TODO: use shuffle and/or put these values in state?
const displayable = R.take(MAX_USERS_PER_SECTION)

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
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.isChosen = this.isChosen.bind(this)
    this.checkBoxesFor = this.checkBoxesFor.bind(this)
  }

  componentWillMount = () => {
    this.props.getRecommendation(5)
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
    this.setState({
      showLoader: true,
    })
    const { chosenReaders, chosenAuthors } = this.state
    const buttonText = event.target.value
    if (buttonText === 'Finish & go explore books') {
      this.setState({ shouldSubmit: true })
      this.props.choseRecommendation(chosenReaders, 'readers')
      this.props.choseRecommendation(chosenAuthors, 'authors')
      .then(() => {
        this.setState({
          showLoader: false,
        })
      })
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

  handleSelectAll() {
    const selectAll = !this.state.selectAll
    const { recommended, clickedSelectAll } = this.props
    const { chosenReaders, chosenAuthors } = this.state
    const idAsNumber = R.compose(Number, R.prop('id'))
    const selectedUsersState =
      selectAll ?
      {
        chosenReaders: R.map(idAsNumber, displayable(allReaders(recommended))),
        chosenAuthors: R.map(idAsNumber, displayable(allAuthors(recommended))),
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
    this.setState({ newSearchInput: search })
    if (search === '') {
      this.props.getRecommendation()
    }
  }

  checkBoxesFor(dataType, users) {
    return users.map(user => {
      const {
        id,
        firstName,
        lastName,
        image,
        booksWritten,
        inspiredBy,
      } = user

      return (
        <Checkbox
          key={id}
          id={id}
          firstName={firstName}
          lastName={lastName}
          image={image}
          booksWritten={booksWritten}
          inspiredBy={inspiredBy}
          onClick={this.handleCheckBoxClick(dataType)}
          isChecked={this.isChosen(id)}
          dataType={dataType}
        />
      )
    })
  }

  rowsOf(users) {
    const rows = pairs(users)
    return rows.map(UsersRow)
  }

  render() {
    const { stepIndex, recommended } = this.props
    const {
      newSearchInput,
      selectAll,
      shouldSubmit,
      showLoader,
    } = this.state
    const readers = this.checkBoxesFor('readers', displayable(allReaders(recommended)))
    const authors = this.checkBoxesFor('authors', displayable(allAuthors(recommended)))

    return (
      <div style={styles.container} className='card front-card'>

        <h1 className='center-text' style={styles.headerText}>
          Create your Read Feed
        </h1>

        <p className='center-text subheader-text'>
          {`We recommend following these authors and readers to bring you books
             and articles you'll love`}
        </p>

        <h5 style={styles.labelText}> Add Your Own </h5>

        <div className='small-12'>
          <form style={styles.formWrapper} className='form-input-wrapper'>
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
                    { this.rowsOf(authors) }
                  </fieldset>
                </div>

              </div>
            </div>

            <div className='row'>
              <div style={styles.selectSection} className='small-12 columns'>
                <h5 style={styles.readersText}> Readers </h5>

                <div className='row'>
                  <fieldset className='small-12 columns'>
                    { this.rowsOf(readers) }
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
  getRecommendation,
  searchRecommendation,
  choseRecommendation,
  updateRecommendedLitcoins,
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(SignUpStepThree))
