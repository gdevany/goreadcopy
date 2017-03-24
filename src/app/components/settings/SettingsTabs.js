import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Images, CurrentReader } from '../../redux/actions'
import PrimaryButton from '../common/PrimaryButton'
import Toggle from 'material-ui/Toggle'
import Snackbar from 'material-ui/Snackbar'
import { Colors } from '../../constants/style'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download'
import Dropzone from 'react-dropzone'
import Promise from 'bluebird'
import FavoriteGenresModal from '../common/FavoriteGenresModal'
import CloseIcon from 'material-ui/svg-icons/navigation/close'
import { ExternalRoutes as routes } from '../../constants'
import R from 'ramda'
import moment from 'moment'

const { uploadImage } = Images
const { updateReader, deleteSocialAccount } = CurrentReader
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
    }

    this.handleClose = this.handleClose.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleFirstTabSubmit = this.handleFirstTabSubmit.bind(this)
    this.handleSecondTabSubmit = this.handleSecondTabSubmit.bind(this)
    this.handleThirdTabSubmit = this.handleThirdTabSubmit.bind(this)
    this.handleOnToggle = this.handleOnToggle.bind(this)
  }
  componentWillReceiveProps = (nextProps) => {
    const { readerFetched } = this.state
    if (nextProps.currentReader.firstName && !readerFetched) {
      const momentDate = moment(nextProps.currentReader.birthdate, 'YYYY-MM-DD')

      this.setState({
        readerFetched: true,
        favoriteQuote1: nextProps.currentReader.favoriteQuote1,
        favoriteQuote2: nextProps.currentReader.favoriteQuote2,
        favoriteQuote3: nextProps.currentReader.favoriteQuote3,
        favoriteQuote4: nextProps.currentReader.favoriteQuote4,
        favoriteQuote5: nextProps.currentReader.favoriteQuote5,
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
      })
    }
  }

  handleOnChange = R.curry((field, e) => {
    e.preventDefault()
    if (field === 'gender') {
      this.setState({ gender: (e.target.innerText === 'Male' ? 'M' : 'F') })

    }

    if (field === 'birthdateDay' || field === 'birthdateMonth' ||
      field === 'birthdateYear') {
      this.setState({ [field]: e.target.innerText })
    }

    if (field !== 'gender' &&
      field !== 'birthdateDay' &&
      field !== 'birthdateMonth' &&
      field !== 'birthdateYear') {
      this.setState({ [field]: e.target.value })
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
      const fullDate = moment(`${birthdateYear}-${birthdateMonth}-${birthdateDay}`, 'YYYY-MM-DD')
      readerData = {
        firstName,
        lastName,
        email,
        gender,
        birthdate: fullDate.format('YYYY-MM-DD'),
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
          Favorite Quoutes
        </h4>
        <div className='profile-edidor-quote-container'>
          <h5 className='profile-editor-favorite-quotes-num'>
            Favorite Quoute #1
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
            Favorite Quoute #2
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
            Favorite Quoute #3
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
            Favorite Quoute #4
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
            Favorite Quoute #5
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
            <CloseIcon onClick={() => this.handleDeleteSocialAccount(account.id)}/>
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
              {/* <span>{account.extraData.first-name} {account.extraData.last-name}</span>*/}
            </div>
            <CloseIcon onClick={() => this.handleDeleteSocialAccount(account.id)}/>
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
              {/* <span>{account.extraData.firstName} {account.extraData.lastName}</span> */}
            </div>
            <CloseIcon onClick={() => this.handleDeleteSocialAccount(account.id)}/>
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
            <CloseIcon onClick={() => this.handleDeleteSocialAccount(account.id)}/>
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
                />
              ) : null
            }
          </div>
        </div>
        {this.renderFavoriteQuotes()}
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
              onClick={this.handleFirstTabSubmit}
            />
          </div>
        </div>
      </article>
    )
  }

  handleOnToggle = (targeToggled, targetValue) => {
    this.setState({ [targeToggled]: !targetValue })
  }

  renderTabTwo = () => {
    const {
      firstName,
      lastName,
      email,
      gender,
      birthdateMonth,
      birthdateDay,
      birthdateYear,
      address1,
      address2,
      city,
      state,
      zipcode
    } = this.state
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
                    onChange={this.handleOnChange('firstName')}
                    value={firstName}
                  />
                </div>
                <div className='small-12 columns'>
                  <span className='form-label'> Last Name</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('lastName')}
                    value={lastName}
                  />
                </div>
                <div className='small-12 columns'>
                  <span className='form-label'>Email</span>
                  <input
                    type='email'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('email')}
                    value={email}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='small-6 columns'>
                  <span className='form-label'>Gender</span>
                  <SelectField
                    onChange={this.handleOnChange('gender')}
                    value={gender}
                    style={styles.selectStyles}
                  >
                    <MenuItem value='M' primaryText='Male' />
                    <MenuItem value='F' primaryText='Female' />
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
                    value={birthdateMonth}
                    onChange={this.handleOnChange('birthdateMonth')}
                    style={styles.selectStyles}
                  >
                    <MenuItem value='January' primaryText='January' />
                    <MenuItem value='February' primaryText='February' />
                    <MenuItem value='March' primaryText='March' />
                    <MenuItem value='April' primaryText='April' />
                    <MenuItem value='May' primaryText='May' />
                    <MenuItem value='June' primaryText='June' />
                    <MenuItem value='July' primaryText='July' />
                    <MenuItem value='August' primaryText='August' />
                    <MenuItem value='September' primaryText='September' />
                    <MenuItem value='October' primaryText='October' />
                    <MenuItem value='November' primaryText='November' />
                    <MenuItem value='December' primaryText='December' />
                  </SelectField>
                </div>
                <div className='small-4 columns'>
                  <SelectField
                    floatingLabelText='Day'
                    value={birthdateDay}
                    onChange={this.handleOnChange('birthdateDay')}
                    style={styles.selectStyles}
                  >
                    <MenuItem value='01' primaryText='01' />
                    <MenuItem value='02' primaryText='02' />
                    <MenuItem value='03' primaryText='03' />
                    <MenuItem value='04' primaryText='04' />
                    <MenuItem value='05' primaryText='05' />
                    <MenuItem value='06' primaryText='06' />
                    <MenuItem value='07' primaryText='07' />
                    <MenuItem value='08' primaryText='08' />
                    <MenuItem value='09' primaryText='09' />
                    <MenuItem value='10' primaryText='10' />
                    <MenuItem value='11' primaryText='11' />
                    <MenuItem value='12' primaryText='12' />
                    <MenuItem value='13' primaryText='13' />
                    <MenuItem value='14' primaryText='14' />
                    <MenuItem value='15' primaryText='15' />
                    <MenuItem value='16' primaryText='16' />
                    <MenuItem value='17' primaryText='17' />
                    <MenuItem value='18' primaryText='18' />
                    <MenuItem value='19' primaryText='19' />
                    <MenuItem value='20' primaryText='20' />
                    <MenuItem value='21' primaryText='21' />
                    <MenuItem value='22' primaryText='22' />
                    <MenuItem value='23' primaryText='23' />
                    <MenuItem value='24' primaryText='24' />
                    <MenuItem value='25' primaryText='25' />
                    <MenuItem value='26' primaryText='26' />
                    <MenuItem value='27' primaryText='27' />
                    <MenuItem value='28' primaryText='28' />
                    <MenuItem value='29' primaryText='29' />
                    <MenuItem value='30' primaryText='30' />
                    <MenuItem value='31' primaryText='31' />
                  </SelectField>
                </div>
                <div className='small-4 columns'>
                  <SelectField
                    floatingLabelText='Year'
                    value={birthdateYear}
                    onChange={this.handleOnChange('birthdateYear')}
                    style={styles.selectStyles}
                  >
                    <MenuItem value='1910' primaryText='1910' />
                    <MenuItem value='1911' primaryText='1911' />
                    <MenuItem value='1912' primaryText='1912' />
                    <MenuItem value='1913' primaryText='1913' />
                    <MenuItem value='1914' primaryText='1914' />
                    <MenuItem value='1915' primaryText='1915' />
                    <MenuItem value='1916' primaryText='1916' />
                    <MenuItem value='1917' primaryText='1917' />
                    <MenuItem value='1918' primaryText='1918' />
                    <MenuItem value='1919' primaryText='1919' />
                    <MenuItem value='1920' primaryText='1920' />
                    <MenuItem value='1921' primaryText='1921' />
                    <MenuItem value='1922' primaryText='1922' />
                    <MenuItem value='1923' primaryText='1923' />
                    <MenuItem value='1924' primaryText='1924' />
                    <MenuItem value='1925' primaryText='1925' />
                    <MenuItem value='1926' primaryText='1926' />
                    <MenuItem value='1927' primaryText='1927' />
                    <MenuItem value='1928' primaryText='1928' />
                    <MenuItem value='1929' primaryText='1929' />
                    <MenuItem value='1930' primaryText='1930' />
                    <MenuItem value='1931' primaryText='1931' />
                    <MenuItem value='1932' primaryText='1932' />
                    <MenuItem value='1933' primaryText='1933' />
                    <MenuItem value='1934' primaryText='1934' />
                    <MenuItem value='1935' primaryText='1935' />
                    <MenuItem value='1936' primaryText='1936' />
                    <MenuItem value='1937' primaryText='1937' />
                    <MenuItem value='1938' primaryText='1938' />
                    <MenuItem value='1939' primaryText='1939' />
                    <MenuItem value='1940' primaryText='1940' />
                    <MenuItem value='1941' primaryText='1941' />
                    <MenuItem value='1942' primaryText='1942' />
                    <MenuItem value='1943' primaryText='1943' />
                    <MenuItem value='1944' primaryText='1944' />
                    <MenuItem value='1945' primaryText='1945' />
                    <MenuItem value='1946' primaryText='1946' />
                    <MenuItem value='1947' primaryText='1947' />
                    <MenuItem value='1948' primaryText='1948' />
                    <MenuItem value='1949' primaryText='1949' />
                    <MenuItem value='1950' primaryText='1950' />
                    <MenuItem value='1951' primaryText='1951' />
                    <MenuItem value='1952' primaryText='1952' />
                    <MenuItem value='1953' primaryText='1953' />
                    <MenuItem value='1954' primaryText='1954' />
                    <MenuItem value='1955' primaryText='1955' />
                    <MenuItem value='1956' primaryText='1956' />
                    <MenuItem value='1957' primaryText='1957' />
                    <MenuItem value='1958' primaryText='1958' />
                    <MenuItem value='1959' primaryText='1959' />
                    <MenuItem value='1960' primaryText='1960' />
                    <MenuItem value='1961' primaryText='1961' />
                    <MenuItem value='1962' primaryText='1962' />
                    <MenuItem value='1963' primaryText='1963' />
                    <MenuItem value='1964' primaryText='1964' />
                    <MenuItem value='1965' primaryText='1965' />
                    <MenuItem value='1966' primaryText='1966' />
                    <MenuItem value='1967' primaryText='1967' />
                    <MenuItem value='1968' primaryText='1968' />
                    <MenuItem value='1969' primaryText='1969' />
                    <MenuItem value='1970' primaryText='1970' />
                    <MenuItem value='1971' primaryText='1971' />
                    <MenuItem value='1972' primaryText='1972' />
                    <MenuItem value='1973' primaryText='1973' />
                    <MenuItem value='1974' primaryText='1974' />
                    <MenuItem value='1975' primaryText='1975' />
                    <MenuItem value='1976' primaryText='1976' />
                    <MenuItem value='1977' primaryText='1977' />
                    <MenuItem value='1978' primaryText='1978' />
                    <MenuItem value='1979' primaryText='1979' />
                    <MenuItem value='1980' primaryText='1980' />
                    <MenuItem value='1981' primaryText='1981' />
                    <MenuItem value='1982' primaryText='1982' />
                    <MenuItem value='1983' primaryText='1983' />
                    <MenuItem value='1984' primaryText='1984' />
                    <MenuItem value='1985' primaryText='1985' />
                    <MenuItem value='1986' primaryText='1986' />
                    <MenuItem value='1987' primaryText='1987' />
                    <MenuItem value='1988' primaryText='1988' />
                    <MenuItem value='1989' primaryText='1989' />
                    <MenuItem value='1990' primaryText='1990' />
                    <MenuItem value='1991' primaryText='1991' />
                    <MenuItem value='1992' primaryText='1992' />
                    <MenuItem value='1993' primaryText='1993' />
                    <MenuItem value='1994' primaryText='1994' />
                    <MenuItem value='1995' primaryText='1995' />
                    <MenuItem value='1996' primaryText='1996' />
                    <MenuItem value='1997' primaryText='1997' />
                    <MenuItem value='1998' primaryText='1998' />
                    <MenuItem value='1999' primaryText='1999' />
                    <MenuItem value='2000' primaryText='2000' />
                    <MenuItem value='2001' primaryText='2001' />
                    <MenuItem value='2002' primaryText='2002' />
                    <MenuItem value='2003' primaryText='2003' />
                    <MenuItem value='2004' primaryText='2004' />
                    <MenuItem value='2005' primaryText='2005' />
                    <MenuItem value='2006' primaryText='2006' />
                    <MenuItem value='2007' primaryText='2007' />
                    <MenuItem value='2008' primaryText='2008' />
                    <MenuItem value='2009' primaryText='2009' />
                    <MenuItem value='2010' primaryText='2010' />
                    <MenuItem value='2011' primaryText='2011' />
                    <MenuItem value='2012' primaryText='2012' />
                    <MenuItem value='2013' primaryText='2013' />
                    <MenuItem value='2014' primaryText='2014' />
                    <MenuItem value='2015' primaryText='2015' />
                    <MenuItem value='2016' primaryText='2016' />
                    <MenuItem value='2017' primaryText='2017' />
                  </SelectField>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >Address</h4>
          <div className='shipping-form-container'>
            <form className='shipping-form' action=''>
              <div className='row'>
                <div className='small-12 columns'>
                  <span className='form-label'>Address Line 1</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('address1')}
                    value={address1}
                  />
                </div>
                <div className='small-12 columns'>
                  <span className='form-label'>Address Line 2 *optional</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('address2')}
                    value={address2}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='small-5 columns'>
                  <span className='form-label'>City</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('city')}
                    value={city}
                  />
                </div>
                <div className='small-3 columns'>
                  <span className='form-label'>State</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('state')}
                    value={state}
                  />
                </div>
                <div className='small-4 columns'>
                  <span className='form-label'>Zip code</span>
                  <input
                    type='text'
                    className='form-input profile-editor-form-input'
                    onChange={this.handleOnChange('zipcode')}
                    value={zipcode}
                  />
                </div>
              </div>
              <div
                className='profile-editor-save-btn-container'
                style={styles.submitButton}
              >
                <PrimaryButton
                  label='Save'
                  onClick={this.handleSecondTabSubmit}
                />
              </div>
            </form>
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
              Scan Books To Library
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
  deleteSocialAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTabs)
