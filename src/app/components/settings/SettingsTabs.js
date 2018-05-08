import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Images, CurrentReader } from '../../redux/actions'
import PrimaryButton from '../common/PrimaryButton'
import Toggle from 'material-ui/Toggle'
import Snackbar from 'material-ui/Snackbar'
import { Colors } from '../../constants/style'
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download'
import Dropzone from 'react-dropzone'
import Promise from 'bluebird'
import FavoriteGenresModal from '../common/FavoriteGenresModal'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import { ExternalRoutes as routes } from '../../constants'
import R from 'ramda'
import moment from 'moment'
import ImportLibraryModal from './ImportLibraryModal'
import { CONTEXTS as C } from '../../constants/litcoins'
import { ProfileForm } from '../common/data/forms'
import { Common } from '../../redux/actions'

const { showAlert } = Common
const { uploadImage } = Images
const { updateReader,
  deleteSocialAccount,
  selectSocialAccount,
  unSelectSocialAccount,
  } = CurrentReader
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
  submitButton: {
    width: '100%',
    textAlign: 'center',
  }
}

class SettingsTabs extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      tabOneOpen: true,
      tabTwoOpen: false,
      tabThreeOpen: false,
      profileImageUpload: false,
      hasProfileImage: false,
      backgroundImageUpload: false,
      hasBackgroundImage: false,
      modalOpen: false,
      readerFetched: false,
      snackbarOpen: false,
      favoriteQuote1: '',
      favoriteQuote2: '',
      favoriteQuote3: '',
      favoriteQuote4: '',
      favoriteQuote5: '',
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      birthdate: '',
      birthdateMonth: '',
      birthdateDay: '',
      birthdateYear: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      autopostTwitter: '',
      autopostFacebook: '',
      notifyFollow: '',
      notifyWall: '',
      notifyShared: '',
      notifyMention: '',
      receiveAuthorEmail: '',
      socialaccounts: '',
      socialFacebook: '',
      socialTwitter: '',
      socialLinkedin: '',
      socialGoogle: '',
      openImportLibraryModal: false,
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnChangesSocial = this.handleOnChangesSocial.bind(this)
    this.handleFirstTabSubmit = this.handleFirstTabSubmit.bind(this)
    this.handleSecondTabSubmit = this.handleSecondTabSubmit.bind(this)
    this.handleThirdTabSubmit = this.handleThirdTabSubmit.bind(this)
    this.handleOnToggle = this.handleOnToggle.bind(this)
    this.handleImportLibraryClose = this.handleImportLibraryClose.bind(this)
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.currentReader.firstName || nextProps.currentReader.socialaccounts) {
      const momentDate = moment(nextProps.currentReader.birthdate, 'YYYY-MM-DD')

      this.setState({
        favoriteQuote1: nextProps.currentReader.favoriteQuote1 || '',
        favoriteQuote2: nextProps.currentReader.favoriteQuote2 || '',
        favoriteQuote3: nextProps.currentReader.favoriteQuote3 || '',
        favoriteQuote4: nextProps.currentReader.favoriteQuote4 || '',
        favoriteQuote5: nextProps.currentReader.favoriteQuote5 || '',
        firstName: nextProps.currentReader.firstName,
        lastName: nextProps.currentReader.lastName,
        email: nextProps.currentReader.email,
        gender: nextProps.currentReader.gender,
        birthdate: nextProps.currentReader.birthdate,
        birthdateMonth: momentDate.format('MMMM'),
        birthdateDay: momentDate.format('DD'),
        birthdateYear: momentDate.format('YYYY'),
        address1: (nextProps.currentReader.address1 || ''),
        address2: (nextProps.currentReader.address2 || ''),
        city: (nextProps.currentReader.city || ''),
        state: (nextProps.currentReader.state || ''),
        zipcode: (nextProps.currentReader.zipcode || ''),
        autopostTwitter: nextProps.currentReader.autopostTwitter,
        autopostFacebook: nextProps.currentReader.autopostFacebook,
        notifyFollow: nextProps.currentReader.notifyFollow,
        notifyMention: nextProps.currentReader.notifyMention,
        notifyWall: nextProps.currentReader.notifyWall,
        notifyShared: nextProps.currentReader.notifyShared,
        receiveAuthorEmail: nextProps.currentReader.receiveAuthorEmail,
        socialaccounts: nextProps.currentReader.socialaccounts,
        socialFacebook: nextProps.currentReader.socialFacebook,
        socialTwitter: nextProps.currentReader.socialTwitter,
        socialLinkedin: nextProps.currentReader.socialLinkedin,
        socialGoogle: nextProps.currentReader.socialGoogle,
      })
    }
  }

  handleImportLibraryOpen = (event) => {
    this.setState({ openImportLibraryModal: true })
  }

  handleImportLibraryClose = () => {
    this.setState({ openImportLibraryModal: false })
  }

  handleOnChange = R.curry((field, e) => {
    e.preventDefault()
    this.setState({ [field]: e.target.value })
  })

  handleOnChangesSocial = R.curry((field, e, index, value) => {

    const { socialFacebook, socialTwitter, socialLinkedin, socialGoogle } = this.state

    if (field === 'socialFacebook' || field === 'socialTwitter' ||
      field === 'socialLinkedin' || field === 'socialGoogle') {
      if (value === 0) {
        if (field === 'socialFacebook' && socialFacebook !== undefined &&
        socialFacebook !== null) {
          this.props.unSelectSocialAccount(socialFacebook.id)
        }
        if (field === 'socialTwitter' && socialTwitter !== undefined &&
        socialTwitter !== null) {
          this.props.unSelectSocialAccount(socialTwitter.id)
        }
        if (field === 'socialLinkedin' && socialLinkedin !== undefined &&
        socialLinkedin !== null) {
          this.props.unSelectSocialAccount(socialLinkedin.id)
        }
        if (field === 'socialGoogle' && socialGoogle !== undefined &&
        socialGoogle !== null) {
          this.props.unSelectSocialAccount(socialGoogle.id)
        }
      } else {
        this.props.selectSocialAccount(value)
      }
      this.setState({ [field]: value })

    }
  })

  handleOpen = () => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
    })
  }

  handleSnackbarOpen = () => {
    this.setState({
      snackbarOpen: true,
    })
  }
  handleFirstTabSubmit = (event) => {
    event.preventDefault()
    const {
      favoriteQuote1,
      favoriteQuote2,
      favoriteQuote3,
      favoriteQuote4,
      favoriteQuote5
    } = this.state

    const readerData = {
      favoriteQuote1,
      favoriteQuote2,
      favoriteQuote3,
      favoriteQuote4,
      favoriteQuote5
    }
    this.props.updateReader(readerData)
    this.setState({
      readerFetched: false,
      snackbarOpen: true,
    })
  }
  handleSecondTabSubmit = (event) => {
    event.preventDefault()
    const {
      firstName,
      lastName,
      email,
      gender,
      birthdateYear,
      birthdateMonth,
      birthdateDay,
      address1,
      address2,
      city,
      state,
      zipcode
    } = this.state

    let readerData = {}
    if (birthdateYear || birthdateMonth || birthdateDay) {
      const monthName = moment().month(birthdateMonth).format('M')
      const fullDate = moment(`${birthdateYear}-${monthName}-${birthdateDay}`, 'YYYY-MM-DD')
      readerData = {
        firstName,
        lastName,
        email,
        gender,
        birthdate: fullDate.format('YYYY-MM-DD') ? fullDate.format('YYYY-MM-DD') : '',
        address1,
        address2,
        city,
        state,
        zipcode
      }
    } else {
      readerData = {
        firstName,
        lastName,
        email,
        gender,
        address1,
        address2,
        city,
        state,
        zipcode
      }
    }
    this.props.updateReader(readerData)
    this.setState({
      readerFetched: false,
      snackbarOpen: true,
    })
  }

  handleThirdTabSubmit = (event) => {
    event.preventDefault()
    const {
      autopostFacebook,
      autopostTwitter,
      notifyFollow,
      notifyWall,
      notifyMention,
      notifyShared,
      receiveAuthorEmail
    } = this.state

    const readerData = {
      autopostFacebook,
      autopostTwitter,
      notifyFollow,
      notifyWall,
      notifyMention,
      notifyShared,
      receiveAuthorEmail
    }
    this.props.updateReader(readerData)
    this.setState({
      readerFetched: false,
      snackbarOpen: true,
    })
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
          src={upload[0] ? upload[0].preview : image}
          key='profile-image'
        />
      </figure>
    )
  }

  renderBackground = (image, upload) => {
    return (
      <figure className='background-photo-editor-figure'>
        <img
          src={upload[0] ? upload[0].preview : image}
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

  renderFavoriteQuotes = () => {
    const {
      favoriteQuote1,
      favoriteQuote2,
      favoriteQuote3,
      favoriteQuote4,
      favoriteQuote5
    } = this.state

    return (
      <div className='profile-editor-section-container'>
        <h4 className='profile-editor-section-title'>
          Favorite Quotes
        </h4>
        <div className='profile-edidor-quote-container'>
          <h5 className='profile-editor-favorite-quotes-num'>
            Favorite Quote #1
          </h5>
          <textarea
            className='profile-editor-favorite-quote-textarea'
            onChange={this.handleOnChange('favoriteQuote1')}
            value={favoriteQuote1}
            maxLength={255}
          />
        </div>
        <div className='profile-edidor-quote-container'>
          <h5 className='profile-editor-favorite-quotes-num'>
            Favorite Quote #2
          </h5>
          <textarea
            className='profile-editor-favorite-quote-textarea'
            onChange={this.handleOnChange('favoriteQuote2')}
            value={favoriteQuote2}
            maxLength={255}
          />
        </div>
        <div className='profile-edidor-quote-container'>
          <h5 className='profile-editor-favorite-quotes-num'>
            Favorite Quote #3
          </h5>
          <textarea
            className='profile-editor-favorite-quote-textarea'
            onChange={this.handleOnChange('favoriteQuote3')}
            value={favoriteQuote3}
            maxLength={255}
          />
        </div>

        <div className='profile-edidor-quote-container'>
          <h5 className='profile-editor-favorite-quotes-num'>
            Favorite Quote #4
          </h5>
          <textarea
            className='profile-editor-favorite-quote-textarea'
            onChange={this.handleOnChange('favoriteQuote4')}
            value={favoriteQuote4}
            maxLength={255}
          />
        </div>
        <div className='profile-edidor-quote-container'>
          <h5 className='profile-editor-favorite-quotes-num'>
            Favorite Quote #5
          </h5>
          <textarea
            className='profile-editor-favorite-quote-textarea'
            onChange={this.handleOnChange('favoriteQuote5')}
            value={favoriteQuote5}
            maxLength={255}
          />
        </div>
      </div>
    )
  }

  handleDeleteSocialAccount = (accountId) => {
    this.props.deleteSocialAccount(accountId)
    this.setState({
      readerFetched: false
    })
  }

  handleMapSocialAccounts = () => {
    const { socialaccounts } = this.state
    const {
      facebookSocialAccount,
      twitterSocialAccount,
      googleSocialAccount,
      linkedinSocialAccount
    } = routes
    let facebookAccounts, linkedinAccounts, twitterAccounts, googleAccounts = null
    if (socialaccounts.facebook) {
      facebookAccounts = socialaccounts.facebook.map((account, index) => {
        return (
          <div key={`${account.id}`} className='social-account-container'>
            <figure className='social-account-figure'>
              <img className='social-account-img' src={account.avatarUrl}/>
            </figure>
            <div className='social-account-details'>
              <span>{account.extraData.firstName} {account.extraData.lastName}</span>
            </div>
            <a>
              <CloseIcon onClick={() => this.handleDeleteSocialAccount(account.id)}/>
            </a>
          </div>
        )
      })
    }

    if (socialaccounts.linkedin) {
      linkedinAccounts = socialaccounts.linkedin.map((account, index) => {
        return (
          <div key={`${account.id}`} className='social-account-container'>
            <figure className='social-account-figure'>
              <img className='social-account-img' src={account.avatarUrl}/>
            </figure>
            <div className='social-account-details'>
              <span>{account.extraData.firstName} {account.extraData.lastName}</span>
            </div>
            <a>
              <CloseIcon onClick={() => this.handleDeleteSocialAccount(account.id)}/>
            </a>
          </div>
        )
      })
    }

    if (socialaccounts.twitter) {
      twitterAccounts = socialaccounts.twitter.map((account, index) => {
        return (
          <div key={`${account.id}`} className='social-account-container'>
            <figure className='social-account-figure'>
              <img className='social-account-img' src={account.avatarUrl}/>
            </figure>
            <div className='social-account-details'>
              <span>{account.extraData.name}</span>
            </div>
            <a>
              <CloseIcon onClick={() => this.handleDeleteSocialAccount(account.id)}/>
            </a>
          </div>
        )
      })
    }

    if (socialaccounts.google) {
      googleAccounts = socialaccounts.google.map((account, index) => {
        return (
          <div key={`${account.id}`} className='social-account-container'>
            <figure className='social-account-figure'>
              <img className='social-account-img' src={account.avatarUrl}/>
            </figure>
            <div className='social-account-details'>
              {/* <span>{account.extraData.firstName} {account.extraData.lastName}</span> */}
            </div>
            <a>
              <CloseIcon onClick={() => this.handleDeleteSocialAccount(account.id)}/>
            </a>
          </div>
        )
      })
    }

    return (
      <div className='social-accounts-container'>
        <div className='social-accounts-single-container'>
          <h4>Facebook Social Accounts</h4>
          <div>
            {facebookAccounts ? facebookAccounts : null}
          </div>
          <div>
            <a
              className='social-accounts-reg-anchor'
              href={facebookSocialAccount()}
              target='_blank'
            >
              Add a new Facebook Account
            </a>
          </div>
        </div>
        <div className='social-accounts-single-container'>
          <h4>Linkedin Social Accounts</h4>
          <div>
            {linkedinAccounts ? linkedinAccounts : null}
          </div>
          <div>
            <a
              className='social-accounts-reg-anchor'
              href={linkedinSocialAccount()}
              target='_blank'
            >
              Add a new Linkedin Account
            </a>
          </div>
        </div>
        <div className='social-accounts-single-container'>
          <h4>Twitter Social Accounts</h4>
          <div>
            {twitterAccounts ? twitterAccounts : null}
          </div>
          <div>
            <a
              className='social-accounts-reg-anchor'
              href={twitterSocialAccount()}
              target='_blank'
            >
              Add a new Twitter Account
            </a>
          </div>
        </div>
        <div className='social-accounts-single-container'>
          <h4>Google Social Accounts</h4>
          <div>
            {googleAccounts ? googleAccounts : null}
          </div>
          <div>
            <a
              className='social-accounts-reg-anchor'
              href={googleSocialAccount()}
              target='_blank'
            >
              Add a new Google Account
            </a>
          </div>
        </div>
      </div>
    )
  }

  handleRenderShowSocial = () => {
    const {
      socialaccounts,
      socialFacebook,
      socialTwitter,
      socialLinkedin,
      socialGoogle
    } = this.state

    let facebookAccounts, linkedinAccounts, twitterAccounts, googleAccounts = null
    if (socialaccounts.facebook) {
      facebookAccounts = socialaccounts.facebook.map((account, index) => {
        return (
          <option key={`${account.id}`} value={account.id}>
            {`${account.extraData.firstName} ${account.extraData.lastName}`}
          </option>
        )
      })
    }

    if (socialaccounts.linkedin) {
      linkedinAccounts = socialaccounts.linkedin.map((account, index) => {
        return (
          <option key={`${account.id}`} value={account.id}>
            {`${account.extraData.firstName} ${account.extraData.lastName}`}
          </option>
        )
      })
    }

    if (socialaccounts.twitter) {
      twitterAccounts = socialaccounts.twitter.map((account, index) => {
        return (
          <option key={`${account.id}`} value={account.id}>
            {account.extraData.name}
          </option>
        )
      })
    }

    if (socialaccounts.google) {
      googleAccounts = socialaccounts.google.map((account, index) => {
        return (
          <option key={`${account.id}`} value={account.id}>
            {account.extraData.familyName}
          </option>
        )
      })
    }
    return (
      <div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title'>
            Show my social media accounts
          </h4>
        </div>
        <div className='social-accounts-container'>
          <div className='social-accounts-single-container'>
            <h4>Facebook Social Accounts</h4>
            <div>
              <select
                className='normal-feel'
                onChange={this.handleOnChangesSocial('socialFacebook')}
                value={socialFacebook ? socialFacebook.id : 0}
                style={styles.selectStyles}
              >
                <option value={0}>
                  Not show any account
                </option>
                {facebookAccounts ? facebookAccounts : ''}
              </select>
            </div>
          </div>
          <div className='social-accounts-single-container'>
            <h4>Linkedin Social Accounts</h4>
            <div>
              <select
                className='normal-feel'
                onChange={this.handleOnChangesSocial('socialLinkedin')}
                value={socialLinkedin ? socialLinkedin.id : 0}
                style={styles.selectStyles}
              >
                <option value={0}>
                  Not show any account
                </option>
                {linkedinAccounts ? linkedinAccounts : ''}
              </select>
            </div>
          </div>
          <div className='social-accounts-single-container'>
            <h4>Twitter Social Accounts</h4>
            <div>
              <select
                className='normal-feel'
                onChange={this.handleOnChangesSocial('socialTwitter')}
                value={socialTwitter ? socialTwitter.id : 0}
                style={styles.selectStyles}
              >
                <option value={0}>
                  Not show any account
                </option>
                {twitterAccounts ? twitterAccounts : ''}
              </select>
            </div>
          </div>
          <div className='social-accounts-single-container'>
            <h4>Google Social Accounts</h4>
            <div>
              <select
                className='normal-feel'
                onChange={this.handleOnChangesSocial('socialGoogle')}
                value={socialGoogle ? socialGoogle.id : 0}
                style={styles.selectStyles}
              >
                <option value={0}>
                  Not show any account
                </option>
                {googleAccounts ? googleAccounts : ''}
              </select>
            </div>
          </div>
        </div>
      </div>
    )
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
              accept='image/*'

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
              accept='image/*'
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
            {
              currentReader.genreIds ?
              (
                <FavoriteGenresModal
                  modalOpen={modalOpen}
                  handleClose={this.handleClose}
                  genreIds={currentReader.genreIds}
                  context={C.SETTINGS}
                />
              ) : null
            }
          </div>
        </div>
        {this.renderFavoriteQuotes()}
        {this.handleRenderShowSocial()}
        <div className='profile-editor-save-btn-container'>
          <PrimaryButton
            label='Save'
            onClick={this.handleFirstTabSubmit}
          />
        </div>
      </article>
    )
  }

  handleOnToggle = (targeToggled, targetValue) => {
    this.setState({ [targeToggled]: !targetValue })
  }

  renderTabTwo = () => {
    return (
      <article className='settings-single-tab-content small-12 medium-6 columns small-centered'>
        <div className='settings-section-title-container'>
          <h3 className='settings-section-title'>Edit personal info</h3>
        </div>
        <div className='profile-editor-section-container'>
          <div className='profile-editor-form-container'>
            <ProfileForm
              onSuccess={()=>{ this.props.showAlert({ message: 'Form saved successfully!' }) }}
              submitButtonText='Save'
            />
          </div>
        </div>
      </article>
    )
  }

  renderTabThree = () => {
    const {
      autopostFacebook,
      autopostTwitter,
      notifyFollow,
      notifyWall,
      notifyMention,
      notifyShared,
      receiveAuthorEmail,

    } = this.state

    const { resetPassword } = routes

    return (
      <article className='settings-single-tab-content medium-8 columns small-centered'>
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
              defaultToggled={autopostFacebook}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              onClick={() => this.handleOnToggle('autopostFacebook', autopostFacebook)}
            />
            <Toggle
              label='Twitter'
              labelPosition='left'
              defaultToggled={autopostTwitter}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              onClick={() => this.handleOnToggle('autopostTwitter', autopostTwitter)}
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
              defaultToggled={notifyFollow}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              onClick={() => this.handleOnToggle('notifyFollow', notifyFollow)}
            />
            <Toggle
              label='Someone writes on my wall'
              labelPosition='left'
              defaultToggled={notifyWall}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              onClick={() => this.handleOnToggle('notifyWall', notifyWall)}
            />
            <Toggle
              label='Someone mentions me in a post'
              labelPosition='left'
              defaultToggled={notifyMention}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              onClick={() => this.handleOnToggle('notifyMention', notifyMention)}
            />
            <Toggle
              label='Someone shares my Personal Library'
              labelPosition='left'
              defaultToggled={notifyShared}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              onClick={() => this.handleOnToggle('notifyShared', notifyShared)}
            />
            <Toggle
              label='Receive emails from authors i follow'
              labelPosition='left'
              defaultToggled={receiveAuthorEmail}
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              onClick={() => this.handleOnToggle('receiveAuthorEmail', receiveAuthorEmail)}
            />
          </div>
        </div>
        <div
          className='profile-editor-save-btn-container'
          style={styles.submitButton}
        >
          <PrimaryButton
            label='Save'
            onClick={this.handleThirdTabSubmit}
          />
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >
            Connected Social Media Accounts
          </h4>
          <p className='settings-section-subtitle'>
            Unlock express logins and showcase your online presense
            by connecting your other social media accouns
          </p>
          {this.handleMapSocialAccounts()}
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >
            Import Books to Library
          </h4>
          <div className='profile-editor-action-container'>
            <a
              className='profile-editor-section-main-action'
              onClick={this.handleImportLibraryOpen}
            >
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
              Scan Books To Library
            </a>
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >
            Change Login Password
          </h4>
          <div className='profile-editor-action-container'>
            <a className='profile-editor-section-main-action' href={resetPassword()}>
              Change Login Password
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
        <Snackbar
          open={this.state.snackbarOpen}
          message={'Succesfully saved'}
          action='undo'
          autoHideDuration={3000}
          onActionTouchTap={this.handleSnackbarOpen}
          onRequestClose={this.handleSnackbarClose}
        />
        <ImportLibraryModal
          openImportLibraryModal={this.state.openImportLibraryModal}
          handleImportLibraryClose={this.handleImportLibraryClose}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentReader: state.currentReader
  }
}

const mapDispatchToProps = {
  uploadImage,
  updateReader,
  deleteSocialAccount,
  selectSocialAccount,
  unSelectSocialAccount,
  showAlert
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTabs)
