import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Images } from '../../redux/actions'
import PrimaryButton from '../common/PrimaryButton'
import Toggle from 'material-ui/Toggle'
import { Colors } from '../../constants/style'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download'
import Dropzone from 'react-dropzone'
import Promise from 'bluebird'
import FavoriteGenresModal from '../common/FavoriteGenresModal'

const { uploadImage } = Images

const styles = {
  lableStyle: {
    fontSize: 18,
  },
  elementStyle: {
    padding: '1em 0',
  },
  thumbSwitched: {
    backgroundColor: Colors.blue,
  },
  trackSwitched: {
    backgroundColor: '#d3ebfb',
  },
  selectStyles: {
    width: '100%'
  },
}

class SettingsTabs extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      tabOneOpen: true,
      tabTwoOpen: false,
      tabThreeOpen: false,
      profileImageUpload: null,
      hasProfileImage: false,
      backgroundImageUpload: null,
      hasBackgroundImage: false,
      modalOpen: false,
    }
    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleTabClick = (tabIndex) => {
    if (tabIndex === 1) {
      this.setState({
        tabOneOpen: true,
        tabTwoOpen: false,
        tabThreeOpen: false,
      })
    }
    if (tabIndex === 2) {
      this.setState({
        tabOneOpen: false,
        tabTwoOpen: true,
        tabThreeOpen: false,
      })
    }
    if (tabIndex === 3) {
      this.setState({
        tabOneOpen: false,
        tabTwoOpen: false,
        tabThreeOpen: true,
      })
    }
  }

  handleButtonClick = (event) => {
    event.preventDefault()
    console.log('Click on ImageUpload')
  }

  profileUpload = (file) => {
    this.setState({
      hasProfileImage: false,
      profileImageUpload: file
    })
    this.getBase64AndUpdate(file[0], 'profileImage')
  }

  backgroundUpload = (file) => {
    this.setState({
      backgroundImageUpload: file,
      hasBackgroundImage: false
    })
    this.getBase64AndUpdate(file[0], 'backgroundImage')
  }

  getBase64AndUpdate = (file, imageType) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(`Error in getBase64: ${error}`)
    }).then(res => this.props.uploadImage({ imageType, file: res }))
  }

  renderImage = (image, upload) => {
    return (
      <figure className='profile-photo-editor-figure'>
        <img
          src={upload ? upload[0].preview : image}
          key='profile-image'
        />
      </figure>
    )
  }

  renderBackground = (image, upload) => {
    return (
      <figure className='background-photo-editor-figure'>
        <img
          src={upload ? upload[0].preview : image}
          key='background-image'
        />
      </figure>
    )
  }

  mapAddedGenres = () => {
    const { currentReader } = this.props
    if (currentReader.genreIds) {
      return currentReader.genreIds.map((genre, index) => {
        return (
          <a
            key={`${genre.id}_${genre.name}`}
            className='profile-editor-single-genre'
          >
            {genre.name}
          </a>
        )
      })
    }
    return null
  }

  mapFavoriteQuotes = () => {
    const { currentReader } = this.props
    if (currentReader.favoriteQuotes) {
      return currentReader.favoriteQuotes.map((quote, index) => {
        if (quote) {
          return (
            <div
              key={`${quote}_${index}`}
              className='profile-edidor-quote-container'
            >
              <h5 className='profile-editor-favorite-quotes-num'>
                Favorite Quoute #{index + 1}
              </h5>
              <textarea
                className='profile-editor-favorite-quote-textarea'
                defaultValue={quote}
              />
            </div>
          )
        }
        return null
      })
    }
    return null
  }

  renderTabOne = () => {
    const { currentReader } = this.props
    const { profileImageUpload, backgroundImageUpload, modalOpen } = this.state
    const getImage = currentReader.profileImage || profileImageUpload ?
      this.renderImage(currentReader.profileImage, profileImageUpload) : null
    const getBackgroundImage = currentReader.backgroundImage || backgroundImageUpload ?
      this.renderBackground(currentReader.backgroundImage, backgroundImageUpload) : null

    return (
      <article className='settings-single-tab-content small-12 columns small-centered'>
        <div className='settings-section-title-container'>
          <h3 className='settings-section-title'>Edit my Profile</h3>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >Profile Photo</h4>
          <div className='profile-photo-actions-container'>
            <Dropzone
              onDrop={this.profileUpload}
              className='dropzone-settings-page'
            >
              {getImage}
              <a
                className='profile-photo-upload-btn'
                onClick={this.profileUpload}
              >
                + Upload
              </a>
            </Dropzone>
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >Cover Photo</h4>
          <div className='profile-photo-actions-container'>
            <Dropzone
              onDrop={this.backgroundUpload}
              className='dropzone-settings-page'
            >
              {getBackgroundImage}
              <a
                className='profile-photo-upload-btn'
                onClick={this.backgroundUpload}
              >
                + Upload
              </a>
            </Dropzone>
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title'>
            Favorite genres
          </h4>
          <div className='profile-editor-genres-container'>
            <div className='profile-editor-mapped-genres-container'>
              {this.mapAddedGenres()}
            </div>
            <a
              className='profile-editor-add-genres'
              onClick={this.handleOpen}
            >
              + Add or edit genres
            </a>
            <FavoriteGenresModal
              modalOpen={modalOpen}
              handleClose={this.handleClose}
              genreIds={currentReader.genreIds}
            />
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title'>
            Favorite Quoutes
          </h4>
          {this.mapFavoriteQuotes()}
          <a
            onClick={this.handleButtonClick}
          >
            + Add favorite quoute
          </a>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title'>
            Show my social media accounts
          </h4>
          <div className='editor-favorite-socialmedia-container'>
            <Toggle
              label='Facebook'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Twitter'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Linkedin'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Google +'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
          </div>
          <div className='profile-editor-save-btn-container'>
            <PrimaryButton
              label='Save'
              onClick={this.handleButtonClick}
            />
          </div>
        </div>
      </article>
    )
  }

  renderTabTwo = () => {
    return (
      <article className='settings-single-tab-content small-10 columns small-centered'>
        <div className='settings-section-title-container'>
          <h3 className='settings-section-title'>Edit personal info</h3>
        </div>
        <div className='profile-editor-section-container'>
          <div className='profile-editor-form-container'>
            <form className='profile-editor-form'>
              <div className='row'>
                <div className='small-12 columns'>
                  <span className='form-label'> First Name</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                  />
                </div>
                <div className='small-12 columns'>
                  <span className='form-label'> Last Name</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                  />
                </div>
                <div className='small-12 columns'>
                  <span className='form-label'>Email</span>
                  <input
                    type='email'
                    className='form-input profile-editor-form-input'
                  />
                </div>
              </div>
              <div className='row'>
                <div className='small-6 columns'>
                  <span className='form-label'>Gender</span>
                  <SelectField
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.selectStyles}
                  >
                    <MenuItem value={false} primaryText='Male' />
                    <MenuItem value={true} primaryText='Female' />
                  </SelectField>
                </div>
              </div>
              <div className='row'>
                <div className='small-12 columns'>
                  <span className='form-label'>Your Birthday</span>
                </div>
                <div className='small-4 columns'>
                  <SelectField
                    floatingLabelText='Month'
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.selectStyles}
                  >
                    <MenuItem value={false} primaryText='Male' />
                    <MenuItem value={true} primaryText='Female' />
                  </SelectField>
                </div>
                <div className='small-4 columns'>
                  <SelectField
                    floatingLabelText='Day'
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.selectStyles}
                  >
                    <MenuItem value={false} primaryText='Male' />
                    <MenuItem value={true} primaryText='Female' />
                  </SelectField>
                </div>
                <div className='small-4 columns'>
                  <SelectField
                    floatingLabelText='Year'
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.selectStyles}
                  >
                    <MenuItem value={false} primaryText='Male' />
                    <MenuItem value={true} primaryText='Female' />
                  </SelectField>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >Shipping Address</h4>
          <div className='shipping-form-container'>
            <form className='shipping-form' action=''>
              <div className='row'>
                <div className='small-12 columns'>
                  <span className='form-label'>Address</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                  />
                </div>
                <div className='small-12 columns'>
                  <span className='form-label'>Address Line 2 *optional</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                  />
                </div>
              </div>
              <div className='row'>
                <div className='small-5 columns'>
                  <span className='form-label'>City</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                  />
                </div>
                <div className='small-3 columns'>
                  <SelectField
                    floatingLabelText='State'
                    onChange={this.handleChange}
                    style={styles.selectStyles}
                  >
                    <MenuItem value={false} primaryText='Male' />
                    <MenuItem value={true} primaryText='Female' />
                  </SelectField>
                </div>
                <div className='small-4 columns'>
                  <span className='form-label'>Zip code</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                  />
                </div>
              </div>
              <div className='profile-editor-save-btn-container'>
                <PrimaryButton
                  label='Save'
                  onClick={this.handleButtonClick}
                />
              </div>
            </form>
          </div>
        </div>

      </article>
    )
  }

  renderTabThree = () => {
    const { currentReader } = this.props
    return (
      <article className='settings-single-tab-content small-8 columns small-centered'>
        <div className='settings-section-title-container'>
          <h3 className='settings-section-title'>
            Account Settings
          </h3>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title'>
            Sharing
          </h4>
          <p className='settings-section-subtitle'>
            Post my activity to my connected
          </p>
          <div className='settings-setion-toggle-container'>
            <Toggle
              label='Facebook'
              labelPosition='left'
              defaultToggled={currentReader.autopostFacebook}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Twitter'
              labelPosition='left'
              defaultToggled={currentReader.autopostTwitter}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >
            Notifications
          </h4>
          <p className='settings-section-subtitle'>
            Notify me by email when:
          </p>
          <div className='settings-setion-toggle-container'>
            <Toggle
              label='I receive a new follower'
              labelPosition='left'
              defaultToggled={currentReader.notifyFollow}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Someone writes on my wall'
              labelPosition='left'
              defaultToggled={currentReader.notifyWall}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Someone mentions me in a post'
              labelPosition='left'
              defaultToggled={currentReader.notifyMention}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Someone shares my Personal Library'
              labelPosition='left'
              defaultToggled={currentReader.notifyShared}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Receive emails from authors i follow'
              labelPosition='left'
              defaultToggled={currentReader.receiveAuthorEmail}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >
            Connected Social Media Accounts
          </h4>
          <p className='settings-section-subtitle'>
            Unlock express logins and showcase your online presense
            by connecting your other social media accouns
          </p>
          <div className='settings-setion-toggle-container'>
            <Toggle
              label='Facebook'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Twitter'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Linkedin'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Google +'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >
            Import Books to Library
          </h4>
          <div className='profile-editor-action-container'>
            <a className='profile-editor-section-main-action'>
              <FileDownloadIcon />
              Import from Goodreads
            </a>
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >
            Scan Books To Library
          </h4>
          <div className='profile-editor-action-container'>
            <a className='profile-editor-section-main-action'>
              <FileDownloadIcon />
              Import from Goodreads
            </a>
          </div>
        </div>

      </article>
    )
  }

  render() {
    const { tabOneOpen, tabTwoOpen, tabThreeOpen } = this.state
    return (
      <section className='settings-tabs-container'>
        <section className='settings-main-tabs'>
          <ul className='settings-tabs-menu'>
            <li className='settings-tabs-menu-element'>
              <a
                onClick={() => this.handleTabClick(1)}
                className={tabOneOpen ?
                  'settings-tabs-menu-anchor active' : 'settings-tabs-menu-anchor'
                }
              >
                My Profile
              </a>
            </li>
            <li className='settings-tabs-menu-element'>
              <a
                onClick={() => this.handleTabClick(2)}
                className={tabTwoOpen ?
                  'settings-tabs-menu-anchor active' : 'settings-tabs-menu-anchor'
                }
              >
                Personal Info
              </a>
            </li>
            <li className='settings-tabs-menu-element'>
              <a
                onClick={() => this.handleTabClick(3)}
                className={tabThreeOpen ?
                  'settings-tabs-menu-anchor active' : 'settings-tabs-menu-anchor'
                }
              >
                Account Settings
              </a>
            </li>
          </ul>
        </section>
        <section className='settings-main-content row'>
          {tabOneOpen ? this.renderTabOne() : null}
          {tabTwoOpen ? this.renderTabTwo() : null}
          {tabThreeOpen ? this.renderTabThree() : null}
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader
  }
}
export default connect(mapStateToProps, { uploadImage })(SettingsTabs)
