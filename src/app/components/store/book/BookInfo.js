import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Follow, Store, Social, Common } from '../../../redux/actions'
import { Numbers } from '../../../utils'
import { Search } from '../../../services/api'
import Rating from 'react-rating'
import ReplyIcon from 'material-ui/svg-icons/content/reply'
import { ShareButtons, generateShareIcon } from 'react-share'
import R from 'ramda'
import { debounce } from 'lodash'
import { Loaders, SuggestionList } from '../../common'
import Scroll from 'react-scroll'
import ReactPlayer from 'react-player'
import Dialog from 'material-ui/Dialog'

const { showAlert } = Common
const { followOrUnfollow } = Follow
const { shareBook } = Social
const {
  addToCart,
  addToLibrary,
  removeFromLibrary,
  addToWishList,
  removeFromWishList
} = Store
const { search } = Search
const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} = ShareButtons
const { StoreSpinner } = Loaders
const { parseFloatToUSD, parseIntToLocale } = Numbers

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const GooglePlusIcon = generateShareIcon('google')
const LinkedinIcon = generateShareIcon('linkedin')
const mentionPattern = /\B@(?!Reader|Author|Publisher|Book)\w+\s?\w+/gi

const ScrollLink = Scroll.Link

class BookInfo extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      addToCartProcessing: false,
      addToCartClicked: false,
      isBookTypeSelected: false,
      isAlertDisplayed: false,
      isSharePopUpDisplayed: false,
      isGoReadShareClicked: false,
      mentions: '',
      onProcessMentions: [],
      processedMentions: [],
      commentText: '',
      suggestions: [],
      showSuggestions: false,
      isWishlistHover: false,
      isLibraryHover: false,
      isModifyingLibrary: false,
      isModifyingWishlist: false,
      isModifyingFollow: false,
      dialogOpen: false,
      isBookFullDescription: false,
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleAddToLibrary = this.handleAddToLibrary.bind(this)
    this.handleRemoveFromLibrary = this.handleRemoveFromLibrary.bind(this)
    this.handleAddToWishList = this.handleAddToWishList.bind(this)
    this.handleRemoveFromWishList = this.handleRemoveFromWishList.bind(this)
    this.handleFollowOrUnFollow = this.handleFollowOrUnFollow.bind(this)
    this.handleShareBook = this.handleShareBook.bind(this)
    this.handleBookTypeSelect = this.handleBookTypeSelect.bind(this)
    this.handleShowAlert = this.handleShowAlert.bind(this)
    this.handleShareClick = this.handleShareClick.bind(this)
    this.handleGoReadClick = this.handleGoReadClick.bind(this)
    this.handleGoReadClose = this.handleGoReadClose.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
    this.replaceMention = this.replaceMention.bind(this)
    this.getMentions = debounce(this.getMentions, 250)
    this.showDialog = this.showDialog.bind(this)
    this.hideDialog = this.hideDialog.bind(this)
  }

  componentWillMount() {
    const { bookInfo } = this.props
    if (bookInfo && bookInfo.isOnCart) {
      this.setState({ addToCartClicked: true })
    }
  }

  showDialog = () => this.setState({ dialogOpen: true })

  hideDialog = () => this.setState({ dialogOpen: false })

  truncInfo = (text, limit) => {
    return text.length >= limit ? `${text.slice(0, limit)}...` : text
  }

  calculateSaving = (shopPrice, listPrice) => {
    return parseFloatToUSD(Math.round((((listPrice - shopPrice) * 100) / listPrice)))
  }

  renderRating = (rating) => {
    return (
      <Rating
        readonly={true}
        initialRate={rating}
        full={<img className='bookpage-rating-icon' src='/image/star-rating.png' />}
        empty={<img className='bookpage-rating-icon' src='/image/star-empty.png' />}
      />
    )
  }

  handleAddToCart = (event) => {
    const { isUserLogged } = this.props
    event.preventDefault()
    if (!this.state.addToCartProcessing && !this.state.addToCartClicked) {
      this.setState({ addToCartProcessing: true }, ()=> {
        this.props.addToCart(this.props.bookInfo.id, isUserLogged)
          .then(()=>{
            this.setState({
              addToCartClicked: true,
              addToCartProcessing: false
            })
          })
          .catch(()=>{
            this.setState({
              addToCartClicked: false,
              addToCartProcessing: false
            })
          })
      })
    }
  }

  handleAddToLibrary = (event) => {
    event.preventDefault()
    const { bookInfo, isUserLogged } = this.props
    this.setState({ isModifyingLibrary: true })
    this.props.addToLibrary(bookInfo.ean, bookInfo.slug, isUserLogged)
      .then(()=>{this.setState({ isModifyingLibrary: false })})
      .catch(()=>{this.setState({ isModifyingLibrary: false })})
    this.setState({ isLibraryHover: false })
  }

  handleRemoveFromLibrary = (event) => {
    event.preventDefault()
    const { bookInfo, isUserLogged } = this.props
    this.setState({ isModifyingLibrary: true })
    this.props.removeFromLibrary(bookInfo.id, bookInfo.slug, isUserLogged)
      .then(()=>{this.setState({ isModifyingLibrary: false })})
      .catch(()=>{this.setState({ isModifyingLibrary: false })})
  }

  handleAddToWishList = (event) => {
    event.preventDefault()
    const { bookInfo, isUserLogged, currentReaderId } = this.props
    this.setState({ isModifyingWishlist: true })
    this.props.addToWishList(bookInfo.ean, currentReaderId, bookInfo.slug, isUserLogged)
      .then(()=>{this.setState({ isModifyingWishlist: false })})
      .catch(()=>{this.setState({ isModifyingWishlist: false })})
    this.setState({ isWishlistHover: false })
  }

  handleRemoveFromWishList = (event) => {
    event.preventDefault()
    const { bookInfo, isUserLogged, currentReaderId } = this.props
    this.setState({ isModifyingWishlist: true })
    this.props.removeFromWishList(bookInfo.ean, currentReaderId, bookInfo.slug, isUserLogged)
      .then(()=>{this.setState({ isModifyingWishlist: false })})
      .catch(()=>{this.setState({ isModifyingWishlist: false })})
  }

  handleFollowOrUnFollow = (event) => {
    event.preventDefault()
    const { bookInfo } = this.props
    if (bookInfo.authors.length) {
      this.setState({ isModifyingFollow: true })
      this.props.followOrUnfollow({
        follow: !bookInfo.authors[0].userIsFollower,
        context: 'bookpage',
        userType: 'AUTHOR',
        ids: [bookInfo.authors[0].id],
        slug: bookInfo.slug
      })
        .then(()=>{this.setState({ isModifyingFollow: false })})
        .catch(()=>{this.setState({ isModifyingFollow: false })})
    }
  }

  handleShowAlert = () => {
    this.setState({ isAlertDisplayed: !this.state.isAlertDisplayed })
  }

  handleBookTypeSelect = (event) => {
    event.preventDefault()
    this.setState({
      isBookTypeSelected: true,
      isAlertDisplayed: false,
    })
  }

  handleShareClick = (event) => {
    event.preventDefault()
    this.setState({ isSharePopUpDisplayed: !this.state.isSharePopUpDisplayed })
  }

  handleHideShareClick = (event) => this.setState({ isSharePopUpDisplayed: false })

  handleShareBook = (shareType, contentType, contentId, shareComment) => {
    let data = {}
    if (shareComment) {
      const {
          mentions
        } = this.refreshMentions(shareComment, this.state.processedMentions)
      data = {
        shareType,
        comment: shareComment,
        mentions: mentions,
        contentType,
      }
    } else {
      data = {
        shareType,
        contentType,
      }
    }
    if (shareType === 5) {
      this.setState({ isGoReadShareClicked: false, })
    }
    this.props.shareBook(data, contentId)
      .then(res => {
        this.props.showAlert({
          message: 'Your book was shared successfully!',
          type: 'success'
        })
      })
      .catch(() => {
        this.props.showAlert({
          message: 'Your book share failed! Please, try again',
          type: 'error'
        })
      })
  }

  handleGoReadClick = (event) => {
    event.preventDefault()
    this.setState({
      isGoReadShareClicked: true,
      isSharePopUpDisplayed: false,
    })
  }

  handleGoReadClose = (event) => {
    event.preventDefault()
    this.setState({
      isGoReadShareClicked: false,
    })
  }

  handleCommentChange = (event) => {
    event.preventDefault()
    const body = event.target.value
    const { showSuggestions, onProcessMentions } = this.checkMentions(body)
    const {
      processedMentions,
      mentions
    } = this.refreshMentions(body, this.state.processedMentions)
    this.setState({
      commentText: body,
      mentions,
      onProcessMentions,
      processedMentions,
      showSuggestions,
    })
  }

  checkMentions = (latestBody) => {
    const result = {
      showSuggestions: false,
      onProcessMentions: latestBody.match(mentionPattern)
    }
    if (result.onProcessMentions && result.onProcessMentions.length > 0) {
      this.getMentions(R.last(result.onProcessMentions).replace('@', ''))
    }
    return result
  }

  getMentions = (query) => {
    search({
      author: query,
      reader: query,
      book: query,
      publisher: query
    }).then((res) => this.setState({
      suggestions: res.data,
      showSuggestions: true
    }))
  }

  handleSuggestionClick = (event) => {
    event.stopPropagation()
    const { type, display, contenttype, id } = event.target.dataset
    const body = this.replaceMention(type, display, contenttype, id)
    const { showSuggestions, onProcessMentions } = this.checkMentions(body)
    const { processedMentions, mentions } = this.refreshMentions(body, R.concat(
      this.state.processedMentions,
      [{
        display: `@${type}:${display}`,
        mention: `@[${contenttype}:${id}]`
      }]
    ))
    this.setState({
      commentText: body,
      mentions,
      processedMentions,
      showSuggestions,
      onProcessMentions,
    })
  }

  refreshMentions = (updatedBody, updatedProcessedMentions) => {
    let processedMentions = R.clone(updatedProcessedMentions)
    let mentions = updatedBody
    // Beware of indexOf 0 in the next line
    processedMentions = processedMentions.filter((el) => mentions.indexOf(el.display) >= 0)
    processedMentions.map(function (el) {
      mentions = mentions.replace(el.display, el.mention)
    })
    return {
      processedMentions,
      mentions
    }
  }

  replaceMention = (type, display, contentType, id) => {
    const { commentText, onProcessMentions } = this.state
    const lastMention = R.last(onProcessMentions)
    const updatedBody = commentText.replace(lastMention, `@${type}:${display} `)
    return updatedBody
  }

  handleWishlistHover = () => this.setState({ isWishlistHover: true })

  handleWishlistNoHover = () => this.setState({ isWishlistHover: false })

  handleLibraryHover = () => this.setState({ isLibraryHover: true })

  handleLibraryNoHover = () => this.setState({ isLibraryHover: false })

  handleBookReadMore = () => {
    const { isBookFullDescription } = this.state
    this.setState({ isBookFullDescription: !isBookFullDescription })
  }

  render() {
    const { bookInfo, isUserLogged } = this.props
    const {
      addToCartClicked,
      isSharePopUpDisplayed,
      commentText,
      isWishlistHover,
      isLibraryHover,
      isBookFullDescription,
    } = this.state
    return (
      <div className='row bookpage-info-main-container'>
        <div className='small-12 large-6 large-offset-1 columns bookpage-info-left-element'>
          <div className='bookpage-info-left-top'>
            <figure className='bookpage-info-figure'>
              <img src={bookInfo.imageUrl}/>
            </figure>
            <div className='bookpage-book-description-container'>
              <h4 className='bookpage-book-title'>
                {this.truncInfo(bookInfo.title, 45)}
              </h4>
              <div className='bookpage-author-container'>
                <figure className='bookpage-author-badge-figure'>
                  <a href={bookInfo.authors.length ? bookInfo.authors[0].url : ''}>
                    <img src={bookInfo.authors.length ? bookInfo.authors[0].imageUrl : ''}/>
                  </a>
                </figure>
                <div className='bookpage-author-info'>
                  <h5 className='bookpage-author-name'>
                    <a href={bookInfo.authors.length ? bookInfo.authors[0].url : ''}>
                      {bookInfo.authors.length ? bookInfo.authors[0].fullname : ''}
                    </a>
                  </h5>
                  { isUserLogged ?
                      <a
                        className={
                          bookInfo.authors.length && bookInfo.authors[0].userIsFollower ?
                            'bookpage-author-follow-action-active' :
                            'bookpage-author-follow-action'
                        }
                        onClick={this.handleFollowOrUnFollow}
                      >
                        {
                          this.state.isModifyingFollow ?
                            <div className='loading-animation-store-inverted' /> :
                            bookInfo.authors.length && bookInfo.authors[0].userIsFollower ?
                              'Following' :
                              'Follow'
                        }
                      </a> :
                      <a className='bookpage-author-follow-action'>Follow</a>
                  }
                </div>
              </div>
              <ScrollLink
                to='ratesAndReviews'
                smooth={true}
                offset={-100}
                duration={500}
                style={{ cursor: 'pointer' }}
              >
                <div className='bookpage-rating-container'>
                  <span className='rating'>
                    {this.renderRating(Math.round(bookInfo.rating.average))}
                  </span>
                  <span className='review-counts'>
                    {bookInfo.rating.count}
                  </span>
                  <span className='review-counts'>
                    {bookInfo.rating.count === 0 || bookInfo.rating.count > 1 ?
                      'Reviews' : 'Review'
                    }
                  </span>
                </div>
              </ScrollLink>
              {bookInfo.video ?
                (
                  <div className='bookpage-trailer-btn'>
                    <a onClick={this.showDialog}>
                      <span>Watch the trailer</span>
                      <span className='icon-play3' />
                    </a>
                    <Dialog
                      title={`${this.truncInfo(bookInfo.title, 25)} trailer`}
                      onRequestClose={this.handleClose}
                      modal={true}
                      open={this.state.dialogOpen}
                      onRequestClose={this.hideDialog}
                    >
                      <div
                        onClick={this.hideDialog}
                        className='icon-cross close-vid-dialog'
                      />
                      <ReactPlayer
                        className='video-player-trailer'
                        controls={true}
                        url={bookInfo.video}
                      />
                    </Dialog>
                  </div>
                ) : null
              }
              <div className='bookpage-book-excerpt-container-desktop'>
                <p className='bookpage-book-excerpt'>
                  {isBookFullDescription ?
                    bookInfo.description :
                    this.truncInfo(bookInfo.description, 350)}
                  {bookInfo.description.length > 350 ? (
                  <a
                    className='bookpage-book-excerpt-readmore-btn'
                    onClick={this.handleBookReadMore}
                  >
                    Read more
                  </a>) : null }
                </p>
              </div>
            </div>
          </div>
          <div className='bookpage-book-excerpt-container-mobile'>
            <p className='bookpage-book-excerpt'>
              {isBookFullDescription ?
                bookInfo.description :
                this.truncInfo(bookInfo.description, 350)}
              {bookInfo.description.length > 350 ? (
              <a
                className='bookpage-book-excerpt-readmore-btn'
                onClick={this.handleBookReadMore}
              >
                Read more
              </a>) : null }
            </p>
          </div>
          <div className='bookpage-info-left-bottom'>
            {
              bookInfo.isOnStock ?
                <div
                  className={
                    bookInfo.isOnWishlist ?
                      isWishlistHover ?
                        'bookpage-bottom-action-btn-active' :
                        'bookpage-bottom-action-btn' :
                      'bookpage-bottom-action-btn'
                  }
                  onClick={
                    bookInfo.isOnWishlist ?
                      this.handleRemoveFromWishList :
                      this.handleAddToWishList
                  }
                  onMouseEnter={
                    bookInfo.isOnWishlist ?
                      this.handleWishlistHover :
                      null
                  }
                  onMouseLeave={
                    bookInfo.isOnWishlist ?
                      this.handleWishlistNoHover :
                      null
                  }
                >
                  <figure>
                    {
                      this.state.isModifyingWishlist ?
                        <StoreSpinner /> :
                        <img
                          src={
                            bookInfo.isOnWishlist ?
                              isWishlistHover ?
                                '/image/add-to-wishlist.svg' :
                                '/image/wish-list-icon.svg' :
                              '/image/add-to-wishlist.svg'
                          }
                        />
                    }
                  </figure>
                  <span
                    className={
                      bookInfo.isOnWishlist ?
                        'bookpage-action-btn-active-text' :
                        isWishlistHover ?
                          'bookpage-action-btn-active-text' :
                          ''
                    }
                  >
                    {
                      bookInfo.isOnWishlist ?
                        isWishlistHover ?
                          'Remove from Wish List' :
                          'Book in Wish List' :
                        'Add to Wish List'
                    }
                  </span>
                </div> :
                null
            }
            {
              <div
                className={
                  bookInfo.isOnLibrary ?
                    isLibraryHover ?
                      'bookpage-bottom-action-btn-active' :
                      'bookpage-bottom-action-btn' :
                    'bookpage-bottom-action-btn'
                }
                onClick={
                  bookInfo.isOnLibrary ?
                    this.handleRemoveFromLibrary :
                    this.handleAddToLibrary
                }
                onMouseEnter={
                  bookInfo.isOnLibrary ?
                    this.handleLibraryHover :
                    null
                }
                onMouseLeave={
                  bookInfo.isOnLibrary ?
                    this.handleLibraryNoHover :
                    null
                }
              >
                <figure>
                  {
                    this.state.isModifyingLibrary ?
                      <StoreSpinner /> :
                      <img
                        src={
                          bookInfo.isOnLibrary ?
                            isLibraryHover ?
                              '/image/add-to-library.svg' :
                              '/image/added-to-library.svg' :
                            '/image/add-to-library.svg'
                        }
                      />
                  }
                </figure>
                <span
                  className={
                    bookInfo.isOnLibrary ?
                     'bookpage-action-btn-active-text' :
                     ''
                  }
                >
                  {
                    bookInfo.isOnLibrary ?
                      isLibraryHover ?
                       'Remove from Library' :
                       'In Your Library' :
                      'Add to Library'
                  }
                </span>
              </div>
            }
            <div className='bookpage-bottom-action-btn' onClick={this.handleShareClick}>
              <ReplyIcon />
              <span>Share</span>
              {isSharePopUpDisplayed ?
                (
                  <ul
                    className='bookpage-share-buttons-container'
                    onMouseLeave={this.handleHideShareClick}
                  >
                    <li
                      className='bookpage-share-buttons-li'
                      onClick={() => this.handleShareBook(1, 'bookpage', bookInfo.id)}
                    >
                      <FacebookShareButton
                        url={bookInfo.url}
                        title={bookInfo.title}
                        description={this.truncInfo(bookInfo.description, 100)}
                        className='facebook-share-button pointer-hand'
                      >
                        <FacebookIcon
                          size={32}
                          round
                        />
                      </FacebookShareButton>
                    </li>

                    <li
                      className='bookpage-share-buttons-li'
                      onClick={() => this.handleShareBook(2, 'bookpage', bookInfo.id)}
                    >
                      <TwitterShareButton
                        url={bookInfo.url}
                        title={bookInfo.title}
                        className='twitter-share-button pointer-hand'
                      >
                        <TwitterIcon
                          size={32}
                          round
                        />
                      </TwitterShareButton>
                    </li>

                    <li
                      className='bookpage-share-buttons-li'
                      onClick={() => this.handleShareBook(4, 'bookpage', bookInfo.id)}
                    >
                      <LinkedinShareButton
                        url={bookInfo.url}
                        title={bookInfo.title}
                        description={this.truncInfo(bookInfo.description, 100)}
                        windowWidth={750}
                        windowHeight={600}
                        className='linkedin-share-button pointer-hand'
                      >
                        <LinkedinIcon
                          size={32}
                          round
                        />
                      </LinkedinShareButton>
                    </li>

                    <li
                      onClick={() => this.handleShareBook(3, 'bookpage', bookInfo.id)}
                      className='bookpage-share-buttons-li'
                    >
                      <GooglePlusShareButton
                        url={bookInfo.url}
                        className='google-plus-share-button pointer-hand'
                      >
                        <GooglePlusIcon
                          size={32}
                          round
                        />
                      </GooglePlusShareButton>
                    </li>

                    {isUserLogged ?
                      (
                        <li
                          onClick={this.handleGoReadClick}
                          className='bookpage-share-buttons-li-gr'
                        >
                          <img
                            className='logo-share-img pointer-hand'
                            src='/image/logo_share.png'
                          />
                        </li>
                      ) : null
                    }
                  </ul>
                ) : null
              }
            </div>
          </div>
        </div>
        {this.state.isGoReadShareClicked ?
          (
            <div className='goread-share-popup-container'>
              <div className='goread-share-popup-tile'>
                <img
                  src='/image/close.png'
                  className='goread-share-popup-tile-close'
                  onClick={this.handleGoReadClose}
                />
                <div className='goread-share-popup-tile-comment'>
                  <textarea
                    onChange={this.handleCommentChange}
                    className='goread-share-popup-tile-comment-area'
                    placeholder='Write your comment here...'
                    value={commentText}
                    autoFocus
                  />
                  {this.state.showSuggestions ?
                    (
                      <SuggestionList
                        entries={this.state.suggestions}
                        onMentionListClick={this.handleSuggestionClick}
                      />
                    ) : null
                  }
                </div>
                <div className='book-tile-container'>
                  <figure className='book-figure'>
                    <img className='book-img' src={bookInfo.imageUrl} alt=''/>
                  </figure>
                  <div className='book-content'>
                    <h2 className='book-title'>{bookInfo.title ?
                      this.truncInfo(bookInfo.title, 75) : null}
                    </h2>
                    <h4 className='book-author'>by {bookInfo.authors[0].fullname}</h4>
                    <div className='book-rating-container'>
                      {this.renderRating(Math.round(bookInfo.rating.average))}
                    </div>
                  </div>
                </div>
                <div className='post-excerpt-container'>
                  <p className='post-excerpt-pharagraph'>
                    {bookInfo.description && bookInfo.description !== 'None' ?
                      this.truncInfo(bookInfo.description, 225) : null
                    }
                    <a href={`/book/${bookInfo.slug}`} className='post-readmore-anchor'>
                      Read more
                    </a>
                  </p>
                </div>
                <a
                  onClick={() => this.handleShareBook(5, 'bookpage', bookInfo.id, commentText)}
                  className='goread-share-popup-comment-submit'
                >
                  Share it!
                </a>
              </div>
            </div>
          ) : null
        }
        <div className='small-12 large-4 columns end bookpage-info-right-element'>
          <div className='bookpage-info-right-element-main-container'>
            {/* <span className='bookpage-book-details-cover'> Paperback </span> */}
            <h3 className='bookpage-book-details-price'>
              {
                bookInfo.isOnSale ?
                `${parseFloatToUSD(bookInfo.onSalePrice)}` :
                `${parseFloatToUSD(bookInfo.shopPrice)}`
              }
              </h3>
            {bookInfo.isOnSale ?
              (
                <div className='bookpage-book-details-saving-container'>
                  <span className='bookpage-book-details-saving-old-price'>
                    {`${parseFloatToUSD(bookInfo.shopPrice)}`}
                  </span>
                      |
                      <span className='bookpage-book-details-saving-percentage'>
                    Save %{this.calculateSaving(bookInfo.onSalePrice, bookInfo.shopPrice)}
                  </span>
                </div>
              ) : null}
            <div className='bookpage-book-details-litcoin-price-container'>
              <span className='bookpage-book-details-litcoin-price-prefix'>
                Retail Price:
              </span>
              <div className='bookpage-book-details-litcoin-price'>
                <span className='bookpage-book-details-litcoin-price-text'>
                  {bookInfo.listPrice ? `${parseFloatToUSD(bookInfo.listPrice)}` : null}
                </span>
              </div>
            </div>
            <div className='bookpage-book-details-litcoin-price-container'>
              <span className='bookpage-book-details-litcoin-price-prefix'>
                Litcoin Price:
              </span>
              <div className='bookpage-book-details-litcoin-price'>
                <span className='bookpage-book-details-litcoin-price-text'>
                  {bookInfo.priceInLitcoins ? parseIntToLocale(bookInfo.priceInLitcoins) : null}
                </span>
                <img className='litcoin-img' src='/image/litcoin.png' />
              </div>
            </div>
            <div className='bookpage-book-details-paper-type-selector-container'>
              {/* <ul className='bookpage-book-details-paper-type-selector'>
                <li
                  className={isBookTypeSelected ?
                    'bookpage-book-details-paper-type-slctd' : 'bookpage-book-details-paper-type'
                  }
                  onClick={this.handleBookTypeSelect}
                >
                  <span className='bookpage-book-details-paper-type-text'>
                    Paperback
                  </span>
                  <span className='bookpage-book-details-paper-type-price'>
                    {`$${bookInfo.shopPrice}`}
                  </span>
                  {!addToCartClicked && isAlertDisplayed ? (
                    <div className='bookpage-book-details-paper-type-alert'>
                      <span>Please Select an option</span>
                    </div>
                  ) : null}
                </li>
                <li className='bookpage-book-details-paper-type'>
                  <span className='bookpage-book-details-paper-type-text'>
                    Hardcover
                  </span>
                  <span className='bookpage-book-details-paper-type-price'>
                    $ 21.28
                  </span>
                </li>
                <li className='bookpage-book-details-paper-type'>*/}
                  {/* <span className='bookpage-book-details-paper-type-text'>
                    Audio Book
                  </span>
                  <span className='bookpage-book-details-paper-type-price'>
                    $ 4.28
                  </span>
                </li> */}
              {/* </ul> */}
            </div>
            <div className='bookpage-book-add-to-cart-container'>
              {
                bookInfo.isOnStock ?
                  <Link
                    className='store-primary-button float-right'
                    onClick={!addToCartClicked ?
                      this.handleAddToCart : null
                    }
                    to={!addToCartClicked ? null : '/shop/cart'}
                  >
                    {
                      this.state.addToCartProcessing ?
                        <StoreSpinner /> :
                        !addToCartClicked ?
                          'Add to Cart' :
                          'View Cart & Proceed to checkout'
                    }
                  </Link> :
                  <span className='error'>
                    Sorry!
                    <br/>
                    This item is Out of Stock.
                  </span>
              }
            </div>
            {/* <div className='bookpage-book-piggy-bank-container'>
              <figure className='bookpage-book-piggy-bank-figure'>
                <img src='/image/piggy-bank.png'/>
              </figure>
              <div className='bookpage-book-piggy-bank-text-container'>
                Receive
                <span className='bookpage-book-piggy-bank-text-lit'>
                  <b>{parseIntToLocale(bookInfo.litcoinsSaving)}</b>
                  <img className='litcoin-img' src='/image/litcoin.png' />
                </span>
                back when buying with us.
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReaderId: state.currentReader.id,
  }
}

const mapDistpachToProps = {
  addToLibrary,
  removeFromLibrary,
  addToWishList,
  removeFromWishList,
  addToCart,
  followOrUnfollow,
  shareBook,
  showAlert,
}
export default connect(mapStateToProps, mapDistpachToProps)(BookInfo)
