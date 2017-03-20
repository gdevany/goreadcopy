import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PrimaryButton from '../common/PrimaryButton'
import Toggle from 'material-ui/Toggle'
import { Colors } from '../../constants/style'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FileDownloadIcon from 'material-ui/svg-icons/file/file-download'

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
  }
}

class SettingsTabs extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      tabOneOpen: true,
      tabTwoOpen: false,
      tabThreeOpen: false,
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
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

  renderTabOne = () => {
    const { currentReader } = this.props
    return (
      <article className='settings-single-tab-content small-12 columns small-centered'>
        <div className='settings-section-title-container'>
          <h3 className='settings-section-title'>Edit my Profile</h3>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >Profile Photo</h4>
          <div className='profile-foto-actions-container'>
            <figure className='profile-photo-editor-figure'>
              <img src={currentReader.profileImage}/>
            </figure>
            <PrimaryButton
              label='+ Upload'
              onClick={this.handleButtonClick}
            />
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title' >Cover Photo</h4>
          <div className='profile-foto-actions-container'>
            <figure className='background-photo-editor-figure'>
              <img src={currentReader.backgroundImage}/>
            </figure>
            <PrimaryButton
              label='+ Upload'
              onClick={this.handleButtonClick}
            />
          </div>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title'>
            Favorite genres
          </h4>
          <a onClick={this.handleButtonClick}>
            + Add or edit genres
          </a>
        </div>
        <div className='profile-editor-section-container'>
          <h4 className='profile-editor-section-title'>
            Favorite Quoutes
          </h4>
          <div className='profile-edidor-quote-container'>
            <h5 className='profile-editor-favorite-quotes-num'>
              Favorite Quoute #1
            </h5>
            <textarea className='profile-editor-favorite-quote-textarea'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat null
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </textarea>
          </div>
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
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Someone writes on my wall'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Someone mentions me in a post'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Someone shares my Personal Library'
              labelPosition='left'
              labelStyle={styles.lableStyle}
              style={styles.elementStyle}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
            />
            <Toggle
              label='Receive emails from authors i follow'
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
export default connect(mapStateToProps, null)(SettingsTabs)
