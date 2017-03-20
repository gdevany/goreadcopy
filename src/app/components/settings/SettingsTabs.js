import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PrimaryButton from '../common/PrimaryButton'
import Toggle from 'material-ui/Toggle'
import { Colors } from '../../constants/style'

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
        <div className='profile-photo-editor-container'>
          <h4 className='profile-photo-title' >Profile Photo</h4>
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
        <div className='profile-photo-editor-container'>
          <h4 className='profile-photo-title' >Cover Photo</h4>
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
        <div className='profile-editor-favorite-genres'>
          <h4 className='profile-editor-favorite-genres-title'>
            Favorite genres
          </h4>
          <a onClick={this.handleButtonClick}>
            + Add or edit genres
          </a>
        </div>
        <div className='profile-editor-favorite-quotes'>
          <h4 className='profile-editor-favorite-quotes-title'>
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
        <div className='profile-editor-socialmedia-accounts'>
          <h4 className='profile-editor-favorite-socialmedia-title'>
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
          <PrimaryButton
            label='Save'
            onClick={this.handleButtonClick}
          />
        </div>
      </article>
    )
  }

  renderTabTwo = () => {
    return (
      <article className='settings-single-tab-content small-12 columns small-centered'>
        Tab 2
      </article>
    )
  }

  renderTabThree = () => {
    return (
      <article className='settings-single-tab-content small-12 columns small-centered'>
        Tab 3
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
