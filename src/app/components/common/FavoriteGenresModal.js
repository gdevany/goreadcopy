import React, { PureComponent } from 'react'
import Radium from 'radium'
import { connect } from 'react-redux'
import { CurrentReader, Genres } from '../../redux/actions'
import { Dialog, Chip } from 'material-ui'
import PrimaryButton from './PrimaryButton'
import { Colors, Breakpoints } from '../../constants/style'
import S from 'underscore.string.fp'
import R from 'ramda'

const { updateCurrentReader } = CurrentReader
const {
  getGenres,
  searchGenres,
  createChosenReaderGenres
} = Genres

const styles = {
  headerText: {
    marginBottom: 15,
  },

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
    height: '100%',
    padding: '50px 70px',
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

  modalBody: {
    marginTop: -80,
  },

  modalContent: {
    maxWidth: '100%',
    width: '100%',
    opacity: 0.93,
  },

  formContainer: {
    height: '100vh',
    margin: '0 auto',
    maxWidth: 400,
  },

  header: {
    color: Colors.black,
    marginBottom: 50,
  },

  contentContainer: {
    maxWidth: 800,
  },

  genreSearch: {
    padding: '30px 0 0',
    margin: '0 auto',
    maxWidth: 575,
  },

  inputField: {
    paddingBottom: 0,
    position: 'relative',
  }
}

class FavoriteGenresModal extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      chosenGenres: [],
      mostPopularGenres: [],
      searchResults: [],
      oldSearchInput: '',
      newSearchInput: '',
    }

    this.handleSelectChosenGenre = this.handleSelectChosenGenre.bind(this)
    this.handleSelectPopularGenres = this.handleSelectPopularGenres.bind(this)
  }

  componentWillMount = () => {
    this.state.mostPopularGenres.length || this.props.getGenres()
  }

  componentDidUpdate = () => {
    const {
      oldSearchInput,
      newSearchInput,
    } = this.state

    if (newSearchInput.length > 3 && newSearchInput !== oldSearchInput) {
      this.props.searchGenres({ genre: newSearchInput })
    }
    this.setState({ oldSearchInput: newSearchInput })
  }

  componentWillReceiveProps = ({ genres, genreIds }) => {
    this.setState({ searchResults: genres })

    const {
      chosenGenres,
      mostPopularGenres,
      searchResults,
      newSearchInput
    } = this.state

    if (genres.length && genreIds.length) {
      chosenGenres.length ? [] : this.setState({ chosenGenres: genreIds })
      mostPopularGenres.length ?
        [] : this.setState({ mostPopularGenres: this.checkIfChosen(genres, genreIds) })
    }

    if (searchResults.length && newSearchInput === '') {
      this.setState({ searchResults: [] })
      this.props.getGenres()
    }
  }

  checkIfChosen = (toLoop, toCheck) => {
    const genreIdsArr = R.pluck('id', toCheck)
    return toLoop.filter(genre => {
      return genreIdsArr.indexOf(genre.id) === -1
    })
  }

  handleButtonClick = (event) => {
    const {
      createChosenReaderGenres,
      updateCurrentReader,
      handleClose,
      getGenres,
      context
    } = this.props

    const { chosenGenres } = this.state
    const genreIds = R.map(R.prop('id'), chosenGenres)
    event.preventDefault()
    this.setState({ newSearchInput: '' })
    createChosenReaderGenres({
      genreIds: genreIds,
      context: context
    })
    updateCurrentReader({ genreIds: chosenGenres })
    handleClose()
    getGenres()
  }

  handleSelectChosenGenre = (genre) => {
    const { chosenGenres, mostPopularGenres, searchResults } = this.state
    const { genres } = this.props

    const indexOfGenre = R.findIndex(R.propEq('id', genre.id))(chosenGenres)
    if (indexOfGenre >= 0) {
      const updatedGenres = R.reject(R.propEq('id', genre.id), chosenGenres)
      const inPopularGenres = R.findIndex(R.propEq('id', genre.id))(genres)
      this.setState({ chosenGenres: [...updatedGenres] })
      // if genre is being removed from chosen list check if it is in popular
      // genres list. If there, render it below chosen genres.
      if (inPopularGenres >= 0) {
        if (searchResults.length) this.setState({ searchResults: [...searchResults, genre] })
        else this.setState({ mostPopularGenres: [...mostPopularGenres, genre] })
      }
    } else {
      this.setState({ chosenGenres: [...chosenGenres, genre] })
    }
  }

  handleSelectPopularGenres = (genre) => {
    const { chosenGenres, mostPopularGenres } = this.state

    const indexOfGenre = R.findIndex(R.propEq('id', genre.id))(mostPopularGenres)
    if (indexOfGenre >= 0) {
      const updatedGenres = R.reject(R.propEq('id', genre.id), mostPopularGenres)
      this.setState({
        chosenGenres: [...chosenGenres, genre],
        mostPopularGenres: [...updatedGenres]
      })
    } else {
      this.setState({ mostPopularGenres: [...mostPopularGenres, genre] })
    }
  }

  handleSelectSearch = () => {
    const { chosenGenres, searchResults } = this.state
    const genreKeys = document.activeElement.getAttribute('value').split('-')
    const genre = {
      id: Number(genreKeys[1]),
      name: genreKeys[0],
    }

    const indexOfGenre = R.findIndex(R.propEq('id', genre.id))(searchResults)
    if (indexOfGenre >= 0) {
      const updatedGenres = R.reject(R.propEq('id', genre.id), searchResults)
      this.setState({
        chosenGenres: [...chosenGenres, genre],
        searchResults: [...updatedGenres]
      })
    } else {
      this.setState({ searchResults: [...searchResults, genre] })
    }
  }

  handleSearchTyping = () => {
    const search = this.refs.search.value
    this.setState({ newSearchInput: search })
    if (search === '') {
      this.setState({ searchResults: [] })
      this.props.getGenres()
    }
  }

  renderGenres = (genres, genreType) => {
    const isChosen = (genreType === 'chosen')
    const isSearch = (genreType === 'search')
    return genres.map((genre, index) => {
      const transformedGenre = {
        id: Number(genre.id),
        name: genre.name
      }

      const inChosenGenres = R.findIndex(R.propEq('id', genre.id))(this.state.chosenGenres)
      const theChip = (
        <Chip
          key={index}
          value={`${genre.name}-${genre.id}`}
          className={isChosen ? 'chosenGenre' : null}
          labelStyle={styles.chipText}
          style={styles.chip}
          onClick={isSearch ? this.handleSelectSearch :
            (isChosen ?
              () => this.handleSelectChosenGenre(transformedGenre) :
              () => this.handleSelectPopularGenres(transformedGenre))
          }
        >
        {
          isChosen ?
          <img style={styles.checkmark} src='/image/checkmark.png' /> :
          <img style={styles.checkmark} src='/image/plus.png' />
        }
          {S.titleize(genre.name)}
        </Chip>
      )

      return (isChosen || (inChosenGenres === -1)) ? theChip : null
    })
  }

  renderBottomGenres = () => {
    const {
      newSearchInput,
      mostPopularGenres,
      searchResults,
      chosenGenres
    } = this.state

    const { genres } = this.props

    if (newSearchInput === '') this.renderGenres(mostPopularGenres, 'popular')
    return searchResults.length ?
      this.renderGenres(this.checkIfChosen(genres, chosenGenres), 'search') :
      this.renderGenres(genres, 'search')
  }

  render() {
    const {
      modalOpen,
      handleClose,
      genreIds,
      genres,
    } = this.props

    const {
      chosenGenres,
      newSearchInput,
    } = this.state

    return (
      <div>
        <Dialog
          bodyClassName='modal-content'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <img
            src='/image/close.png'
            className='general-font center-text signup-modal-x'
            onClick={handleClose}
          /><br />

          <div className='rf-modal center'>
            <h1 className='center-text' style={styles.headerText}>
              Create your Read Feed
            </h1>

            <p className='center-text'>
              {"We'll use this information to suggest new books and authors for you"}
            </p>

            <div style={styles.genreSearch} className='small-12'>
              <form style={styles.inputField} className='form-input-wrapper'>
                <div className='search-icon' />
                <input
                  value={newSearchInput}
                  className='form-input'
                  type='text'
                  ref='search'
                  placeholder='Search for categories to add'
                  onChange={this.handleSearchTyping}
                />
              </form>
            </div>

            <div>
              {genreIds ? this.renderGenres(chosenGenres, 'chosen') : null}
              <br />
              {genres ? this.renderBottomGenres() : null}
            </div> <br />

            <div className='center-text'>
              <PrimaryButton
                label='Save'
                onClick={this.handleButtonClick}
              />
            </div>
          </div>
        </ Dialog>
      </div>
    )
  }
}

const mapStateToProps = ({ genres }) => {
  return { genres }
}

const mapDispatchToProps = {
  updateCurrentReader,
  createChosenReaderGenres,
  getGenres,
  searchGenres,
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(FavoriteGenresModal))
