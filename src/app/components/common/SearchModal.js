import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Dialog } from 'material-ui';
import R from 'ramda';
import { debounce } from 'lodash';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { PageScroller } from '../common';
import { Colors } from '../../constants/style';
import { Search } from '../../redux/actions';

const { mainSearch, cleanSearchState } = Search;

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
};

class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      isFilterOpen: false,
      selectedFilter: 'Book',
      selectedSubFilter: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { term, filter } = nextProps;
    if (!this.props.modalOpen && nextProps.modalOpen && term && filter) {
      this.setState({ searchTerm: term, selectedFilter: filter, selectedSubFilter: false });
      this.debouncedSearch(null);
      if (this.props.resetSearch) this.props.resetSearch(filter);
    }
  }

  handleOnChange = R.curry((field, e) => {
    e.persist();
    this.setState({
      [field]: e.target.value,
      isFilterOpen: false,
    });
    this.debouncedSearch(e);
  })

  closeFilterModal = (event) => {
    event.preventDefault();
    this.setState({
      isFilterOpen: false,
    });
  }

  debouncedSearch = debounce((event) => {
    if (event && event.target.value.length > 3) {
      this.props.cleanSearchState();
      let perPage = 20
      const filterName = this.translateType(this.state.selectedFilter);
      if (filterName == 'books'){
          perPage = 30
      }
      if (this.state.selectedFilter === 'Select Filter') {
        this.props.mainSearch({
          term: event.target.value,
          type: 'book',
          page: 1,
          perPage: perPage,
        });
      } else {
        this.props.mainSearch({
          term: event.target.value,
          type: this.getSanitizedFilter(this.state.selectedFilter),
          subFilter: this.state.selectedSubFilter,
          page: 1,
          perPage: perPage,
        });
      }
    } else {
      this.props.cleanSearchState();
      this.props.mainSearch({
        term: this.state.searchTerm,
        type: this.getSanitizedFilter(this.state.selectedFilter),
        page: 1,
        perPage: 20,
      });
    }
  }, 1000)

  handleFilter = (event) => {
    event.preventDefault();
    if (!this.state.isFilterOpen) {
      this.setState({
        isFilterOpen: true,
      });
    } else {
      this.setState({
        isFilterOpen: false,
      });
    }
  }

  getSanitizedFilter = (filter) => {
    if (filter === 'Author') {
      return 'author';
    } else if (filter === 'Book') {
      return 'book';
    } else if (filter === 'Reader') {
      return 'reader';
    } else if (filter === 'Publisher') {
      return 'publisher';
    }
    return 'book';
  }

  handleSelectFilter = (filterType, subFilter) => {
    const selectedSubFilter = subFilter ? subFilter.toLowerCase() : false;
    this.setState({
      selectedFilter: filterType,
      selectedSubFilter,
      isFilterOpen: false,
    });
    if (filterType !== 'Select Filter' && this.state.searchTerm.length > 3) {
      this.props.cleanSearchState();
      this.props.mainSearch({
        term: this.state.searchTerm,
        type: this.getSanitizedFilter(filterType),
        subFilter: selectedSubFilter,
        page: 1,
        perPage: 30,
      });
    }
  }

  renderSearchResults = () => {
    const searchTerms = this.props.search;
    if (searchTerms) {
      let readerResults;
      let authorResults;
      let publisherResults;
      let bookResults;

      if (searchTerms.readers && searchTerms.readers.length ) {
        readerResults = searchTerms.readers.map((reader, index) => {
          return (
            <div key={reader.id} className='result-container'>
              <div className='image-container'>
                <Link to={`/profile/${reader.slug}`} onClick={() => this.props.handleClose()}>
                  <figure className='search-result-figure'>
                    <img
                      src={reader.image}
                      className='search-result-image'
                      alt={reader.slug}
                    />
                  </figure>
                </Link>
              </div>
              <div className='search-result-info-container'>
                <Link to={`/profile/${reader.slug}`} onClick={() => this.props.handleClose()}>
                  {reader.firstName} {reader.lastName}
                </Link>
                <br/>
                <Link
                  className='search-type-anchor'
                  to={`/profile/${reader.slug}`}
                  onClick={() => this.props.handleClose()}
                >
                  Personal Library
                </Link>
              </div>
            </div>
          )
        })
      }

      if (searchTerms.authors && searchTerms.authors.length) {
        authorResults = searchTerms.authors.map((author, index) => {
          return (
            <div key={author.id} className='result-container'>
              <div className='image-container'>
                <a href={author.url}>
                  <figure className='search-result-figure'>
                    <img
                      src={author.image}
                      className='search-result-image'
                      alt={author.slug}
                    />
                  </figure>
                </a>
              </div>
              <div className='search-result-info-container'>
                <a href={author.url}>
                  {author.firstName} {author.lastName}
                </a>
                <br/>
                <a className='search-type-anchor' href={author.url}>
                  Author
                </a>
              </div>
            </div>
          )
        })
      }

      if (searchTerms.books && searchTerms.books.results) {
        bookResults = searchTerms.books.results.map((book, index) => {
          return (
            <div key={book.id} className='result-container'>
              <div className='image-container'>
                <Link to={`/book/${book.slug}`} onClick={() => this.props.handleClose()}>
                  <figure className='search-result-figure'>
                    <img
                      src={book.imageUrl}
                      className='search-result-image'
                      alt={book.slug}
                    />
                  </figure>
                </Link>
              </div>
              <div className='search-result-info-container'>
                <Link to={`/book/${book.slug}`} onClick={() => this.props.handleClose()}>
                  {book.title}
                </Link>
                <br/>
                <Link
                  className='search-type-anchor'
                  to={`/book/${book.slug}`}
                  onClick={() => this.props.handleClose()}
                >
                  {book.writtenBy}
                </Link>
                <br/>
                <Link
                  className='search-type-anchor'
                  to={`/book/${book.slug}`}
                  onClick={() => this.props.handleClose()}
                >
                  {book.binding} {book.pages}
                </Link>
              </div>
            </div>
          )
        })
      }

      if (searchTerms.publishers && searchTerms.publishers.length) {
        publisherResults = searchTerms.publishers.map((publisher, index) => {
          return (
            <div key={publisher.id} className='result-container'>
              <div className='image-container'>
                <a href={publisher.url}>
                  <figure className='search-result-figure'>
                    <img
                      src={publisher.image}
                      className='search-result-image'
                      alt={publisher.slug}
                    />
                  </figure>
                </a>
              </div>
              <div className='search-result-info-container'>
                <a href={publisher.url}>
                  {publisher.title}
                </a>
                <br/>
                <a className='search-type-anchor' href={publisher.url}>
                  Publisher
                </a>
              </div>
            </div>
          )
        })
      }

      return (
        <div className='search-results'>
          {readerResults ? (
            <div className='search-reader-results'>{readerResults}</div>
          ) : null}
          {authorResults ? (
            <div className='search-author-results'>{authorResults}</div>
          ) : null}
          {publisherResults ? (
            <div className='search-publisher-results'>{publisherResults}</div>
          ) : null}
          {bookResults ? (
            <div className='search-book-results'>{bookResults}</div>
          ) : null}
        </div>
      )
    }
    return (
      <div>
        {this.state.searchTerm !== '' ?
        (
          <RefreshIndicator
            size={50}
            left={70}
            top={0}
            loadingColor={Colors.blue}
            status='loading'
            style={styles.refresh}
          />
        ) : null}
      </div>
    )
  }

  handleEnterButton = (event) => {
    if (event.which === 13) {
      event.preventDefault()
    }
  }

  fetchHandler = (params) => {
    this.props.mainSearch({
      term: this.state.searchTerm,
      type: this.getSanitizedFilter(this.state.selectedFilter),
      subFilter: this.state.selectedSubFilter,
      ...params,
    });
  }

  translateType = (type) => {
    if (type === 'Book') return 'books';
    if (type === 'Author') return 'authors';
    if (type === 'Reader') return 'readers';
    if (type === 'Publisher') return 'publishers';
    return 'books';
  }

  render() {
    const {
      modalOpen,
      handleClose,
      search,
    } = this.props;

    const filterName = this.translateType(this.state.selectedFilter);

    const selectedFilter = () => {
      if (this.state.selectedSubFilter) {
        let selectedSubFilter
        if (this.state.selectedSubFilter === 'ean') {
          selectedSubFilter = 'ISBN';
        } else {
          selectedSubFilter = this.state.selectedSubFilter.replace(/\b\w/, (m) => {
            return m.toUpperCase()
          })
        }
        return this.state.selectedFilter + ' / ' + selectedSubFilter
      }
      return this.state.selectedFilter
    }

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
        >
          <img
            src='/image/close.png'
            className='general-font center-text search-modal-x'
            onClick={handleClose}
          />
          <div className='search-modal-container'>
            <img
              className='search-modal-logo'
              src='/image/logo.png'
            />
            <div style={styles.formContainer} onKeyPress={this.handleEnterButton}>
              <form className='form-wrapper general-font'>
                <div className='search-input-container'>
                  <div className='search-main-search-filters'>
                    <div className='filter-inside-input'>
                      <a
                        onClick={this.handleFilter}
                      >
                        {selectedFilter()}
                      </a>
                    </div>
                    {
                      this.state.isFilterOpen ?
                      (
                        <ul className='search-main-search-filters-container'>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Select Filter')}
                            >
                              -----
                            </a>
                          </li>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Book')}
                            >
                              Book
                            </a>
                            <ul className='book-search-filter'>
                              <li>
                                <a
                                  onClick={() => this.handleSelectFilter('Book', 'Title')}
                                >
                                  Title
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() => this.handleSelectFilter('Book', 'EAN')}
                                >
                                  ISBN
                                </a>
                              </li>
                              <li>
                                <a
                                  onClick={() => this.handleSelectFilter('Book', 'Author')}
                                >
                                  Author
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Reader')}
                            >
                              Reader
                            </a>
                          </li>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Author')}
                            >
                              Buzz Author
                            </a>
                          </li>
                          <li className='search-main-search-filters-list'>
                            <a
                              onClick={() => this.handleSelectFilter('Publisher')}
                            >
                              Publisher
                            </a>
                          </li>
                        </ul>
                      ) : null
                    }
                  </div>
                  <input
                    type='text'
                    className='search-input'
                    placeholder='Search...'
                    onClick={this.closeFilterModal}
                    onChange={this.handleOnChange('searchTerm')}
                    value={this.state.searchTerm}
                    autoFocus
                  />
                </div>
              </form>
            </div>
            <PageScroller
              clsName="search-results-contianer"
              fetchHandler={this.fetchHandler}
              isLocked={
                search && search.isLocked ?
                search.isLocked :
                false
              }
              currentPage={
                search &&
                search[filterName] &&
                search[filterName].page ?
                  search[filterName].page :
                  1
              }
              perPage={
                  filterName == 'books' ? 30 : 20
              }
              onScrollPerc={
                  0.6
              }
            >
              { this.renderSearchResults() }
            </PageScroller>
          </div>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({
  search,
}) => ({
  search,
});

export default connect(mapStateToProps, { mainSearch, cleanSearchState })(SearchModal);
