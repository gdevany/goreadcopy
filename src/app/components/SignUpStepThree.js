import React, { PureComponent } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { getRecommendation, choseRecommendation } from '../redux/actions/recommended'
import { Collections, Genres } from '../services'
import SignUpButtons from './SignUpButtons'
import Checkbox from './Checkbox'

const { pairs } = Collections

const MAX_USERS_PER_SECTION = 5
const allAuthors = R.compose(R.flatten, R.map(Genres.authors))
const allReaders = R.compose(R.flatten, R.map(Genres.readers))

// TODO: use shuffle and/or put these values in state?
const displayable = R.take(MAX_USERS_PER_SECTION)

const UsersRow = ([firstUser, secondUser], i) => {
  return (
    <div className='row' key={i + '_users_row'}>
      <div className='small-6 columns'>
        {firstUser}
      </div>
      <div className='small-6 columns'>
        {secondUser}
      </div>
    </div>
  )
}

/*
  * Once they choose, onClick call the endpoint that sends their checks to
  the other enpoint /current_reader/liked_authors
 */
class SignUpStepThree extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      chosenReaders: [],
      chosenAuthors: [],
      selectAll: false,
      searchInput: ''
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.isChosen = this.isChosen.bind(this)
  }

  componentWillMount = () => {
    this.props.getRecommendation({ count: 3 })
  }

  handleButtonClick = (event) => {
    event.preventDefault()
    const { chosenReaders, chosenAuthors } = this.state
    const buttonText = document.activeElement.getAttribute('value')
    if (buttonText === 'Next') {
      if (chosenReaders.length) { this.props.choseRecommendation(chosenReaders, 'readers') }
      if (chosenAuthors.length) { this.props.choseRecommendation(chosenAuthors, 'authors') }
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

  handleSelectAll() {
    const selectAll = !this.state.selectAll
    const { recommended } = this.props
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
  }

  isChosen(id) {
    // TODO: right now this assumes that authors and readers don't have any
    // id overlap, i.e. they are on the same table.
    // If this changes, behavior may be buggy
    const allIds = this.state.chosenAuthors.concat(this.state.chosenReaders)
    const result = R.contains(id, allIds)
    return result
  }

  handleSearch = (event) => {
    event.preventDefault()
    // see notes below: this.props.getRecommendation(this.refs.search.value)
  }

  handleSearchTyping = (event) => {
    this.setState({ searchInput: this.refs.search.value })
  }

  checkBoxesFor(dataType, users) {
    return users.map((user) => {
      const {
        id,
        firstName,
        lastName,
        image,
        booksWritten,
        aboutSlogan,
      } = user

      return (
        <Checkbox
          key={id}
          id={id}
          firstName={firstName}
          lastName={lastName}
          image={image}
          booksWritten={booksWritten}
          aboutSlogan={aboutSlogan}
          handleCheckBoxClick={this.handleCheckBoxClick(dataType)}
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
    const { searchInput, selectAll } = this.state
    const theReaders = displayable(allReaders(recommended))
    console.log(theReaders)
    const readers = this.checkBoxesFor('readers', displayable(allReaders(recommended)))
    const authors = this.checkBoxesFor('authors', displayable(allAuthors(recommended)))
    /*
     TODO: Add search bar
      * We should really discuss the API implementation for this.
      * An idea I have:
      * 1. Users search for the author/reader they like
      * 2. getRecommendation is called with getRecommendation({search: 'Someone'})
      * 3. database looks for readers and authors of that name. If they exist they get
        added to readers AND/OR authors array for their related genre.
      * 4. This info gets added to the current recommendations sent to us.
      * 5. Thus when can still use the recommended prop, the only difference being that another
        author AND OR reader would be rendered.
    */
    return (
      <div>
        <h1 className='center-text'>
          Create your Read Feed
        </h1>
        <p className='center-text'>
          {`We recommend following these authors and readers to bring you books
             and articles you'll love`}
        </p>
        <h5> Add Your Own </h5>
        <div className='small-6'>
          <form onSubmit={this.handleSearch}>
            <input
              value={searchInput}
              type='text'
              ref='search'
              onChange={this.handleSearchTyping}
            />
          </form>
        </div>
        <div>
          <label>
            <input
              type='checkbox'
              checked={selectAll}
              onClick={this.handleSelectAll}
            />
            {selectAll ? 'Remove all' : 'Select all'}
        </label>
        </div>
        <div>
          <form>
            <div className='row'>
              <div className='small-12 columns'>
                <h5> Authors </h5>
                <fieldset className='small-6 columns'>
                  { this.rowsOf(authors) }
                </fieldset>
              </div>
              <div className='small-12 columns'>
                <h5> Readers </h5>
                <fieldset className='small-6 columns'>
                  { this.rowsOf(readers) }
                </fieldset>
              </div>
            </div>
          </form>
        </div>
        <SignUpButtons
          handleButtonClick={this.handleButtonClick}
          stepIndex={stepIndex}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ recommended }) => {
  return { recommended }
}

const mapDispatchToProps = {
  getRecommendation,
  choseRecommendation,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpStepThree)