import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dialog, } from 'material-ui'
import R from 'ramda'
import { Colors } from '../../constants/style'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Search } from '../../redux/actions'

const { mainSearch } = Search

const styles = {
  modalBody: {
    marginTop: -80,
  },
  modalContent: {
    maxWidth: '100%',
    width: '100%',
    opacity: 0.93,
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
}

class SearchModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange = R.curry((field, e) => {
    this.setState({ [field]: e.target.value })
    if (e.target.value.length > 3) {
      this.props.mainSearch(e.target.value)
    }
  })

  renderSearchResults = () => {
    if (this.props.searchResults.counts) {
      return <div> Search Results Here</div>
    }
    return (
      <RefreshIndicator
        size={50}
        left={70}
        top={0}
        loadingColor={Colors.blue}
        status='loading'
        style={styles.refresh}
      />
    )
  }
  render() {
    const {
      modalOpen,
      handleClose,
    } = this.props

    const {
      searchTerm,
    } = this.state

    return (
      <div>
        <Dialog
          bodyClassName='search-modal-content'
          bodyStyle={styles.modalBody}
          contentStyle={styles.modalContent}
          modal={false}
          open={modalOpen}
          onRequestClose={handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={true}
        >
          <img
            src='./image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='search-modal-container'>
            <img
              className='search-modal-logo'
              src='./image/logo.png'
            />
            <div style={styles.formContainer}>
              <form className='form-wrapper general-font'>
                <div className='search-input-container'>
                  <input
                    type='text'
                    className='search-input'
                    placeholder='Search...'
                    onChange={this.handleOnChange('searchTerm')}
                    value={searchTerm}
                  />
                </div>
              </form>
              <p className='advanced-search-pharagraph'>
                Can't find what you are looking for? Try with our
                <a href=''> Advanced Search </a>
              </p>
            </div>
            <div className='search-results-contianer'>
              { this.renderSearchResults() }
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchResults: state.search
  }
}

export default connect(mapStateToProps, { mainSearch })(SearchModal)
